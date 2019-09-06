let refreshtab = document.getElementById('refreshtab');

refreshtab.onclick = (element) => {
	let color = element.target.value;
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		var code = 'window.location.reload();';
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: code}
		);
	});
};

