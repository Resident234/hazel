import {buildTagsLevels} from "../tagsLevels";
import {tags} from "../tags";
import {getTagByFingerprint} from "../tagsFingerprint";
import {getInitiationStrategy} from "../initiation/initiationFactory";
import {getComponentsStrategy} from "../../components/componentsFactory";

export const fixedLevel = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
    let tagsLevels = buildTagsLevels(objTextTags, tags);
    if (tagsLevels[settings.tagLevel]) {
        let strategy = getInitiationStrategy(settings.initiationMethod);
        tagsLevels[settings.tagLevel].forEach((tagHash) => {
            strategy(getTagByFingerprint(tagHash), originalTextSplitted, translatedTextSplitted);
        });
        strategy = getComponentsStrategy(settings.initiationMethod);
        if (strategy) {
            strategy();
        }
    }
}
