import {buildTagsLevels} from "../tagsLevels";
import {tags} from "../tags";
import {getTagByFingerprint} from "../tagsFingerprint";

export class toRoot {
    static execute(objTextTags, originalTextSplitted, translatedTextSplitted, tags) {
        let tagsLevels = buildTagsLevels(objTextTags, tags);
        let tagsLevel = tagsLevels.length - 1;
        while (tagsLevel > 0) {
            tagsLevels[tagsLevel].forEach((tagHash) => {
                let tag = getTagByFingerprint(tagHash);
                if (INITIATION_METHOD === 'page_onload') {
                    insertTranslatedText2Tag(tag, originalTextSplitted, translatedTextSplitted);
                } else if (INITIATION_METHOD === 'on_hover') {
                    setHoverText2Tag(tag, originalTextSplitted, translatedTextSplitted);
                } else if (INITIATION_METHOD === 'on_tap') {
                    setTapText2Tag(tag, originalTextSplitted, translatedTextSplitted);
                }
            });
            tagsLevel--;
        }
    }
}