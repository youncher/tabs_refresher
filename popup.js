let refreshtab = document.getElementById('refreshtab');

chrome.storage.sync.get('color', (data) => {
	refreshtab.style.backgroundColor = data.color;
	refreshtab.setAttribute('value', data.color);
});

refreshtab.onclick = (element) => {
	let color = element.target.value;
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		var code = 'window.location.reload();';
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: code}
		)
	});
};