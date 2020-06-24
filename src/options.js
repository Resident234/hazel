// Saves options to chrome.storage
function save_options() {
  const language = document.getElementById('lang').value;
  chrome.storage.sync.set({
    lang: language
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
    lang: 'ru'
  }, function(items) {
    document.getElementById('lang').value = items.lang;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

