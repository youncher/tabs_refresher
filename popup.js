let startStop = document.getElementById('startStop');

startStop.onclick = () => {
	let hours = document.getElementById('txtHours').value || '0';
	let minutes = document.getElementById('txtMinutes').value || '0';
	let seconds = document.getElementById('txtSeconds').value || '0';

	// transform and same time settings
	acceptInput(hours, minutes, seconds);
};

function acceptInput(hours, minutes, seconds) {
	let transformedTime = transformInput(hours, minutes, seconds);

	chrome.storage.local.set({
		timeData: {
			hours: transformedTime.hours,
			minutes: transformedTime.minutes,
			seconds: transformedTime.seconds
		}
	}, () => {
		console.log("Settings saved.");
		document.getElementById('txtHours').value = transformedTime.hours;
		document.getElementById('txtMinutes').value = transformedTime.minutes;
		document.getElementById('txtSeconds').value = transformedTime.seconds;
	});
}

function transformInput(hours, minutes, seconds) {
	let transformedHours = !isNaN(parseInt(hours)) ? parseInt(hours) : 0;
	let transformedMinutes = !isNaN(parseInt(minutes)) ? parseInt(minutes) : 0;
	let transformedSeconds = !isNaN(parseInt(seconds)) ? parseInt(seconds) : 0;

	return {
		hours: transformedHours,
		minutes: transformedMinutes,
		seconds: transformedSeconds
	};
}

let refreshNow = document.getElementById('refreshNow');

refreshNow.onclick = () => {
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		var code = 'window.location.reload();';
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: code}
		);
	});
};