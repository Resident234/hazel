import {generateFingerprintForTag, getTagByFingerprint, getTagFingerprint} from "../tagsFingerprint";
import {tags} from "../tags";
import md5 from "crypto-js/md5";
import {buildTagsLevels} from "../tagsLevels";
import {prepareDelimiters} from "../../components/delimiters";
import {getInitiationStrategy} from "../initiation/initiationFactory";
import {getComponentsStrategy} from "../../components/componentsFactory";

export const traversingTree = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
    let tagsChilds = [];
    let tagsHashTextMap = [];
    objTextTags.forEach((tag) => {
        if (tag.innerText.length > 0 && !tag.className.includes('js-translator-spinner')) {
            tagsHashTextMap[getTagFingerprint(tag)] = tag.innerText;
            if (tags.includes(tag.parentElement.tagName.toLowerCase())) {
                let parentTagFingerprint = getTagFingerprint(tag.parentElement);
                if (!tagsChilds[parentTagFingerprint]) {
                    tagsChilds[parentTagFingerprint] = [];
                }
                tagsChilds[parentTagFingerprint].push(getTagFingerprint(tag));
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
    let initiationStrategy = getInitiationStrategy(settings.initiationMethod);
    tagsToTranslate.forEach((tagHash) => {
        let tag = (getTagByFingerprint(tagHash));
        initiationStrategy(tag, originalTextSplitted, translatedTextSplitted);
    });
    let componentStrategy = getComponentsStrategy(settings.initiationMethod);
    if (componentStrategy) {
        componentStrategy();
    }
}