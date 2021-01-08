import md5 from "crypto-js/md5";
import {bodySelector} from "./tags";
import {generateFingerprintForTag, getTagFingerprint} from "./tagsFingerprint";

export const buildTagsLevels = (tags, tagsNames) => {
    let tagsChilds = [];
    let tagsLevels = [];
    tagsLevels[0] = [];
    tags.forEach((tag) => {
        if (tag.innerText.length > 0 && !tag.className.includes('js-translator-spinner')) {
            if (tagsNames.includes(tag.parentElement.tagName.toLowerCase())) {
                let parentTagFingerprint = generateFingerprintForTag(tag.parentElement);
                if (!tagsChilds[md5(parentTagFingerprint).toString()]) {
                    tagsChilds[md5(parentTagFingerprint).toString()] = [];
                }
                tagsChilds[md5(parentTagFingerprint).toString()].push(getTagFingerprint(tag));
            } else if (bodySelector() === tag.parentElement.tagName.toLowerCase()) {
                tagsLevels[0].push(getTagFingerprint(tag));
            }
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

    return tagsLevels;
}