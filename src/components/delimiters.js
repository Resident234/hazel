export const DELIMITER_HTML = '<div class="js-translator-delimiter translator-delimiter"><-></div>';
export const DELIMITER_TEXT = '<->';
export function prepareDelimitersBeforeSubmitToTranslation(html) {
    return html
        .replace(/\r?\n|\r/g, '')
        .replaceAll(DELIMITER_TEXT, '.')
        .replace(/\.+/g, '.');//TODO: регулярку нормальную составить
}

