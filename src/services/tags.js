export const tagSelector = () => {
    const tags = ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'strong', 'li', 'td', 'div', 'a']
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