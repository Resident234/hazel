import {tags} from "../tags";
import {getInitiationStrategy} from "../initiation/initiationFactory";
import {getComponentsStrategy} from "../../components/componentsFactory";

export const contentTag = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
    let initiationStrategy = getInitiationStrategy(settings.initiation);
    objTextTags.forEach((tag) => {
        if (tag.className.includes('content')) {
            initiationStrategy(tag, originalTextSplitted, translatedTextSplitted);
        }
    });
    let componentStrategy = getComponentsStrategy(settings.initiation);
    if (componentStrategy) {
        componentStrategy();
    }
}