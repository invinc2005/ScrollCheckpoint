chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "OPEN_OPTIONS") {
        chrome.runtime.openOptionsPage();
    }
});

// Keep your existing shortcut listener here
chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0]) return;
        const action = command === "set-checkpoint" ? "SET" : "GOTO";
        chrome.tabs.sendMessage(tabs[0].id, { action }).catch(() => {});
    });
});