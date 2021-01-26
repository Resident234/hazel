import {getInitiationStrategy} from "../initiation/initiationFactory";
import {getComponentsStrategy} from "../../components/componentsFactory";

export const linear = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
    let strategy = getInitiationStrategy(settings.initiationMethod);
    objTextTags.forEach((tag) => {
        strategy(tag, originalTextSplitted, translatedTextSplitted);
    });
    strategy = getComponentsStrategy(settings.initiationMethod);
    if (strategy) {
        strategy();
    }
}