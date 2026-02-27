chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const action = command === "set-checkpoint" ? "SET" : "GOTO";
        chrome.tabs.sendMessage(tabs[0].id, { action });
    });
});