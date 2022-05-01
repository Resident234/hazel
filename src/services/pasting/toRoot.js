import { getComponentInitiation } from '../../components/initiation/componentsFactory'
import { getInitiationStrategy } from '../initiation/initiationFactory'
import { tagLevelsService } from '../tag/tag'

/**
 * @ignore
 */
export const toRoot = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
    let tagsLevels;
    let tagsMap;
    [tagsLevels, tagsMap] = tagLevelsService('levelsBuild')(objTextTags, tags);
    let tagsLevel = tagsLevels.length - 1;
    let initiationStrategy = getInitiationStrategy(settings.initiation);
    while (tagsLevel > 0) {
        tagsLevels[tagsLevel].forEach((tagHash) => {
            let tag = tagsMap[tagHash].tag;
            if (tagsMap[tagHash].originalTextSplitted.length > 0) {
                let originalTextSplittedLocal = tagsMap[tagHash].originalTextSplitted;
                let translatedTextSplittedLocal = [];
                originalTextSplittedLocal.forEach((text) => {
                    let index = originalTextSplitted.findIndex(item => item === text);
                    //TODO: для оптимизации поиска после замены удалять элементы из originalTextSplitted
                    if (translatedTextSplitted[index] !== undefined) {
                        translatedTextSplittedLocal.push(translatedTextSplitted[index]);
                    } else {
                        translatedTextSplittedLocal.push(text);
                    }
                });

                initiationStrategy(tag, originalTextSplittedLocal, translatedTextSplittedLocal);
            }
        });
        tagsLevel--;
    }
    let componentStrategy = getComponentInitiation(settings.initiation);
    if (componentStrategy) {
        componentStrategy();
    }
}
