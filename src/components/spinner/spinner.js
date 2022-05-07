const SPINNER_TEXT_LENGTH = 50//todo длину сомволов сделать зависимой от ширины экрана

const spinner = () => {
  const spinner = document.createElement('div')
  spinner.className = 'js-hazel--spinner hazel--spinner js-translator-component-element'
  spinner.innerHTML = '<div id="uvc-type-wrap-1980"  ' +
    'data-ultimate-target=\'#uvc-type-wrap-1980\'  ' +
    'data-responsive-json-new=\'{"font-size":"desktop:45px;","line-height":"desktop:56px;"}\'  ' +
    'class="js-translator-component-element uvc-type-wrap ult-adjust-bottom-margin ult-responsive  uvc-type-align-left uvc-type-no-prefix uvc-wrap-31290215265fdf3912d95f8" ' +
    'style="text-align:left;">' +
    '<span id="typed-31290215265fdf3912d95f8" class="ultimate-typed-main js-translator-component-element" ' +
    'style="color:#ffffff; font-family:&#039;Hind&#039;;font-weight:500; text-transform: unset;"></span>' +
    '<style>' +
    '@import url(\'https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap\');' +
    '.uvc-wrap-31290215265fdf3912d95f8 .typed-cursor {' +
    'color:#ffffff;' +
    '}' +
    '</style></div>'

  return spinner
}

export const spinnerShow = (strings) => {
  strings = strings.map(name => name.toUpperCase())
  strings = strings.map(name => name.length > SPINNER_TEXT_LENGTH ? name.substring(0, SPINNER_TEXT_LENGTH) + '...' : name)
  document.querySelector('body').appendChild(spinner())
  jQuery(function ($) {
    if (typeof jQuery('#typed-31290215265fdf3912d95f8').typed == 'function') {
      $('#typed-31290215265fdf3912d95f8').typed({
        strings: strings,
        typeSpeed: 0.2,
        backSpeed: 0.1,
        startDelay: 0,
        backDelay: 100,
        loop: true,
        loopCount: false,
        showCursor: true,
        cursorChar: '_',
        attr: null
      })
    }
  })
}

export const spinnerHide = () => {
  let spinner = document.querySelector('.js-hazel--spinner')
  spinner.className += ' hide'
}
