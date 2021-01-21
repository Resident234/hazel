import {pageOnload} from "./pageOnload";
import {onHover} from "./onHover";
import {onTap} from "./onTap";

export class InitiationFactory {
    static serviceDescriptions = [
        {name: "page_onload", service: pageOnload},
        {name: "on_hover", service: onHover},
        {name: "on_tap", service: onTap}
    ];

    static getStrategy = (name) => {
        return this.serviceDescriptions.find(element => element.name === name);
    };
}