import {getTagByFingerprint, getTagFingerprint} from "../tagsFingerprint";
import {buildTagsLevels} from "../levels";
import {prepareDelimiters} from "../../components/delimiter";
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
            let tag = getTagByFingerprint(tagHash, objTextTags);
            let tagText = tag.innerText;
            tagText = prepareDelimiters(tagText);
            if (tagsChilds[tagHash]) {
                let arTagAllChildsText = [];
                let tagChildHashes = [];
                tagsChilds[tagHash].forEach((tagChildHash) => {
                    let tagChild = getTagByFingerprint(tagChildHash, objTextTags);
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
    let initiationStrategy = getInitiationStrategy(settings.initiation);
    tagsToTranslate.forEach((tagHash) => {
        let tag = (getTagByFingerprint(tagHash, objTextTags));
        initiationStrategy(tag, originalTextSplitted, translatedTextSplitted);
    });
    let componentStrategy = getComponentsStrategy(settings.initiation);
    if (componentStrategy) {
        componentStrategy();
    }
}