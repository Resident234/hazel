import {buildTagsLevels} from "../tagsLevels";
import {getInitiationStrategy} from "../initiation/initiationFactory";
import {getComponentsStrategy} from "../../components/componentsFactory";

export const toRoot = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
    //console.log(originalTextSplitted);
    //console.log(translatedTextSplitted);
    let tagsLevels;
    let tagsMap;
    [tagsLevels, tagsMap] = buildTagsLevels(objTextTags, tags);
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
                    //console.log(Object.assign({}, originalTextSplitted));
                    //console.log(text);
                    //console.log(index);
                    //console.log('------');
                    if (translatedTextSplitted[index] !== undefined) {
                        translatedTextSplittedLocal.push(translatedTextSplitted[index]);
                    } else {
                        //console.log(index);
                        //console.log(text);
                        translatedTextSplittedLocal.push(text);
                    }
                });

                //console.log(tag);
                //console.log(Object.assign({}, originalTextSplittedLocal));
                //console.log(Object.assign({}, translatedTextSplittedLocal));
                //console.log(Object.assign({}, originalTextSplitted));
                //console.log(Object.assign({}, translatedTextSplitted));
                //console.log('-----------');
                initiationStrategy(tag, originalTextSplittedLocal, translatedTextSplittedLocal);
            }
        });
        tagsLevel--;
    }
    let componentStrategy = getComponentsStrategy(settings.initiation);
    if (componentStrategy) {
        componentStrategy();
    }
}