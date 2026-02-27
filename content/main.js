// content/main.js
(function() {
    // Check if dependencies are loaded
    if (typeof ScrollStrategy === 'undefined' || typeof UIService === 'undefined') {
        console.error("ScrollCheckpoint: Dependencies failed to load.");
        return;
    }

    const strategy = new ScrollStrategy();
    const ui = new UIService();

    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === "SET") {
            strategy.executeSave().then(pos => ui.showLine(pos));
        } else if (request.action === "GOTO") {
            strategy.executeRestore();
        }
    });
    
    console.log("ScrollCheckpoint: System Ready.");
})();