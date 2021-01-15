import {bodyTag} from "../services/tags";

export function initTap() {
    const elements = document.getElementsByTagName("tap");
    for (let element of elements) {
        element.onclick = function (event) {
            if (event.target.tagName.toLowerCase() === 'tap') {
                if (event.target.classList.contains('js-hazel--is-tap-popup-created')) {
                    if (event.target.classList.contains('js-hazel--is-tap-popup-show')) {
                        event.target.firstChild.style.display = 'none';
                        event.target.classList.remove('js-hazel--is-tap-popup-show');
                    } else {
                        event.target.firstChild.style.display = 'block';
                        event.target.classList.add('js-hazel--is-tap-popup-show');
                    }
                } else {
                    event.target.style.position = 'relative';
                    event.target.classList.add('js-hazel--is-tap-popup-created');
                    event.target.classList.add('js-hazel--is-tap-popup-show');

                    let hoverPopup = document.createElement('tap-popup');
                    let compStyles = window.getComputedStyle(event.target);
                    let compStylesBody = window.getComputedStyle(bodyTag());
                    hoverPopup.innerText = event.target.dataset.translatedText;
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
        element.onmouseover = function (event) {
            if (event.target.tagName.toLowerCase() === 'tap') {
                event.target.border = "1px solid black";//TODO: параметры выделения бордюра доработать
            }
        };
        element.onmouseout = function (event) {
            if (event.target.tagName.toLowerCase() === 'tap') {
                event.target.borderWidth = "0px";
            }
        };
    }
}