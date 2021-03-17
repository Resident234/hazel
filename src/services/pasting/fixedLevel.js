import {buildTagsLevels} from "../tagsLevels";
import {tags} from "../tags";
import {getTagByFingerprint} from "../tagsFingerprint";
import {getInitiationStrategy} from "../initiation/initiationFactory";
import {getComponentsStrategy} from "../../components/componentsFactory";

export const fixedLevel = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
    let tagsLevels = buildTagsLevels(objTextTags, tags);
    if (tagsLevels[settings.tagLevel]) {
        let initiationStrategy = getInitiationStrategy(settings.initiation);
        tagsLevels[settings.tagLevel].forEach((tagHash) => {
            initiationStrategy(getTagByFingerprint(tagHash), originalTextSplitted, translatedTextSplitted);
        });
        let componentStrategy = getComponentsStrategy(settings.initiation);
        if (componentStrategy) {
            componentStrategy();
        }
    }
}
