// Saves options to chrome.storage

import { settingsGet, settingsSet } from '../../services/settings'

function save_options () {
  settingsSet({
    lang: document.getElementById('lang').value,//todo domGetElementValue('lang');
    pasting: document.getElementById('pasting').value,
    tagLevel: document.getElementById('tag_level').value,
    initiation: document.getElementById('initiation_method').value,
  }).then(() => {
    const status = document.getElementById('status')
    status.textContent = 'Options saved.'
    setTimeout(() => {
      status.textContent = ''
    }, 750)
  })
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options () {
  settingsGet().then(items => {
    document.getElementById('lang').value = items.lang
    document.getElementById('pasting').value = items.pasting
    document.getElementById('tag_level').value = items.tagLevel
    document.getElementById('initiation_method').value = items.initiation
  })
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)

