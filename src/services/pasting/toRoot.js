import {buildTagsLevels} from "../tagsLevels";
import {getTagByFingerprint, getTagsFingerprints} from "../tagsFingerprint";
import {getInitiationStrategy} from "../initiation/initiationFactory";
import {getComponentsStrategy} from "../../components/componentsFactory";
import {textTags} from "../tags";

export const toRoot = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
    let tagsLevels = buildTagsLevels(objTextTags, tags);
    let tagsLevel = tagsLevels.length - 1;
    let initiationStrategy = getInitiationStrategy(settings.initiationMethod);
    let tagsFingerprints = getTagsFingerprints(textTags());
    while (tagsLevel > 0) {
        tagsLevels[tagsLevel].forEach((tagHash) => {
            console.log(tagsLevel);
            console.log(tagHash);
            let tag = getTagByFingerprint(tagHash, tagsFingerprints);
            console.log(tag);
            console.log('============');

            //initiationStrategy(tag, originalTextSplitted, translatedTextSplitted);
        });
        tagsLevel--;
    }
    let componentStrategy = getComponentsStrategy(settings.initiationMethod);
    if (componentStrategy) {
        componentStrategy();
    }
}
