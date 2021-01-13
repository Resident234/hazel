import {textTags} from "./tags";
import md5 from "crypto-js/md5";

export const getTagByFingerprint = (tagHash) => {
    let tagsFingerprints = getTagsFingerprints(textTags());
    return tagsFingerprints[tagHash];
}

export const getTagsFingerprints = (tags) => {
    let tagsFingerprints = [];
    tags.forEach((tag) => {
        //if (tag.innerText.length > 0) {
            let fingerprint =
                tag.className +
                tag.getAttributeNames().join(' ') +
                tag.id +
                tag.localName +
                tag.outerHTML +
                tag.tagName +
                tag.namespaceURI +
                tag.nodeName +
                tag.nodeValue +
                tag.textContent;
            let hash = md5(fingerprint);
            tagsFingerprints[hash.toString()] = tag;
        //}
    });
    return tagsFingerprints;
}

export const getTagFingerprint = (tag) => {
    let fingerprint =
        tag.className +
        tag.getAttributeNames().join(' ') +
        tag.id +
        tag.localName +
        tag.outerHTML +
        tag.tagName +
        tag.namespaceURI +
        tag.nodeName +
        tag.nodeValue +
        tag.textContent;
    let hash = md5(fingerprint);
    return hash.toString();
}

export const generateFingerprintForTag = (tag) => {
    return  tag.className +
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