import { getInitiationStrategy } from '../initiation/initiationFactory'
import { getComponentInitiation } from '../../components/initiation/componentsFactory'

/**
 * @deprecated
 */
export const linear = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
    let initiationStrategy = getInitiationStrategy(settings.initiation);
    objTextTags.forEach((tag) => {
        initiationStrategy(tag, originalTextSplitted, translatedTextSplitted);
    });
    let componentStrategy = getComponentInitiation(settings.initiation);
    if (componentStrategy) {
        componentStrategy();
    }
}