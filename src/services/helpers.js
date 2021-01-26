export function prepareTranslatedText(text) {
    let textPrepared = [];
    text.forEach((item) => {
        if (item['data']) {
            textPrepared.push(item['data']['translations'][0]['translatedText']);
        }
    });
    return textPrepared;
}

export function sanitizeTextArray(text) {
    text = text.filter(item => item);
    text = text.filter((item) => item.trim() !== "");
    let textPrepared = [];
    text.forEach((item) => {
        textPrepared.push(item.trim());
    });
    return textPrepared;
}