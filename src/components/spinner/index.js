
export const spinner = () => {
    const spinner = document.createElement('div');
    spinner.className = 'js-translator-spinner translator-spinner';
    spinner.innerHTML = '<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div>' +
        '<div class="rect4"></div><div class="rect5"></div>';
    return spinner;
};