import {textTags} from "./tags";
import md5 from "crypto-js/md5";

export const getTagByFingerprint = (tagHash, tags) => {
    var tagsFingerprints = (function() {
        var tagsFingerprints = [];
        tags.forEach((tag) => {
            let fingerprint = concatenateTagParams(tag);
            let hash = md5(fingerprint);
            //console.log(tag.innerText + hash.toString());
            tagsFingerprints[hash.toString()] = tag;
        });
        return function() { return tagsFingerprints; };
    })();
    return tagsFingerprints()[tagHash];
}

export const getTagsFingerprints = (tags) => {
    var tagsFingerprints = [];
    tags.forEach((tag) => {
        let fingerprint = concatenateTagParams(tag);
        let hash = md5(fingerprint);
        //console.log(tag.innerText + hash.toString());
        tagsFingerprints[hash.toString()] = tag;
    });
    return tagsFingerprints;
}

export const getTagFingerprint = (tag) => {
    let fingerprint = concatenateTagParams(tag);
    return md5(fingerprint).toString();
}

const concatenateTagParams = (tag) => {
    let tagParams = tag.className +
        tag.getAttributeNames().join(' ') +
        tag.id +
        tag.localName +
        tag.outerHTML +
        tag.tagName +
        tag.namespaceURI +
        tag.nodeName +
        tag.nodeValue +
        tag.textContent;
        //"";
    let tagParents = getAllParentsElements(tag);
    tagParents.forEach((tagParent) => {
        tagParams += tagParent.className;// +
            /*tagParent.getAttributeNames().join(' ') +
            tagParent.id +
            tagParent.localName +
            tagParent.outerHTML +
            tagParent.tagName +
            tagParent.namespaceURI +
            tagParent.nodeName +
            tagParent.nodeValue +
            tagParent.textContent;*/
    });
    return tagParams;
}

const getAllParentsElements = (tag) => {
    let parentElements = [];
    while (1) {
        if (tag && tag.parentElement) {
            parentElements.push(tag.parentElement);
            tag = tag.parentElement;
        } else {
            break;
        }
    }
    return parentElements;
}