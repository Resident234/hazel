import { tagBody } from '../../services/tag/tag'

export const tap = () => {
  const elements = document.getElementsByTagName('tap')
  for (let element of elements) {
    element.onclick = function (event) {
      if (event.target.tagName.toLowerCase() === 'tap') {
        if (event.target.classList.contains('js-hazel--is-tap-popup-created')) {
          if (event.target.classList.contains('js-hazel--is-tap-popup-show')) {
            event.target.firstChild.style.display = 'none'
            event.target.classList.remove('js-hazel--is-tap-popup-show')
          } else {
            event.target.firstChild.style.display = 'block'
            event.target.classList.add('js-hazel--is-tap-popup-show')
          }
        } else {
          event.target.style.position = 'relative'
          event.target.classList.add('js-hazel--is-tap-popup-created')
          event.target.classList.add('js-hazel--is-tap-popup-show')

          let hoverPopup = document.createElement('tap-popup')
          let compStyles = window.getComputedStyle(event.target)
          let compStylesBody = window.getComputedStyle(tagBody())
          hoverPopup.innerText = event.target.dataset.translatedText
          hoverPopup.style.width = '1200px'//TODO: вычислить ширину пока не получилось
          hoverPopup.style.height = compStyles.lineHeight
          hoverPopup.style.top = '-' + compStyles.lineHeight
          hoverPopup.style.position = 'absolute'
          hoverPopup.style.backgroundColor = compStylesBody.backgroundColor

          event.target.insertAdjacentHTML(
            'afterbegin',
            hoverPopup.outerHTML
          )
        }
      }
    }
    element.onmouseover = function (event) {
      if (event.target.tagName.toLowerCase() === 'tap') {
        event.target.style.backgroundColor = 'yellow'//TODO: цвет подбирать под цветовую схему сайта
      }
    }
    element.onmouseout = function (event) {
      if (event.target.tagName.toLowerCase() === 'tap') {
        event.target.style.backgroundColor = 'transparent'
      }
    }
  }
}