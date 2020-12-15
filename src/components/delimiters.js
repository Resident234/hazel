const DELIMITER_CLASS = 'js-translator-delimiter';
export const DELIMITER_HTML = `<div class="${DELIMITER_CLASS} translator-delimiter"><-></div>`;
export const DELIMITER_TEXT = '<->';
export const DELIMITER_FOR_TRANSLATED_TEXT = '.';

export function prepareDelimitersBeforeSubmitToTranslation(html) {
    return html
        .replace(/\r?\n|\r/g, '')
        .replaceAll(DELIMITER_TEXT, DELIMITER_FOR_TRANSLATED_TEXT)
        .replace(/\.+/g, DELIMITER_FOR_TRANSLATED_TEXT);
}

export function hideDelimitersOnDOM() {
    let divsToHide = document.getElementsByClassName(DELIMITER_CLASS);
    for(let i = 0; i < divsToHide.length; i++){
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