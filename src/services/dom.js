import { getPastingStrategy } from './pasting/pastingFactory'
import { tag, tagBody, tagText } from './tag/tag'

export const domInsertText2Page = (originalText, translatedText, settings) => {
  const objTextTags = tagText()
  let pastingStrategy = getPastingStrategy(settings)
  pastingStrategy(objTextTags, originalText, translatedText, tag, settings)
}

export const domSetIsTranslated = () => {
  const objBodyTag = tagBody()
  objBodyTag.classList.add('js-translator-is-translated')
}

export const domHasIsTranslated = () => {
  const objBodyTag = tagBody()
  return objBodyTag.classList.contains('js-translator-is-translated')
}

/**
 * @param {string} elementName
 */
export const domElement = (elementName) => {
  let elements = document.getElementsByClassName('js-' + elementName)
  if (elements) {
    return elements[0]
  } else {
    return false
  }
}
