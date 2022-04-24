import { tagFingerprintService } from './tag'
import { DELIMITER_FOR_TRANSLATED_TEXT, delimiterPrepare } from '../../components/delimiter/delimiter'
import { helperSanitizeTextArray } from '../helper'

export const levelsBuild = (tags, tagsNames) => {
    let tagsChilds = [];
    let tagsLevels = [];
    let tagsMap = [];

    tagsLevels[0] = [];
    tags.forEach((tag) => {
        if (tag.innerText.length > 0 && !tag.className.includes('js-translator-spinner')) {
            if (tagsNames.includes(tag.parentElement.tagName.toLowerCase())) {
                let parentTagFingerprint = tagFingerprintService('fingerprint')(tag.parentElement);
                if (!tagsChilds[parentTagFingerprint]) {
                    tagsChilds[parentTagFingerprint] = [];
                }
                tagsChilds[parentTagFingerprint].push(tagFingerprintService('fingerprint')(tag));
            } else if (bodySelector() === tag.parentElement.tagName.toLowerCase()) {
                tagsLevels[0].push(tagFingerprintService('fingerprint')(tag));
            }
            let text = tag.innerText;
            text = delimiterPrepare(text);
            text = text.split(DELIMITER_FOR_TRANSLATED_TEXT);
            text = helperSanitizeTextArray(text);
            tagsMap[tagFingerprintService('fingerprint')(tag)] = {
                originalTextSplitted: text,
                tag: tag
            };
        }
    });
    let level = 0;

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