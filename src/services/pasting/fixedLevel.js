import {buildTagsLevels} from "../tagsLevels";
import {tags} from "../tags";
import {getTagByFingerprint} from "../tagsFingerprint";
import {InitiationFactory} from "../initiation/initiationFactory";

export class fixedLevel {
    static execute(objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) {
        let tagsLevels = buildTagsLevels(objTextTags, tags);
        if (tagsLevels[settings.tagLevel]) {
            let strategy = InitiationFactory.getStrategy(settings.initiationMethod);
            tagsLevels[settings.tagLevel].forEach((tagHash) => {
                strategy.execute(getTagByFingerprint(tagHash), originalTextSplitted, translatedTextSplitted);
            });
        }
    }
}