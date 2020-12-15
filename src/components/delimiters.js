const DELIMITER_CLASS = 'js-translator-delimiter';
export const DELIMITER_HTML = `<div class="${DELIMITER_CLASS} translator-delimiter"><-></div>`;
export const DELIMITER_TEXT = '<->';
export function prepareDelimitersBeforeSubmitToTranslation(html) {
    return html
        .replace(/\r?\n|\r/g, '')
        .replaceAll(DELIMITER_TEXT, '.')
        .replace(/\.+/g, '.');
}

export function hideDelimitersOnDOM() {
    let divsToHide = document.getElementsByClassName(DELIMITER_CLASS);
    for(let i = 0; i < divsToHide.length; i++){
        divsToHide[i].className = divsToHide[i].className + ' hide';
    }
}

