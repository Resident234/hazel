export const translate = (text, API_KEY, LANGUAGE) => {
    const options = {
        method: 'POST',
        body: `key=${API_KEY}&q=${encodeURIComponent(text)}&source=en&target=${LANGUAGE}&model=nmt&format=text`, // `format=text` keeps new line characters
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
    };

    return fetch(`https://translation.googleapis.com/language/translate/v2/`, options)
        .then((response) => {
            if (response.status !== 200) {
                console.log(`Google Translation error: ${response.status}`);
                return;
            }
            return response.json();
        });
};