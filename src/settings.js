let settingsDefault = {
    apiKey: 'AIzaSyAF1CytYsyI6LLYG-chkH93_4HmBjMZOVI',//todo не хранить в репе , запрашивать с внешнего источника
    language: 'lang',
};
const getStorageData = key => {
    return new Promise((resolve, reject) =>
        chrome.storage.sync.get(key, result =>
            chrome.runtime.lastError
                ? reject(Error(chrome.runtime.lastError.message))
                : resolve(result)
        )
    );
}, setStorageData = data => {
    return new Promise((resolve, reject) =>
        chrome.storage.sync.set(data, () =>
            chrome.runtime.lastError
                ? reject(Error(chrome.runtime.lastError.message))
                : resolve()
        )
    );
};

export async function settingsGet() {
    return await getStorageData(settingsDefault);
}
export async function settingsSet(data) {
    return setStorageData(data);
}