export const tags = [
    'p',
    'blockquote',
    'pre',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'span',
    'strong',
    'li',
    'td',
    'div',
    'a',
    'option',
    'em',
    'header',
    'section',
    'ul',
    'nav',
    'aside',
    'select',
];
export const tagSelector = () => {
    return tags.map((t) => {
        return '' + t + ':not(.js-translator-component-element)';
    })
        .concat(tags.map((t) => {
            return '' + t + ':not(.js-translator-component-element)';
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

export const excludeTags = ['code'];
export const excludeTagsSelector = () => {
    return excludeTags.map((t) => {
        return '' + t;
    })
        .concat(excludeTags.map((t) => {
            return '' + t;
        }))
        .join(', ');
};
export const excludeTextTags = () => {
    return document.querySelectorAll(excludeTagsSelector());
}