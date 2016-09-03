// Steps to complete:
/*
1. Create Firebase link
2. Create button for adding new employees - then update the html + update the database
3. Create a way to retrieve employees from the employee database.
4. Create a way to calculate the months worked. Using difference between start and current time. Then use moment.js formatting to set difference in months.
5. Calculate Total billed
var employeeData = new Firebase("https://rcb-employeetracker.firebaseio.com/");
*/

// 1. Link to Firebase

  // Initialize Firebase
var config = {
    apiKey: "AIzaSyCvVIWpw8dmXE-qJK5JzqMBfRRk7sV2zWY",
    authDomain: "first-project-280fe.firebaseapp.com",
    databaseURL: "https://first-project-280fe.firebaseio.com",
    storageBucket: "first-project-280fe.appspot.com",
};

firebase.initializeApp(config);
var trainData = firebase.database();
display ();
setInterval ( displayAgain, 600000 );
var key = "";

$("#addTrainBtn").on("click", function(){

	var trainName = $("#trainNameInput").val().trim();
	var destinationName = $("#destinationInput").val().trim();
	var time = $("#timeInput").val().trim() ;
	var frequency = $("#frequencyInput").val().trim();

	// Creates local "temporary" object for holding employee data
	var pushRef = trainData.ref().push({
			trainNamedb: trainName,
			destinationNamedb: destinationName,
			timedb: time,
			frequencydb: frequency
		});
	key = pushRef.key;
	console.log (key);	

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#timeInput").val("");
	$("#frequencyInput").val("");

	// Prevents moving to new page
	return false;
});

// 2. Button for adding Employees
$("#modifyTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNamemodify").val().trim();
	var destinationName = $("#destinationmodify").val().trim();
	var time = $("#timemodify").val().trim() ;
	var frequency = $("#frequencymodify").val().trim();

	// Creates local "temporary" object for holding employee data
	trainData.ref().push({
			trainNamedb: trainName,
			destinationNamedb: destinationName,
			timedb: time,
			frequencydb: frequency
		});

	// Clears all of the text-boxes
	$("#trainNamemodify").val("");
	$("#destinationmodify").val("");
	$("#timemodify").val("");
	$("#frequencymodify").val("");
	
	$("#overlay_form").fadeIn(1000);

	
});

function display () {
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
trainData.ref().on("child_added", function(childSnapshot, prevChildKey){

	// Store everything into a variable.
	var trainName = childSnapshot.val().trainNamedb;
	var destinationName = childSnapshot.val().destinationNamedb;
	var time = childSnapshot.val().timedb;
	var frequency = childSnapshot.val().frequencydb;
		
	convertTime(trainName, destinationName, time , frequency);	
	showPopup ();

	});
}

function convertTime(trainName, destinationName, time , frequency){	    	
	   // First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(time,"hh:mm").subtract(1, "years");
		var currentTime = moment();
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		var tRemainder = diffTime % frequency;
		var tMinutesTillTrain = frequency - tRemainder;
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		// Add each train's data into the table
		$("#trainTable > tbody").append("<tr id="+ trainName+"><td>"+trainName+"</td><td>"+destinationName+"</td><td>"+frequency+"</td><td>"+moment(nextTrain).format("hh:mm")+"</td><td>"+tMinutesTillTrain+"</td></tr>");
      	
      	var modify = $('<button id = modify>') 
	    modify.addClass('btn btn-default btn-sm active btn-block'); 
	    modify.text('modify');
	    $('#'+trainName+'').append(modify); 

	    var remove = $('<button id = remove>') 
	    remove.addClass('btn btn-default btn-sm active btn-block btn-danger'); 
	    remove.text('delete');
	    $('#'+trainName+'').append(remove); 
     	
}
	 
function displayAgain () {
	 	remove();
	 	display();
}
function remove() {
    	$("#trainTableBody > tr").slice(0).remove(); 
}
//           

function showPopup () {
//open popup
$("#modify").click(function(){
$("#overlay_form").fadeIn(1000);
positionPopup();
});
 
//close popup
$("#close").click(function(){
$("#overlay_form").fadeOut(500);
});

$(window).bind('resize',positionPopup);
 
}

//position the popup at the center of the page
function positionPopup(){
if(!$("#overlay_form").is(':visible')){
return;
}

$("#overlay_form").css({
left: ($(window).width() - $('#overlay_form').width()) / 2,
top: ($(window).width() - $('#overlay_form').width()) / 7,
position:'absolute'
});
}
 
//maintain the popup at center of the page when browser resized





		



