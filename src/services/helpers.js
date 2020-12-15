export function prepareTranslatedText(text) {
    let textPrepared = [];
    text.forEach((item) => {
        textPrepared.push(item['data']['translations'][0]['translatedText']);
    });
    return textPrepared;
}