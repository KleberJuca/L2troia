import { Observable } from '@nativescript/core';
export class DownloadsViewModel extends Observable {
    constructor() {
        super();
        this._downloadProgress = 0;
        this._currentPatchVersion = "1.5.2";
    }
    get downloadProgress() {
        return this._downloadProgress;
    }
    get currentPatchVersion() {
        return this._currentPatchVersion;
    }
    onDownloadClient() {
        // Implement client download logic
        console.log("Starting client download...");
        this.simulateDownload();
    }
    onDownloadPatch() {
        // Implement patch download logic
        console.log("Starting patch download...");
    }
    simulateDownload() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            this._downloadProgress = progress;
            this.notifyPropertyChange('downloadProgress', progress);
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 100);
    }
}
//# sourceMappingURL=downloads-view-model.js.map