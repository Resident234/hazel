import {excludeTextTags} from "./tags";

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
        item = item.replace("↵", "");
        item = item.replace(/\r?\n|\r/g, '');
        textPrepared.push(item.trim());
    });
    text = textPrepared;
    text = text.filter((item) => item.trim() !== "");
    return text;
}

export function prepareTextBeforeSubmitToTranslation(text) {
    let objExcludeTextTags = excludeTextTags();
    objExcludeTextTags.forEach((excludeTag, index) => {
        text = text.replace(excludeTag.innerText, '');//<==' + index + '==>
    });
    return text;
}