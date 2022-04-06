const runButton = document.getElementsByClassName('js-translator-run');
const runContainer = document.getElementsByClassName('js-translator-action-container');
const port = chrome.extension.connect({
    name: "rerun"
});
runButton[0].addEventListener("click", function () {
    port.postMessage("rerun");
    window.close();
});


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "hasTranslated"}, function (response) {
        if (response && response.hasTranslated) {
            runContainer[0].innerHTML = 'Translation completed';
        }
    });
});
