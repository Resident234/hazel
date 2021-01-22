import {toRoot} from "./toRoot";
import {linear} from "./linear";
import {fixedLevel} from "./fixedLevel";
import {contentTag} from "./contentTag";
import {traversingTree} from "./traversingTree";

export const getPastingStrategy = (settings) => {
    const serviceDescriptions = [
        {name: "to_root", function: toRoot},
        {name: "linear", function: linear},
        {name: "fixed_level", function: fixedLevel},
        {name: "content_tag", function: contentTag},
        {name: "traversing_tree", function: traversingTree}
    ];

    return serviceDescriptions.find(element => element.name === settings.pasting).function;
};
