class UIService {
    constructor() {
        this.activeLine = null;
    }

    showLine(y) {
        // Use the same search logic
        const scroller = new ScrollStrategy()._getTrueScroller();

        if (this.activeLine) this.activeLine.remove();

        const line = document.createElement('div');
        line.className = 'checkpoint-marker';
        line.style.top = `${y}px`;
        
        // Ensure the scroller can host the absolute line
        if (getComputedStyle(scroller).position === 'static') {
            scroller.style.position = 'relative';
        }

        scroller.appendChild(line);
        this.activeLine = line;

        // Flash confirmation
        scroller.style.transition = "outline 0.2s";
        scroller.style.outline = "4px solid #4285f4";
        setTimeout(() => scroller.style.outline = "none", 300);
    }
}