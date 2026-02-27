class ScrollStrategy extends CheckpointStrategy {
    // SOLID: Encapsulated logic to find the true scroller
    _getTrueScroller() {
        // First try the custom tag you found
        const infinite = document.querySelector('infinite-scroller');
        if (infinite && infinite.scrollTop > 0) return infinite;

        // Deep search: find any element that is currently scrolled down
        const all = document.querySelectorAll('*');
        for (let el of all) {
            if (el.scrollTop > 0) return el;
        }

        // Fallback to standard window scroller
        return document.documentElement || document.body;
    }

    async executeSave() {
        const scroller = this._getTrueScroller();
        const y = scroller.scrollTop;
        
        console.log("Saving from:", scroller.tagName, "Class:", scroller.className, "Y:", y);
        
        await chrome.storage.local.set({ "last_y": y });
        return y;
    }

    async executeRestore() {
        const data = await chrome.storage.local.get("last_y");
        if (data.last_y === undefined) return;

        const scroller = this._getTrueScroller();
        scroller.scrollTo({ 
            top: data.last_y, 
            behavior: 'smooth' 
        });
    }
}