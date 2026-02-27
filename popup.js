document.getElementById('open-settings').addEventListener('click', () => {
  chrome.runtime.openOptionsPage(); // Directly opens your options.html
});