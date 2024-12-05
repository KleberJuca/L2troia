import { Observable } from '@nativescript/core';
import { format } from 'date-fns';

export class HomeViewModel extends Observable {
  private _onlinePlayers: number;
  private _serverRate: string;
  private _serverUptime: string;
  private _news: Array<NewsItem>;

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

  get onlinePlayers(): number {
    return this._onlinePlayers;
  }

  get serverRate(): string {
    return this._serverRate;
  }

  get serverUptime(): string {
    return this._serverUptime;
  }

  get news(): Array<NewsItem> {
    return this._news;
  }

  onPlayNow() {
    // Implement download or game launch logic
    console.log("Play Now clicked");
  }
}

interface NewsItem {
  title: string;
  date: string;
  description: string;
}