/**
 * @deprecated
 */
import { getInitiationStrategy } from '../initiation/initiationFactory'
import { tagFingerprintService } from '../tag/tag'
import { getTag } from '../tag/fingerprint'
import { getComponentInitiation } from '../../components/initiation/componentsFactory'

export const fixedLevel = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
    let tagsLevels = buildTagsLevels(objTextTags, tags);
    if (tagsLevels[settings.tagLevel]) {
        let initiationStrategy = getInitiationStrategy(settings.initiation);
        tagsLevels[settings.tagLevel].forEach((tagHash) => {
            initiationStrategy(tagFingerprintService('getTag')(tagHash), originalTextSplitted, translatedTextSplitted);
        });
        let componentStrategy = getComponentInitiation(settings.initiation);
        if (componentStrategy) {
            componentStrategy();
        }
    }
}
