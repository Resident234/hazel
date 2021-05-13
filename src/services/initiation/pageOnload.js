import {DELIMITER_FOR_TRANSLATED_TEXT, DELIMITER_TEXT, prepareDelimiters} from "../../components/delimiters";
import {excludeTextTags} from "../tags";
import {splitText} from "../helpers";

export const pageOnload = (tag, originalTextSplitted, translatedTextSplitted) => {
    if (tag && tag.innerText.length > 0) {
        if (
            !tag.classList.contains('js-translator-delimiter') &&
            !tag.classList.contains('js-translator-tag-has-translated')
        ) {
            let objExcludeTextTags = excludeTextTags();
            //console.log(originalTextSplitted);
            //console.log(translatedTextSplitted);
            //console.log('---------');
            let indexesToRemove = [];
            originalTextSplitted.forEach((originalTextItem, translateIndex) => {
                //console.log(originalTextItem);
                originalTextItem = originalTextItem.trim();
                if (originalTextItem.length > 0) {
                    let hasTranslated = false;

                    /** обработчка случая , при котором в тексте содержится тег , не участвующий в переводе , но содержащий текст */
                    let isContainExcludeText = false;
                    let excludeTextIndexes = originalTextItem.match(/<==(.*?)==>/g);
                    if (excludeTextIndexes) {
                        excludeTextIndexes.forEach((excludeTextIndex) => {
                            excludeTextIndex = excludeTextIndex.replace('<==', '').replace('==>', '');
                            if (excludeTextIndex !== originalTextItem) {
                                let originalTextItemPrev = originalTextItem;
                                if (objExcludeTextTags[excludeTextIndex]) {
                                    originalTextItem = originalTextItem.replace(
                                        '<==' + (excludeTextIndex) + '==>',
                                        objExcludeTextTags[excludeTextIndex].innerText
                                    );
                                }
                                if (originalTextItemPrev !== originalTextItem) {
                                    isContainExcludeText = true;
                                }
                            }
                        });
                    }

                    //console.log(tag.innerHTML);
                    //console.log(originalTextItem);
                    //console.log(isContainExcludeText);
                    //console.log('----------');

                    let tagInnerHTML = tag.innerHTML;
                    let tagInnerText = tag.innerText;
                    //tagInnerHTML = tagInnerHTML.replaceAll('  ', '');
                    //tagInnerText = tagInnerText.replaceAll('  ', '');
                    if (
                        (
                            !isContainExcludeText &&
                            tagInnerHTML.includes(originalTextItem) &&
                            tagInnerText.includes(originalTextItem) &&
                            originalTextItem.length > 0
                        ) ||
                        (
                            isContainExcludeText &&
                            //tag.innerHTML.includes(originalTextItemHTML) &&
                            tagInnerText.includes(originalTextItem) &&
                            originalTextItem.length > 0
                        )
                    ) {
                        if (originalTextItem !== translatedTextSplitted[translateIndex]) {
                            let innerHTMLPrev = tagInnerHTML;

                            let innerTextSplitted = splitText(tagInnerText);

                            //console.log(tag);
                            //console.log(originalTextItem);
                            //console.log(innerTextSplitted);
                            //console.log('------------');

                            /** защита от замены при которой заменяется только фрагмент предложения **/
                            if (innerTextSplitted.includes(originalTextItem)) {
                                let translatedText = translatedTextSplitted[translateIndex].replace(/\.$/, "");
                                /** защита от повторной замены **/
                                let normalizedOriginalText = prepareDelimiters(tagInnerText);
                                if (!normalizedOriginalText.includes(originalTextItem + '.' + prepareDelimiters(translatedText))) {
                                    //console.log(normalizedOriginalText);
                                    //console.log(originalTextItem + '.' + translatedText);
                                    //console.log('----------');

                                    tag.innerHTML = tagInnerHTML.replace(
                                        originalTextItem,
                                        originalTextItem + '. ' + translatedText
                                    );
                                    hasTranslated = true;
                                    tag.classList.add('js-translator-tag-has-translated');
                                    if (innerHTMLPrev !== tagInnerHTML) {
                                        indexesToRemove.push(translateIndex);
                                    }
                                }
                            }
                        } else {
                            indexesToRemove.push(translateIndex);
                        }
                    }
                }
            });
            indexesToRemove.forEach((index) => {
                //originalTextSplitted.splice(index, 1);
                //translatedTextSplitted.splice(index, 1);
            });
        }
    }
}
