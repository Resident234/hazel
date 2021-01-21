import {buildTagsLevels} from "../tagsLevels";
import {tags} from "../tags";
import {getTagByFingerprint} from "../tagsFingerprint";
import {InitiationFactory} from "../initiation/initiationFactory";

export class fixedLevel {
    static execute(objTextTags, originalTextSplitted, translatedTextSplitted, tags) {
        let tagsLevels = buildTagsLevels(objTextTags, tags);
        if (tagsLevels[TAG_LEVEL]) {
            let strategy = InitiationFactory.getStrategy(INITIATION_METHOD);
            tagsLevels[TAG_LEVEL].forEach((tagHash) => {
                strategy.execute(getTagByFingerprint(tagHash), originalTextSplitted, translatedTextSplitted);
            });
        }
    }
}