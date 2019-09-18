const HOURS = 'Hours';
const MINUTES = 'Minutes';
const SECONDS = 'Seconds';

let globalHours = 0;
let globalMinutes = 0;
let globalSeconds = 0;

let tempHours = 0;
let tempMinutes = 0;
let tempSeconds = 0;

chrome.storage.local.set({
    hours: globalHours,
    minutes: globalMinutes,
    seconds: globalSeconds
}, () => {
    console.log("Initial settings saved.");
});

// load global variables from storage when user clicks extension icon
document.addEventListener('DOMContentLoaded', (event) => {
    updateGlobalTime(HOURS)
        .then(updateGlobalTime(MINUTES))
        .then(updateGlobalTime(SECONDS));
});

document.getElementById(HOURS).addEventListener('focus', (event) => {
    document.getElementById(HOURS).placeholder = 'hrs';
});

document.getElementById(MINUTES).addEventListener('focus', (event) => {
    document.getElementById(MINUTES).placeholder = 'mins';
});

document.getElementById(SECONDS).addEventListener('focus', (event) => {
    document.getElementById(SECONDS).placeholder = 'secs';
});

document.getElementById(HOURS).addEventListener('focusout', (event) => {
    refreshPlaceholderDisplay(event);
    document.getElementById(HOURS).placeholder = tempHours + ' hrs';
});

document.getElementById(MINUTES).addEventListener('focusout', (event) => {
    refreshPlaceholderDisplay(event);
    document.getElementById(MINUTES).placeholder = tempMinutes + ' mins';
});

document.getElementById(SECONDS).addEventListener('focusout', (event) => {
    refreshPlaceholderDisplay(event);
    document.getElementById(SECONDS).placeholder = tempSeconds + ' secs';
});

document.getElementById('startStop').addEventListener('click', (event) => {
    getInputAndStoreTime(document.getElementById(HOURS), tempHours);
    getInputAndStoreTime(document.getElementById(MINUTES), tempMinutes);
    getInputAndStoreTime(document.getElementById(SECONDS), tempSeconds);
});

document.getElementById('refreshNow').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: code}
        );
    });
});

function refreshPlaceholderDisplay(event) {
    let inputValue = document.getElementById(event.target.id).value;
    if (inputValue) {
        if (event.target.id === HOURS) {
            tempHours = isNaN(inputValue) ? 0 : inputValue;
        } else if (event.target.id === MINUTES) {
            tempMinutes = isNaN(inputValue) ? 0 : inputValue;
        } else { // event.target.id === SECONDS
            tempSeconds = isNaN(inputValue) ? 0 : inputValue;
        }
        document.getElementById(event.target.id).value = '';
    }
}

function getInputAndStoreTime(element, timeToCheck) {
    let transformedTime = !isNaN(timeToCheck) ? timeToCheck : 0;
    setStorageTime(element, transformedTime);
}

function setStorageTime(element, transformedTime) {
    chrome.storage.local.set({
        [element.id]: transformedTime
    }, () => {
        updateGlobalTime(element.id);
        console.log(element.id + ' saved: ' + transformedTime);
    });
}

function updateGlobalTime(elementId) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([elementId], function (result) {
            if (elementId === HOURS) {
                globalHours = result.Hours;
                tempHours = globalHours;
            } else if (elementId === MINUTES) {
                globalMinutes = result.Minutes;
                tempMinutes = globalMinutes;
            } else { // elementId === SECONDS
                globalSeconds = result.Seconds;
                tempSeconds = globalSeconds;
            }
            displayStoredTime(elementId);
            resolve('Success');
        });
    });
}

function displayStoredTime(elementId) {
    if (elementId === HOURS) {
        document.getElementById(elementId).placeholder = globalHours + ' hrs';
        document.getElementById(HOURS).value = '';
    } else if (elementId === MINUTES) {
        document.getElementById(elementId).placeholder = globalMinutes + ' mins';
        document.getElementById(MINUTES).value = '';
    } else { // elementId = SECONDS
        document.getElementById(elementId).placeholder = globalSeconds + ' secs';
        document.getElementById(SECONDS).value = '';
    }
}