document.getElementById('save-btn').addEventListener('click', () => {
    const color = document.getElementById('checkpointColor').value;
    const emoji = document.getElementById('emojiChoice').value;

    chrome.storage.local.set({ 
        userColor: color, 
        userEmoji: emoji 
    }, () => {
        // Simple Material-style feedback
        const btn = document.getElementById('save-btn');
        const originalText = btn.innerText;
        btn.innerText = "Saved!";
        btn.style.backgroundColor = "#0d652d";
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "#1a73e8";
        }, 1500);
    });
});

// Load preferences on open
chrome.storage.local.get(['userColor', 'userEmoji'], (data) => {
    if (data.userColor) document.getElementById('checkpointColor').value = data.userColor;
    if (data.userEmoji) document.getElementById('emojiChoice').value = data.userEmoji;
});