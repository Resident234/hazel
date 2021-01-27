import {DELIMITER_FOR_TRANSLATED_TEXT, DELIMITER_TEXT, prepareDelimiters} from "../../components/delimiters";

export const pageOnload = (tag, originalTextSplitted, translatedTextSplitted) => {
    //console.log(tag.innerText);
    if (tag && tag.innerText.length > 0) {
        if (
            !tag.classList.contains('js-translator-delimiter') &&
            !tag.classList.contains('js-translator-tag-has-translated')
        ) {
            originalTextSplitted.forEach((originalTextItem, translateIndex) => {
                originalTextItem = originalTextItem.trim();
                if (originalTextItem.length > 0) {
                    if (tag.innerHTML.includes(originalTextItem) && tag.innerText.includes(originalTextItem) && originalTextItem.length > 0) {
                        if (originalTextItem !== translatedTextSplitted[translateIndex]) {
                            let innerHTMLPrev = tag.innerHTML;

                            //TODO: добавить адекватную регулярку и обработку массива
                            let innerTextSplittedWithDelimiters = tag.innerText.split(DELIMITER_FOR_TRANSLATED_TEXT);
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

                            /** защита от замены при которой заменяется только фрагмент предложения **/
                            if (innerTextSplittedFiltered.includes(originalTextItem)) {
                                let translatedText = translatedTextSplitted[translateIndex].replace(/\.$/, "");
                                /** защита от повторной замены **/
                                let normalizedOriginalText = prepareDelimiters(tag.innerText);
                                if (normalizedOriginalText.substr(normalizedOriginalText.length - translatedText.length) !== translatedText) {
                                    tag.innerHTML = tag.innerHTML.replace(
                                        originalTextItem,
                                        originalTextItem + '. ' + translatedText
                                    );
                                    tag.classList.add('js-translator-tag-has-translated');
                                    if (innerHTMLPrev !== tag.innerHTML) {
                                        originalTextSplitted.splice(translateIndex, 1);
                                        translatedTextSplitted.splice(translateIndex, 1);
                                    }
                                }
                            }
                        } else {
                            originalTextSplitted.splice(translateIndex, 1);
                            translatedTextSplitted.splice(translateIndex, 1);
                        }
                    }
                }
            });
        }
    }
}
