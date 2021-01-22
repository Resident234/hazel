import {pageOnload} from "./pageOnload";
import {onHover} from "./onHover";
import {onTap} from "./onTap";

export const getInitiationStrategy = (name) => {
    const serviceDescriptions = [
        {name: "page_onload", function: pageOnload},
        {name: "on_hover", function: onHover},
        {name: "on_tap", function: onTap}
    ];
    return serviceDescriptions.find(element => element.name === name).function;
};
