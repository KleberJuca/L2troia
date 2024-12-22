import { Observable } from '@nativescript/core';
export class RankingsViewModel extends Observable {
    constructor() {
        super();
        this._currentRankingType = 'pvp';
        this.loadRankings();
    }
    get rankings() {
        return this._rankings;
    }
    onPvPRanking() {
        this._currentRankingType = 'pvp';
        this.loadRankings();
    }
    onPKRanking() {
        this._currentRankingType = 'pk';
        this.loadRankings();
    }
    loadRankings() {
        // Simulate API call
        this._rankings = [
            { position: 1, characterName: "DeathKnight", className: "Duelist", score: "15,432" },
            { position: 2, characterName: "Shadowmage", className: "Archmage", score: "14,876" },
            { position: 3, characterName: "DragonSlayer", className: "Hawkeye", score: "14,543" },
            { position: 4, characterName: "StormBringer", className: "Soultaker", score: "13,998" },
            { position: 5, characterName: "LightBringer", className: "Cardinal", score: "13,654" }
        ];
        this.notifyPropertyChange('rankings', this._rankings);
    }
}
//# sourceMappingURL=rankings-view-model.js.map