class CheckpointStrategy {
    async executeSave() { throw new Error("Method 'save' must be implemented."); }
    async executeRestore() { throw new Error("Method 'restore' must be implemented."); }
}