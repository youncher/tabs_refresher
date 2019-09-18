let globalHours = 0;
let globalMinutes = 0;
let globalSeconds = 0;

let tempHours = 0;
let tempMinutes = 0;
let tempSeconds = 0;

chrome.storage.local.set(
	{
		hours: globalHours,
		minutes: globalMinutes,
		seconds: globalSeconds
	}, () => {
		console.log("Initial settings saved.");
});

document.addEventListener('DOMContentLoaded', (event) => {
	updateGlobalTime('Hours');
	updateGlobalTime('Minutes');
	updateGlobalTime('Seconds');
});

document.getElementById('Hours').addEventListener('focus', (event) => {
	document.getElementById('Hours').placeholder = 'hrs';
});

document.getElementById('Hours').addEventListener('focusout', (event) => {
	checkInput(event);
	document.getElementById('Hours').placeholder = tempHours + ' hrs';
});

document.getElementById('Minutes').addEventListener('focus', (event) => {
	document.getElementById('Minutes').placeholder = 'mins';
});

document.getElementById('Minutes').addEventListener('focusout', (event) => {
	checkInput(event);
	document.getElementById('Minutes').placeholder = tempMinutes + ' mins';
});

document.getElementById('Seconds').addEventListener('focus', (event) => {
	document.getElementById('Seconds').placeholder = 'secs';
});

document.getElementById('Seconds').addEventListener('focusout', (event) => {
	checkInput(event);
	document.getElementById('Seconds').placeholder = tempSeconds + ' secs';
});

function checkInput(event) {
	let inputValue = document.getElementById(event.target.id).value;
	if (inputValue) {
		if(event.target.id === 'Hours') {
			tempHours = inputValue;
		} else if (event.target.id === 'Minutes') {
			tempMinutes = inputValue;
		} else { // event.target.id === 'Seconds'
			tempSeconds = inputValue;
		}
		document.getElementById(event.target.id).value = '';
	}
}

function getInputAndStoreTime(element, timeToCheck) {
	let transformedTime = !isNaN(parseInt(timeToCheck)) ? parseInt(timeToCheck) : 0;
	setTime(element, transformedTime);
}

function setTime(element, transformedTime) {
	chrome.storage.local.set({
		[element.id]: transformedTime
	}, () => {
		updateGlobalTime(element.id);
		console.log(element.id + ' saved: ' + transformedTime);
	});
}

function updateGlobalTime(elementId) {
	chrome.storage.local.get([elementId], function(result) {
		if (elementId === 'Hours') {
			globalHours = result.Hours;
		} else if (elementId === 'Minutes') {
			globalMinutes = result.Minutes;
		} else { // elementId === 'Seconds'
			globalSeconds = result.Seconds;
		}
		displayStoredTime(elementId);
	});
}

function displayStoredTime(elementId) {
	if (elementId === 'Hours') {
		document.getElementById(elementId).placeholder = globalHours + ' hrs';
		document.getElementById('Hours').value = '';
	} else if (elementId === 'Minutes') {
		document.getElementById(elementId).placeholder = globalMinutes + ' mins';
		document.getElementById('Minutes').value = '';
	} else { // elementId = 'Seconds'
		document.getElementById(elementId).placeholder = globalSeconds + ' secs';
		document.getElementById('Seconds').value = '';
	}
}

document.getElementById('startStop').onclick = () => {
	getInputAndStoreTime(document.getElementById('Hours'), tempHours);
	getInputAndStoreTime(document.getElementById('Minutes'), tempMinutes);
	getInputAndStoreTime(document.getElementById('Seconds'), tempSeconds);
};

document.getElementById('refreshNow').onclick = () => {
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		var code = 'window.location.reload();';
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: code}
		);
	});
};