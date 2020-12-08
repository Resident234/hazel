export function prepareDelimitersBeforeSubmitToTranslation(html) {
    return html
        .replace(/\r?\n|\r/g, '')
        .replace(/<-><-><-><-><-><-><-><-><-><->/g, '.')
        .replace(/<-><-><-><-><-><-><-><-><->/g, '.')
        .replace(/<-><-><-><-><-><-><-><->/g, '.')
        .replace(/<-><-><-><-><-><-><->/g, '.')
        .replace(/<-><-><-><-><-><->/g, '.')
        .replace(/<-><-><-><-><->/g, '.')
        .replace(/<-><-><-><->/g, '.')
        .replace(/<-><-><->/g, '.')
        .replace(/<-><->/g, '.')
        .replace(/<->/g, '.')
        .replace(/\.+/g, '.');//TODO: регулярку нормальную составить
}