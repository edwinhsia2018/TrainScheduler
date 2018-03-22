var config = {
  apiKey: "AIzaSyBcyU57vmm6Yzh13H_c3uZIhhwO5Dimg7I",
  authDomain: "choo-choo-project.firebaseapp.com",
  databaseURL: "https://choo-choo-project.firebaseio.com",
  projectId: "choo-choo-project",
  storageBucket: "choo-choo-project.appspot.com",
  messagingSenderId: "656595069982"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).on("click", "#add-train-btn", function (event) {
  event.preventDefault();

  var trainName = $("#trainname-input").val().trim();
  var destinationTrain = $("#destination-input").val().trim();
  var firstTrain = $("#firsttrain-input").val().trim();
  var frequencyTrain = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: destinationTrain,
    firsttrain: firstTrain,
    frequency: frequencyTrain
  };
  database.ref().push(newTrain);

  alert("Train successfully added");

  $("#trainname-input").val("");
  $("#destination-input").val("");
  $("#firsttrain-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  var trainName = childSnapshot.val().name;
  var destinationTrain = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firsttrain;
  var frequencyTrain = childSnapshot.val().frequency;

  //Time Calculations
  var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  var tRemainder = firstTrainConverted % frequencyTrain;
  var nextArrival = frequencyTrain - tRemainder;
  var nextTrain = moment().add(nextArrival, "minutes");
  var nextTrainTime = moment(nextTrain).format("HH:mm A");

  //Adding each train's data to the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationTrain + "</td><td>" +
    frequencyTrain + "</td><td>" + nextTrainTime + "</td><td>" + nextArrival + "</td><td>");
})
