import { spinnerHide, spinnerShow } from '../components/spinner/spinner'
import { tagBodySelector, tagText } from './tag/tag'
import {
  DELIMITER_FOR_TRANSLATED_TEXT, delimiterHideOnDOM,
  delimiterInsertOnDOM,
  delimiterPrepareBeforeSubmitToTranslation
} from '../components/delimiter/delimiter'
import {
  helperPrepareTextBeforeSubmitToTranslation,
  helperPrepareTranslatedText,
  helperSanitizeTextArray
} from './helper'
import { domInsertText2Page } from './dom'
import { config } from './config'
import { settingsGet } from './settings'

export const translate = (text) => {
  const options = {
    method: 'POST',
    body: `key=${config.apiKey}&q=${encodeURIComponent(text)}&source=${settingsGet('languageSource')}&target=${settingsGet('languageTarget')}&model=nmt&format=text`, // `format=text` keeps new line characters
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;' }
  }

  return fetch(`https://translation.googleapis.com/language/translate/v2/`, options)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(`Google Translation error: ${response.status}`)
        return
      }
      return response.json()
    })
}

export const translateRun = () => {
  spinnerShow()
  const objTextTags = tagText()
  if (!objTextTags.length) {
    spinnerHide()
    return
  }
  return

  /*
  delimiterInsertOnDOM(objTextTags)

  let objBodyTag = document.querySelector(tagBodySelector())
  let pageText = objBodyTag.innerText
  pageText = helperPrepareTextBeforeSubmitToTranslation(pageText)
  pageText = delimiterPrepareBeforeSubmitToTranslation(pageText)
  let pageTextSplitted = pageText.split(DELIMITER_FOR_TRANSLATED_TEXT)
  pageTextSplitted = helperSanitizeTextArray(pageTextSplitted)

  //TODO: обойти проблему https://bugs.chromium.org/p/chromium/issues/detail?id=108055
  const promises = pageTextSplitted.map((c) => {
    return new Promise((resolve) => {
      // make some delay because the maximum rate limit of Google API is 10 qps per IP address.
      // Otherwise Google return 403 with userRateLimitExceeded error.
      const delay = 1000
      setTimeout(resolve, delay)
    }).then(() => {
      return translate(c)
    })
  })

  return Promise.all(promises)
    .then((pageTranslatedTextSplitted) => {
      if (pageTranslatedTextSplitted) {
        pageTranslatedTextSplitted = helperPrepareTranslatedText(pageTranslatedTextSplitted)
        domInsertText2Page(pageTextSplitted, pageTranslatedTextSplitted, settings)
      }
      delimiterHideOnDOM()
      //spinnerHide()
    }, () => {
    })*/
}
