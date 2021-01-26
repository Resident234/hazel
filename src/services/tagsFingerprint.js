import {textTags} from "./tags";
import md5 from "crypto-js/md5";

export const getTagByFingerprint = (tagHash) => {
    let tagsFingerprints = getTagsFingerprints(textTags());
    return tagsFingerprints[tagHash];
}

export const getTagsFingerprints = (tags) => {
    let tagsFingerprints = [];
    tags.forEach((tag) => {
        let fingerprint = concatenateTagParams(tag);
        let hash = md5(fingerprint);
        tagsFingerprints[hash.toString()] = tag;
    });
    return tagsFingerprints;
}

export const getTagFingerprint = (tag) => {
    let fingerprint = concatenateTagParams(tag);
    return md5(fingerprint).toString();
}

const concatenateTagParams = (tag) => {
    return tag.className +
    tag.getAttributeNames().join(' ') +
    tag.id +
    tag.localName +
    tag.outerHTML +
    tag.tagName +
    tag.namespaceURI +
    tag.nodeName +
    tag.nodeValue +
    tag.textContent;
}