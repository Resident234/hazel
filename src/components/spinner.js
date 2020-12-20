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
        "<script type=\"text/javascript\">" +
        " \n" +
        "\t\t\t\t\t\tjQuery(function($){ \n" +
        "\t\t\t\t\t\t\t$(document).ready(function(){\n" +
        "\t\t\t\t\t\t\t\tif( typeof jQuery(\"#typed-31290215265fdf3912d95f8\").typed == \"function\"){\n" +
        "\t\t\t\t\t\t\t\t\t$(\"#typed-31290215265fdf3912d95f8\").typed({\n" +
        "\t\t\t\t\t\t\t\t\t\tstrings: [\"DESIGNERS\",\"ILLUSTRATORS\",\"TOP CODERS\",\"SEO KINGS\",\"WRITERS\",\"\"],\n" +
        "\t\t\t\t\t\t\t\t\t\ttypeSpeed: 100,\n" +
        "\t\t\t\t\t\t\t\t\t\tbackSpeed: 100,\n" +
        "\t\t\t\t\t\t\t\t\t\tstartDelay: 0,\n" +
        "\t\t\t\t\t\t\t\t\t\tbackDelay: 3500,\n" +
        "\t\t\t\t\t\t\t\t\t\tloop: true,\n" +
        "\t\t\t\t\t\t\t\t\t\tloopCount: false,\n" +
        "\t\t\t\t\t\t\t\t\t\tshowCursor: true,\n" +
        "\t\t\t\t\t\t\t\t\t\tcursorChar: \"_\",\n" +
        "\t\t\t\t\t\t\t\t\t\tattr: null\n" +
        "\t\t\t\t\t\t\t\t\t});\n" +
        "\t\t\t\t\t\t\t\t}\n" +
        "\t\t\t\t\t\t\t});\n" +
        "\t\t\t\t\t\t});\n" +
        "\t\t\t\t\t" +
        "</script><style>" +
        ".uvc-wrap-31290215265fdf3912d95f8 .typed-cursor {" +
            "color:#ffffff;" +
        "}" +
        "</style></div>";

    return spinner;
};

export function showSpinner() {
    document.querySelector('body').appendChild(spinner());
    jQuery(function ($) {
        if (typeof jQuery("#typed-31290215265fdf3912d95f8").typed == "function") {
            $("#typed-31290215265fdf3912d95f8").typed({
                strings: ["DESIGNERS", "ILLUSTRATORS", "TOP CODERS", "SEO KINGS", "WRITERS", ""],
                typeSpeed: 100,
                backSpeed: 100,
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
