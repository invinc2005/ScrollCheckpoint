// background.js
chrome.commands.onCommand.addListener((command) => {
    console.log("Shortcut Pressed:", command); // <--- LOG 1
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0]) return;

        let action;
        if (command === "set-checkpoint") action = "SET";
        else if (command === "goto-checkpoint") action = "GOTO";
        else if (command === "remove-checkpoint") action = "REMOVE";

        if (action) {
            console.log("Sending Action to Page:", action); // <--- LOG 2
            chrome.tabs.sendMessage(tabs[0].id, { action }).catch(err => {
                console.error("Message Failed. Is Gemini refreshed?", err);
            });
        }
    });
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "OPEN_OPTIONS") {
        chrome.runtime.openOptionsPage();
    }
});