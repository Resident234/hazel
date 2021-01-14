export function initHover() {
    var element = document.getElementsByTagName("hover")[0];
    element.onmouseover = function (event) {
        event.target.insertAdjacentHTML('afterbegin', '<hover-popup>====</hover-popup>');
        console.log('onmouseover');
    }
}