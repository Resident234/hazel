import {buildTagsLevels} from "../tagsLevels";
import {getTagByFingerprint, getTagsFingerprints} from "../tagsFingerprint";
import {getInitiationStrategy} from "../initiation/initiationFactory";
import {getComponentsStrategy} from "../../components/componentsFactory";
import {textTags} from "../tags";
import {getTagFingerprint} from "../../../translator-extention/src/services/tagsFingerprint";

export const toRoot = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
    let tagsLevels;
    let tagsMap;
    [tagsLevels, tagsMap] = buildTagsLevels(objTextTags, tags);
    let tagsLevel = tagsLevels.length - 1;
    let initiationStrategy = getInitiationStrategy(settings.initiation);

    //console.log(tagsMap);
    //tagsTree - дерево тегов
    //tagsOriginalTextTree - дерево из оригинального текста
    //tagsTranslatedTextTree - дерево из переведенного текста
    //tagsOriginalTextMap - [отпечаток тега] => [элементы из originalTextSplitted , входящие в этот тег]
    //tagsTranslatedTextMap - [отпечаток тега] => [элементы из translatedTextSplitted , входящие в этот тег]

    //console.log(tagsLevels);
    while (tagsLevel > 0) {
        tagsLevels[tagsLevel].forEach((tagHash) => {
            let tag = getTagByFingerprint(tagHash, objTextTags);
            if (tagsMap[tagHash].originalTextSplitted.length > 0) {
                let originalTextSplittedLocal = tagsMap[tagHash].originalTextSplitted;
                let translatedTextSplittedLocal = [];
                let commonIndexes = [];
                originalTextSplittedLocal.forEach((text) => {
                    let index = originalTextSplitted.findIndex(item => item === text);
                    if (translatedTextSplitted[index] !== undefined) {
                        translatedTextSplittedLocal.push(translatedTextSplitted[index]);
                    } else {
                        translatedTextSplittedLocal.push(text);
                    }
                    commonIndexes.push(index);
                });

                initiationStrategy(tag, originalTextSplittedLocal, translatedTextSplittedLocal);

                commonIndexes.forEach((index) => {
                    originalTextSplitted.splice(index, 1);
                    translatedTextSplitted.splice(index, 1);
                });
            }
        });
        tagsLevel--;
    }
    let componentStrategy = getComponentsStrategy(settings.initiation);
    if (componentStrategy) {
        componentStrategy();
    }
}
//For example, if a page has a form to allow users to add their own comments, like this page here, the form should use POST.
//For example, if a page has a form to allow users to add their own comments, like this page here, the form should use POST