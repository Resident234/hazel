import {buildTagsLevels} from "../tagsLevels";
import {tags} from "../tags";
import {getTagByFingerprint} from "../tagsFingerprint";
import {InitiationFactory} from "../initiation/initiationFactory";

export class toRoot {
    static execute(objTextTags, originalTextSplitted, translatedTextSplitted, tags) {
        let tagsLevels = buildTagsLevels(objTextTags, tags);
        let tagsLevel = tagsLevels.length - 1;
        let strategy = InitiationFactory.getStrategy(INITIATION_METHOD);
        while (tagsLevel > 0) {
            tagsLevels[tagsLevel].forEach((tagHash) => {
                let tag = getTagByFingerprint(tagHash);
                strategy.execute(tag, originalTextSplitted, translatedTextSplitted);
            });
            tagsLevel--;
        }
    }
}