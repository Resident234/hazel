import md5 from "crypto-js/md5";
import {allTags, bodySelector} from "./tags";
import {generateFingerprintForTag, getTagByFingerprint, getTagFingerprint} from "./tagsFingerprint";
import {DELIMITER_FOR_TRANSLATED_TEXT, DELIMITER_TEXT, prepareDelimiters} from "../components/delimiters";
import {sanitizeTextArray} from "./helpers";

export const buildTagsLevels = (tags, tagsNames) => {
    let tagsChilds = [];
    let tagsLevels = [];
    let tagsMap = [];

    tagsLevels[0] = [];
    tags.forEach((tag) => {
        if (tag.innerText.length > 0 && !tag.className.includes('js-translator-spinner')) {
            if (tagsNames.includes(tag.parentElement.tagName.toLowerCase())) {
                let parentTagFingerprint = getTagFingerprint(tag.parentElement);
                if (!tagsChilds[parentTagFingerprint]) {
                    tagsChilds[parentTagFingerprint] = [];
                }
                tagsChilds[parentTagFingerprint].push(getTagFingerprint(tag));
            } else if (bodySelector() === tag.parentElement.tagName.toLowerCase()) {
                tagsLevels[0].push(getTagFingerprint(tag));
            }
            let text = tag.innerText;
            text = prepareDelimiters(text);
            text = text.split(DELIMITER_FOR_TRANSLATED_TEXT);
            text = sanitizeTextArray(text);
            tagsMap[getTagFingerprint(tag)] = {
                originalTextSplitted: text,
                tag: tag
            };
        }
    });
    let level = 0;

    //console.log(tagsMap);
    while (1) {
        if (tagsLevels[level]) {
            tagsLevels[level].forEach((tagHash) => {
                if (tagsChilds[tagHash]) {
                    let nextLevel = level + 1;
                    if (tagsLevels[nextLevel]) {
                        tagsLevels[nextLevel] = [...tagsLevels[nextLevel], ...tagsChilds[tagHash]];
                    } else {
                        tagsLevels[nextLevel] = [...tagsChilds[tagHash]];
                    }
                }
            });
            level++;
        } else {
            break;
        }
    }

    return [tagsLevels, tagsMap];
}