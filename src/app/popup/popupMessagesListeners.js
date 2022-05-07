import { domElement } from '../../services/dom'

export const popupInitMessagesListeners = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'hasTranslated' }, function (response) {
      if (response && response.hasTranslated) {
        domElement('run-container').innerHTML = 'Перевод выполнен'
      }
    })
  })
}
