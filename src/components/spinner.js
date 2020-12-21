const spinner = () => {
    const spinner = document.createElement('div');
    spinner.className = 'js-translator-spinner translator-spinner';
    spinner.innerHTML = "<div id=\"uvc-type-wrap-1980\"  " +
        "data-ultimate-target='#uvc-type-wrap-1980'  " +
        "data-responsive-json-new='{\"font-size\":\"desktop:45px;\",\"line-height\":\"desktop:50px;\"}'  " +
        "class=\"uvc-type-wrap  ult-adjust-bottom-margin ult-responsive  uvc-type-align-left uvc-type-no-prefix uvc-wrap-31290215265fdf3912d95f8\" " +
        "style=\"text-align:left;\">" +
        "<span id=\"typed-31290215265fdf3912d95f8\" class=\"ultimate-typed-main \" " +
        "style=\"color:#ffffff; font-family:&#039;Hind&#039;;font-weight:500; text-transform: unset;\"></span>" +
        "<style>" +
        "@import url('https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap');" +
        ".uvc-wrap-31290215265fdf3912d95f8 .typed-cursor {" +
            "color:#ffffff;" +
        "}\n" +
        "</style></div>";

    return spinner;
};

export function showSpinner() {
    document.querySelector('body').appendChild(spinner());
    jQuery(function ($) {
        if (typeof jQuery("#typed-31290215265fdf3912d95f8").typed == "function") {
            $("#typed-31290215265fdf3912d95f8").typed({
                strings: ["Please wait".toUpperCase(), "Text translation in progress".toUpperCase()],
                typeSpeed: 30,
                backSpeed: 30,
                startDelay: 0,
                backDelay: 3500,
                loop: true,
                loopCount: false,
                showCursor: true,
                cursorChar: "_",
                attr: null
            });
        }
    });
}

export function hideSpinner() {
    let spinner = document.querySelector('.js-translator-spinner');
    spinner.className = spinner.className + ' hide';
}
