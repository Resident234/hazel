import {generateFingerprintForTag, getTagByFingerprint, getTagFingerprint} from "../tagsFingerprint";
import {tags} from "../tags";
import md5 from "crypto-js/md5";
import {buildTagsLevels} from "../tagsLevels";
import {prepareDelimiters} from "../../components/delimiters";

export class traversingTree {
    static execute(objTextTags, originalTextSplitted, translatedTextSplitted, tags) {
        let tagsChilds = [];
        let tagsHashTextMap = [];
        objTextTags.forEach((tag) => {
            if (tag.innerText.length > 0 && !tag.className.includes('js-translator-spinner')) {
                tagsHashTextMap[getTagFingerprint(tag)] = tag.innerText;
                if (tags.includes(tag.parentElement.tagName.toLowerCase())) {
                    let parentTagFingerprint = generateFingerprintForTag(tag.parentElement);
                    if (!tagsChilds[md5(parentTagFingerprint).toString()]) {
                        tagsChilds[md5(parentTagFingerprint).toString()] = [];
                    }
                    tagsChilds[md5(parentTagFingerprint).toString()].push(getTagFingerprint(tag));
                }
            }
        });
        let tagsLevels = buildTagsLevels(objTextTags, tags);
        let tagsToTranslate = [];
        let tagsToTranslateInit = [];
        tagsLevels[0].forEach((tagHash) => {
            tagsToTranslateInit.push(tagHash);
        });
        let stepToNextLevel = true;
        let tagsToTranslateInitNextLevel = [];
        while (stepToNextLevel) {
            stepToNextLevel = false;
            tagsToTranslateInit.forEach((tagHash) => {
                let tag = getTagByFingerprint(tagHash);
                let tagText = tag.innerText;
                tagText = prepareDelimiters(tagText);
                if (tagsChilds[tagHash]) {
                    let arTagAllChildsText = [];
                    let tagChildHashes = [];
                    tagsChilds[tagHash].forEach((tagChildHash) => {
                        let tagChild = getTagByFingerprint(tagChildHash);
                        let tagChildText = tagChild.innerText;
                        tagChildText = prepareDelimiters(tagChildText);
                        arTagAllChildsText.push(tagChildText);
                        tagChildHashes.push(tagChildHash);
                    });
                    let strTagAllChildsText = arTagAllChildsText.join('.');
                    if (tagText.length === strTagAllChildsText.length) {
                        tagsToTranslateInitNextLevel = [...tagsToTranslateInitNextLevel, ...tagChildHashes];
                        stepToNextLevel = true;
                    } else {
                        tagsToTranslate.push(tagHash);
                    }
                } else {
                    tagsToTranslate.push(tagHash);
                }
            });
            tagsToTranslateInit = tagsToTranslateInitNextLevel;
            tagsToTranslateInitNextLevel = [];
        }
        tagsToTranslate.forEach((tagHash) => {
            let tag = (getTagByFingerprint(tagHash));
            if (INITIATION_METHOD === 'page_onload') {
                insertTranslatedText2Tag(tag, originalTextSplitted, translatedTextSplitted);
            } else if (INITIATION_METHOD === 'on_hover') {
                setHoverText2Tag(tag, originalTextSplitted, translatedTextSplitted);
            } else if (INITIATION_METHOD === 'on_tap') {
                setTapText2Tag(tag, originalTextSplitted, translatedTextSplitted);
            }
        });
    }
}