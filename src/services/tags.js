export const tags = ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'strong', 'li', 'td', 'div', 'a', 'option', 'em', 'header', 'section'];
export const tagSelector = () => {
    return tags.map((t) => {
        return '' + t;
    })
        .concat(tags.map((t) => {
            return '' + t;
        }))
        .join(', ');
};

export const bodySelector = () => {
    return 'body';
};

export const textTags = () => {
    return document.querySelectorAll(tagSelector());
}

export const bodyTag = () => {
    return document.querySelector(bodySelector());
}
