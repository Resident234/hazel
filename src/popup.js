const runButton = document.getElementsByClassName('js-translator-run');
const port = chrome.extension.connect({
    name: "rerun"
});
runButton[0].addEventListener("click", function () {
    port.postMessage("rerun");
});