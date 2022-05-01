export const tag = [
  'p',
  'blockquote',
  'pre',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'span',
  'strong',
  'li',
  'td',
  'div',
  'a',
  'option',
  'em',
  'header',
  'section',
  'ul',
  'nav',
  'aside',
  'select',
  'article',
  'main',
  'label',
  'form',
  'details-menu',
  'summary',
  'details',
  'include-fragment',
  'notifications-list-subscription-form',
  'button',
  'details-dialog',
  'legend',
  'fieldset',
  'tab-container',
  'input-demux',
  'ref-selector',
  'footer',
  'clipboard-copy',
]
export const tagExclude = ['code']

export const tagSelector = () => {
  return tag.map((t) => {
    return '' + t + ':not(.js-hazel--component-element)'
  }).concat(tag.map((t) => {
    return '' + t + ':not(.js-hazel--component-element)'
  })).join(', ')
}

export const tagBodySelector = () => {
  return 'body'
}

export const tagText = () => {
  return document.querySelectorAll(tagSelector())
}

export const tagBody = () => {
  return document.querySelector(tagBodySelector())
}

export const tagExcludeSelector = () => {
  return tagExclude.map((t) => {
    return '' + t
  }).concat(tagExclude.map((t) => {
    return '' + t
  })).join(', ')
}
export const tagExcludeText = () => {
  return document.querySelectorAll(tagExcludeSelector())
}

export const tagAll = () => {
  return document.querySelectorAll('*')
}

export const tagFingerprintService = (name) => {
  return (name === undefined) ? false : name.function
}

export const tagLevelsService = (name) => {
    return (name === undefined) ? false : name.function
}
