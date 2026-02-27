(function() {
    if (typeof ScrollStrategy === 'undefined' || typeof UIService === 'undefined') {
        console.error("ScrollCheckpoint: Dependencies missing!");
        return;
    }

    const strategy = new ScrollStrategy();
    const ui = new UIService();

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log("Main: Action Received ->", request.action);
        
        if (request.action === "SET") {
            strategy.executeSave().then(pos => ui.showLine(pos));
        } else if (request.action === "GOTO") {
            strategy.executeRestore();
        } else if (request.action === "REMOVE") {
            // We call clear without affecting the scroll position
            ui.clear(true);
        }
        
        // This tells Chrome the message was handled successfully
        // and helps prevent background/foreground "mismatches"
        return true; 
    });
    
    console.log("ScrollCheckpoint: System Ready.");
})();