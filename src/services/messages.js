import { domHasIsTranslated, domSetIsTranslated } from './dom'
import { translateRun } from './translate'

export const messagesInitAppListeners = () => {
  console.log('messagesInitAppListeners')
  chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === 'rerun' && !domHasIsTranslated()) {
      domSetIsTranslated()//TODO: translate is running
      Promise.all([translateRun()]).then(() => {
        domSetIsTranslated()
      })
    }
    if (msg.action === 'hasTranslated') {
      sendResponse({ hasTranslated: domHasIsTranslated() })
    }
  })
}

export const messagesInitBackgroundListeners = () => {
  console.log('messagesInitBackgroundListeners')
  chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
      if (msg === 'rerun') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'rerun' }, function (response) {})
          }
        })
      }
    })
  })
}
