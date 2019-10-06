// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed
$(document).ready(function () {

  var currentTime =  moment();
})

// 1. Initialize Firebase

var firebaseConfig = {
    apiKey: "AIzaSyC40ylY5i3ZwG9Nm__ygriymYxsVxrvFWY",
    authDomain: "train-7a3d5.firebaseapp.com",
    databaseURL: "https://train-7a3d5.firebaseio.com",
    projectId: "train-7a3d5",
    storageBucket: "train-7a3d5.appspot.com",
    messagingSenderId: "514666516141",
    appId: "1:514666516141:web:6a2d214cafd5cf2a"
  };
  // Initialize Firebase


firebase.initializeApp(firebaseConfig);


var database = firebase.database();

setInterval(function () {
  $(".current-time").html(moment().format('hh:mm:ss A'))
}, 1000); 

var train = null;
var destination = null;
var trainTime = null;
var frequency = null;


$("#add-train").click(function () {
    event.preventDefault();

    train = $("#train-name").val().trim();
    console.log(train);
    destination = $("#destination").val().trim();
    console.log(destination);
    trainTime = $("#train-time").val().trim();
    console.log(trainTime);
    frequency = $("#frequency").val().trim();
    console.log(frequency);

    // take input from first train time & frequency and write function to do the math
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log(moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var minUntilTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minUntilTrain);

    // Next Train
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm A");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    database.ref().push({
        trainName: train,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
    // adds trains to table
    $("#train-table > tbody").append(
        $("<tr>").append(
            $("<td>").text(train),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minUntilTrain)
        )
    );
    clearForm();

})

var clearForm = function () {
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
}