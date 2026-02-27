class UIService {
    constructor() {
        this.activeMarker = null;
        this.activeMenu = null;
    }

    async showLine(y) {
        this.clear(false); // Remove existing marker from UI only

        const scroller = new ScrollStrategy()._getTrueScroller();
        const settings = await chrome.storage.local.get(['userColor', 'userEmoji']);
        
        const marker = document.createElement('div');
        marker.className = 'checkpoint-marker';
        marker.style.top = `${y}px`;
        marker.innerText = settings.userEmoji || "📍"; 
        
        marker.style.textShadow = `0 0 10px ${settings.userColor || '#4285f4'}`;

        scroller.style.position = 'relative';
        scroller.appendChild(marker);
        this.activeMarker = marker;
    }
    _createMenu(y) {
        const menu = document.createElement('div');
        menu.className = 'checkpoint-menu';
        menu.style.top = `${y + 30}px`; // Offset below the marker
        menu.style.display = 'none';

        // Option 1: Scroll to Here (Placeholder for future logic)
        const optScroll = document.createElement('div');
        optScroll.className = 'checkpoint-menu-item';
        optScroll.innerText = "Jump to this";
        optScroll.onclick = () => window.scrollTo({top: y, behavior: 'smooth'});

        // Option 2: Settings Redirect
        const optSettings = document.createElement('div');
        optSettings.className = 'checkpoint-menu-item';
        optSettings.innerText = "Settings";
        optSettings.onclick = () => chrome.runtime.sendMessage({action: "OPEN_OPTIONS"});

        menu.appendChild(optScroll);
        menu.appendChild(optSettings);
        return menu;
    }

    _cleanup() {
        if (this.activeMarker) this.activeMarker.remove();
        if (this.activeMenu) this.activeMenu.remove();
    }
    clear(removeFromStorage = true) {
        // Remove the element from the DOM
        if (this.activeMarker) {
            this.activeMarker.remove();
            this.activeMarker = null;
        }
        
        // Wipe the data from memory so it doesn't reappear on reload
        if (removeFromStorage) {
            chrome.storage.local.remove("last_y");
            console.log("ScrollCheckpoint: Data and Marker cleared.");
        }
    }
}