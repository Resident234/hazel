import {bodyTag} from "../services/tags";

export function initHover() {
    const elements = document.getElementsByTagName("hover");
    for (let element of elements) {
        element.onmouseover = function (event) {
            if (event.target.tagName.toLowerCase() === 'hover') {
                if (event.target.classList.contains('js-hazel--is-hover-popup-created')) {
                    event.target.firstChild.style.display = 'block';
                } else {
                    event.target.style.position = 'relative';
                    event.target.classList.add('js-hazel--is-hover-popup-created');

                    let hoverPopup = document.createElement('hover-popup');
                    let compStyles = window.getComputedStyle(event.target);
                    let compStylesBody = window.getComputedStyle(bodyTag());
                    hoverPopup.innerText = event.target.innerText;
                    hoverPopup.style.width = '1200px';//TODO: вычислить ширину пока не получилось
                    hoverPopup.style.height = compStyles.lineHeight;
                    hoverPopup.style.top = '-' + compStyles.lineHeight;
                    hoverPopup.style.position = 'absolute';
                    if (compStyles.backgroundColor === 'rgba(0, 0, 0, 0)') {
                        hoverPopup.style.backgroundColor = compStylesBody.backgroundColor;
                    } else {
                        hoverPopup.style.backgroundColor = compStyles.backgroundColor;
                    }

                    event.target.insertAdjacentHTML(
                        'afterbegin',
                        hoverPopup.outerHTML
                    );
                }
            }

        };
        element.onmouseout = function (event) {
            event.target.firstChild.style.display = 'none';
        };
    }
}