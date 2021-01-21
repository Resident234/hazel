import {toRoot} from "./toRoot";
import {linear} from "./linear";
import {fixedLevel} from "./fixedLevel";
import {contentTag} from "./contentTag";
import {traversingTree} from "./traversingTree";

export class PastingFactory {
    static serviceDescriptions = [
        {name: "to_root", service: toRoot},
        {name: "linear", service: linear},
        {name: "fixed_level", service: fixedLevel},
        {name: "content_tag", service: contentTag},
        {name: "traversing_tree", service: traversingTree}
    ];

    static getStrategy = (name) => {
        return this.serviceDescriptions.find(element => element.name === name);
    };
}