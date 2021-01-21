import {InitiationFactory} from "../initiation/initiationFactory";
import {getTagByFingerprint} from "../tagsFingerprint";

export class linear {
    static execute(objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) {
        let strategy = InitiationFactory.getStrategy(INITIATION_METHOD);
        objTextTags.forEach((tag) => {
            strategy.execute(tag, originalTextSplitted, translatedTextSplitted);
        });
    }
}