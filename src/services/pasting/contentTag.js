import {tags} from "../tags";
import {getInitiationStrategy} from "../initiation/initiationFactory";
import {getComponentsStrategy} from "../../components/componentsFactory";

export const contentTag = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
    let strategy = getInitiationStrategy(settings.initiationMethod);
    objTextTags.forEach((tag) => {
        if (tag.className.includes('content')) {
            strategy(tag, originalTextSplitted, translatedTextSplitted);
        }
    });
    strategy = getComponentsStrategy(settings.initiationMethod);
    if (strategy) {
        strategy();
    }
}