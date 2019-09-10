let hours = 0;
let minutes = 0;
let seconds = 0;

chrome.runtime.onMessage.addListener((message, sender, response) => {
	let validInput = validateInput (
		message.data.hours,
		message.data.minutes,
		message.data.seconds
	);

	validInput == true? response({status: 'Success'}) : response({status: 'Failed'});
});

function validateInput(hours, minutes, seconds) {
	// <TODO place input validation code here>
	setInput(hours, minutes, seconds);
	return true;
}

function setInput(hr, min, sec) {
	hours = hr;
	minutes = min;
	seconds = sec;

	testing();
}

function testing() {
	console.log("background hours is: " + hours);
}