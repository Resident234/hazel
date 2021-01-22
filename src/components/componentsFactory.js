import {initHover} from "./hover";
import {initTap} from "./tap";

export const getComponentsStrategy = (name) => {
    const serviceDescriptions = [
        {name: "on_hover", function: initHover},
        {name: "on_tap", function: initTap}
    ];
    return serviceDescriptions.find(element => element.name === name).function;
};
