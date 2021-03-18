import {excludeTextTags} from "./tags";
import {DELIMITER_FOR_TRANSLATED_TEXT, DELIMITER_TEXT, prepareDelimiters} from "../components/delimiters";

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

export function splitText(text) {
    let splittedText = [];

    //TODO: добавить адекватную регулярку и обработку массива
    let innerTextSplittedWithDelimiters = prepareDelimiters(text).split(DELIMITER_FOR_TRANSLATED_TEXT);
    let innerTextSplitted = [];
    innerTextSplittedWithDelimiters.forEach((item) => {
        innerTextSplitted = [...innerTextSplitted, ...item.split(DELIMITER_TEXT)];
    });
    let innerTextSplittedFiltered = [];
    innerTextSplitted.forEach((item) => {
        item = item.replace(/\r?\n|\r/g, '').trim();
        if (item.length > 0) {
            innerTextSplittedFiltered.push(item);
        }
    });

    splittedText = innerTextSplittedFiltered;
    return splittedText;
}