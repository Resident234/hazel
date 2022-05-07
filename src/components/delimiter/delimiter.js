const DELIMITER_CLASS = 'js-hazel--delimiter'
const DELIMITER_TEXT = '<--hazel-delimiter-->'
const DELIMITER_HTML = `<delimiter class="${DELIMITER_CLASS} translator-delimiter">${DELIMITER_TEXT}</delimiter>`
const DELIMITER_FOR_TRANSLATED_TEXT = '.'
const DELIMITER_EXCLUSION = ['Node.js']
const DELIMITER_FOR_EXCLUSION = '_'

export const delimiterPrepareBeforeSubmitToTranslation = (html) => {
  DELIMITER_EXCLUSION.forEach(function (item) { html.replaceAll(item, item.replaceAll(DELIMITER_FOR_TRANSLATED_TEXT, DELIMITER_FOR_EXCLUSION)) })
  return html
    .replace()
    .replace(/\r?\n|\r/g, DELIMITER_FOR_TRANSLATED_TEXT)
    .replaceAll(DELIMITER_TEXT, DELIMITER_FOR_TRANSLATED_TEXT)
    .replace(/\.+/g, DELIMITER_FOR_TRANSLATED_TEXT)
}

export const delimiterPrepare = (text) => {
  text = text
    .replace(/\r?\n|\r/g, '.')
    .replaceAll(DELIMITER_TEXT, DELIMITER_FOR_TRANSLATED_TEXT)
    .replace(/\.+/g, DELIMITER_FOR_TRANSLATED_TEXT)
  let textItems = text.split('.')
  let textFiltered = []
  textItems.forEach((textItem) => {
    textItem = textItem.trim()
    if (textItem.length > 0) {
      textFiltered.push(textItem)
    }
  })
  text = textFiltered.join('.')
  text = text.trim()
  return text
}

export const delimiterHideOnDOM = () => {
  let divsToHide = getDelimiters()
  for (let i = 0; i < divsToHide.length; i++) {
    divsToHide[i].className = divsToHide[i].className + ' hide'
  }
}

export const delimiterInsertOnDOM = (objTextTags) => {
  objTextTags.forEach((tag) => {
    if (tag.innerText.length > 0) {
      tag.insertAdjacentHTML('beforeend', DELIMITER_HTML)
      tag.insertAdjacentHTML('afterbegin', DELIMITER_HTML)
    }
  })
  let delimiters = getDelimiters()
  for (let i = 0; i < delimiters.length; i++) {
    delimiters[i].style.display = 'none'
    delimiters[i].style.color = 'transparent'
  }
}

export const delimiterSplitText = (text) => {
  return text.split(DELIMITER_FOR_TRANSLATED_TEXT)
}

const getDelimiters = () => {
  return document.getElementsByClassName(DELIMITER_CLASS)
}
