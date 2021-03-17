import {getInitiationStrategy} from "../initiation/initiationFactory";
import {getComponentsStrategy} from "../../components/componentsFactory";

export const linear = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
    let initiationStrategy = getInitiationStrategy(settings.initiation);
    objTextTags.forEach((tag) => {
        initiationStrategy(tag, originalTextSplitted, translatedTextSplitted);
    });
    let componentStrategy = getComponentsStrategy(settings.initiation);
    if (componentStrategy) {
        componentStrategy();
    }
}