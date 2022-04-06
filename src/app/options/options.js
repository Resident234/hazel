// Saves options to chrome.storage
function save_options() {
  const language = document.getElementById('lang').value;
  const pasting = document.getElementById('pasting').value;
  const tagLevel = document.getElementById('tag_level').value;
  const initiation = document.getElementById('initiation_method').value;
  chrome.storage.sync.set({
    lang: language,
    pasting: pasting,
    tagLevel: tagLevel,
    initiation: initiation,
  }, function() {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => { status.textContent = ''; }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    lang: 'ru',
    pasting: 'to_root',
    tagLevel: '1',
    initiation: 'page_onload',
  }, function(items) {
    document.getElementById('lang').value = items.lang;
    document.getElementById('pasting').value = items.pasting;
    document.getElementById('tag_level').value = items.tagLevel;
    document.getElementById('initiation_method').value = items.initiation;
    const tagLevelRow = document.getElementById('tag_level').parentElement.parentElement;//tr
    if (items.pasting === 'fixed_level') {
      tagLevelRow.style.display = 'table-row';
    } else {
      tagLevelRow.style.display = 'none';
    }
  });
}

function selector_toggle(event) {
  const tagLevelRow = document.getElementById('tag_level').parentElement.parentElement;//tr
  if (event.target.value === 'fixed_level') {
    tagLevelRow.style.display = 'table-row';
  } else {
    tagLevelRow.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('pasting').addEventListener('change', selector_toggle);

