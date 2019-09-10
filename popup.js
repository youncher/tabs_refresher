let startStop = document.getElementById('startStop');

startStop.onclick = () => {
	let hours = document.getElementById('hours').value || '0';
	let minutes = document.getElementById('minutes').value || '0';
	let seconds = document.getElementById('seconds').value || '0';

	chrome.runtime.sendMessage({
		type: "start",
		data: {
			hours: hours,
			minutes: minutes,
			seconds: seconds
		}}, (response) => {
		chrome.extension.getBackgroundPage().console.log(response); // TODO handle response
	});
};

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

