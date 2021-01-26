import {bodySelector, bodyTag, tags, textTags} from "./tags";
import md5 from "crypto-js/md5";
import {
    DELIMITER_FOR_TRANSLATED_TEXT,
    DELIMITER_TEXT, prepareDelimiters,
    prepareDelimitersBeforeSubmitToTranslation
} from "../components/delimiters";
import {buildTagsLevels} from "./tagsLevels";
import {generateFingerprintForTag, getTagByFingerprint, getTagFingerprint} from "./tagsFingerprint";
import {initHover} from "../components/hover";
import {initTap} from "../components/tap";
import {getPastingStrategy} from "./pasting/pastingFactory";

export const insertText2Page = (originalText, translatedText, settings) => {
    const objTextTags = textTags();

    //console.log(Object.assign({}, originalTextSplitted));
    //console.log(Object.assign({}, translatedTextSplitted));

    let pastingStrategy = getPastingStrategy(settings);
    pastingStrategy(objTextTags, originalText, translatedText, tags, settings);
}

export const setIsTranslated = () => {
    const objBodyTag = bodyTag();
    objBodyTag.classList.add('js-translator-is-translated');
}

export const hasIsTranslated = () => {
    const objBodyTag = bodyTag();
    return objBodyTag.classList.contains('js-translator-is-translated');
}
