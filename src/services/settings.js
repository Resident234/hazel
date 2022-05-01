const settingsDefault = {
  languageSource: 'en',
  languageTarget: 'ru',
}

const getStorageData = key => {
  return new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, result =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  )
}, setStorageData = data => {
  return new Promise((resolve, reject) =>
    chrome.storage.sync.set(data, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  )
}

export async function settingsGetAll () {
  return await getStorageData(settingsDefault)
}

export async function settingsGet (key) {
  return await getStorageData(key)
}

export async function settingsSet (data) {
  return setStorageData(data)
}
