import { domElement } from '../../services/dom'

export const popupInitDomEventsListeners = () => {
  const port = chrome.extension.connect({
    name: 'rerun'
  })
  domElement('run').addEventListener('click', function () {
    port.postMessage('rerun')
    window.close()
  })

  const mouseTarget = domElement('run')
  mouseTarget.addEventListener('mouseenter', e => {
    mouseTarget.style.borderColor = '#333333'
    mouseTarget.style.backgroundColor = '#333333'
    mouseTarget.style.color = '#ffffff'
  })
  mouseTarget.addEventListener('mouseleave', e => {
    mouseTarget.style.borderColor = '#333333'
    mouseTarget.style.backgroundColor = 'transparent'
    mouseTarget.style.color = '#333333'
  })
}
