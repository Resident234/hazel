import {buildTagsLevels} from "../tagsLevels";
import {tags} from "../tags";
import {getTagByFingerprint} from "../tagsFingerprint";

export class fixedLevel {
    static execute(objTextTags, originalTextSplitted, translatedTextSplitted, tags) {
        let tagsLevels = buildTagsLevels(objTextTags, tags);
        if (tagsLevels[TAG_LEVEL]) {
            tagsLevels[TAG_LEVEL].forEach((tagHash) => {
                if (INITIATION_METHOD === 'page_onload') {
                    insertTranslatedText2Tag(getTagByFingerprint(tagHash), originalTextSplitted, translatedTextSplitted);
                } else if (INITIATION_METHOD === 'on_hover') {
                    setHoverText2Tag(getTagByFingerprint(tagHash), originalTextSplitted, translatedTextSplitted);
                } else if (INITIATION_METHOD === 'on_tap') {
                    setTapText2Tag(tag, originalTextSplitted, translatedTextSplitted);
                }
            });
        }
    }
}