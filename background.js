// sets popup.html since chrome.browserAction.onClicked requires removal of default_popup setting
chrome.browserAction.setPopup({popup: 'popup.html'}, () => {});