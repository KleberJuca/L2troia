import { Observable } from '@nativescript/core';
import { format } from 'date-fns';
export class HomeViewModel extends Observable {
    constructor() {
        super();
        this._onlinePlayers = 1500;
        this._serverRate = "100x";
        this._serverUptime = "99.9%";
        this._news = [
            {
                title: "Novo Evento PvP",
                date: format(new Date(), 'dd/MM/yyyy'),
                description: "Grande evento PvP com premiações exclusivas!"
            },
            {
                title: "Atualização do Servidor",
                date: format(new Date(), 'dd/MM/yyyy'),
                description: "Novas features e melhorias de performance"
            }
        ];
        this.notifyPropertyChange('onlinePlayers', this._onlinePlayers);
        this.notifyPropertyChange('serverRate', this._serverRate);
        this.notifyPropertyChange('serverUptime', this._serverUptime);
        this.notifyPropertyChange('news', this._news);
    }
    get onlinePlayers() {
        return this._onlinePlayers;
    }
    get serverRate() {
        return this._serverRate;
    }
    get serverUptime() {
        return this._serverUptime;
    }
    get news() {
        return this._news;
    }
    onPlayNow() {
        // Implement download or game launch logic
        console.log("Play Now clicked");
    }
}
//# sourceMappingURL=home-view-model.js.map