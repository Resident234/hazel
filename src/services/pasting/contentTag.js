import {tags} from "../tags";
import {InitiationFactory} from "../initiation/initiationFactory";

export class contentTag {
    static execute(objTextTags, originalTextSplitted, translatedTextSplitted, tags) {
        let strategy = InitiationFactory.getStrategy(INITIATION_METHOD);
        objTextTags.forEach((tag) => {
            if (tag.className.includes('content')) {
                strategy.execute(tag, originalTextSplitted, translatedTextSplitted);
            }
        });
    }
}