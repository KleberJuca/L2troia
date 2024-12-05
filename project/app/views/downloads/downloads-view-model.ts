import { Observable } from '@nativescript/core';

export class DownloadsViewModel extends Observable {
    private _downloadProgress: number = 0;
    private _currentPatchVersion: string = "1.5.2";

    constructor() {
        super();
    }

    get downloadProgress(): number {
        return this._downloadProgress;
    }

    get currentPatchVersion(): string {
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

    private simulateDownload() {
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