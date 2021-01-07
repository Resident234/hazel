const DELIMITER_CLASS = 'js-translator-delimiter';
export const DELIMITER_HTML = `<delimiter class="${DELIMITER_CLASS} translator-delimiter"><-></delimiter>`;
export const DELIMITER_TEXT = '<->';
export const DELIMITER_FOR_TRANSLATED_TEXT = '.';
export const DELIMITER_EXCLUSION = ['Node.js'];
export const DELIMITER_FOR_EXCLUSION = '_';

export function prepareDelimitersBeforeSubmitToTranslation(html) {
    DELIMITER_EXCLUSION.forEach(function(item) { html.replaceAll(item, item.replaceAll(DELIMITER_FOR_TRANSLATED_TEXT, DELIMITER_FOR_EXCLUSION)); });
    return html
        .replace()
        .replace(/\r?\n|\r/g, '')
        .replaceAll(DELIMITER_TEXT, DELIMITER_FOR_TRANSLATED_TEXT)
        .replace(/\.+/g, DELIMITER_FOR_TRANSLATED_TEXT);
}

export function prepareDelimiters(text) {
    text = text
        .replace(/\r?\n|\r/g, '')
        .replaceAll(DELIMITER_TEXT, DELIMITER_FOR_TRANSLATED_TEXT)
        .replace(/\.+/g, DELIMITER_FOR_TRANSLATED_TEXT);
    let textItems = text.split('.');
    let textFiltered = [];
    textItems.forEach((textItem) => {
        textItem = textItem.trim();
        if (textItem.length > 0) {
            textFiltered.push(textItem);
        }
    });
    text = textFiltered.join('.');
    text = text.trim();
    return text;
}

export function prepareDelimitersAfterTranslation(text) {
    //DELIMITER_EXCLUSION.forEach(function(item) { text.replaceAll(item.replaceAll(DELIMITER_FOR_TRANSLATED_TEXT, DELIMITER_FOR_EXCLUSION), item); });
    return text;
}

export function hideDelimitersOnDOM() {
    let divsToHide = document.getElementsByClassName(DELIMITER_CLASS);
    for (let i = 0; i < divsToHide.length; i++) {
        divsToHide[i].className = divsToHide[i].className + ' hide';
    }
}

export function insertDelimitersOnDOM(objTextTags) {
    objTextTags.forEach((tag) => {
        if (tag.innerText.length > 0) {
            tag.insertAdjacentHTML('beforeend', DELIMITER_HTML);
            tag.insertAdjacentHTML('afterbegin', DELIMITER_HTML);
        }
    });
}