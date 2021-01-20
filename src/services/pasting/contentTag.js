import {tags} from "../tags";

export class contentTag {
    static execute(objTextTags, originalTextSplitted, translatedTextSplitted, tags) {
        objTextTags.forEach((tag) => {
            if (tag.className.includes('content')) {
                if (INITIATION_METHOD === 'page_onload') {
                    insertTranslatedText2Tag(tag, originalTextSplitted, translatedTextSplitted);
                } else if (INITIATION_METHOD === 'on_hover') {
                    setHoverText2Tag(tag, originalTextSplitted, translatedTextSplitted);
                } else if (INITIATION_METHOD === 'on_tap') {
                    setTapText2Tag(tag, originalTextSplitted, translatedTextSplitted);
                }
            }
        });
    }
}