import { Observable } from '@nativescript/core';
import { openUrl } from '@nativescript/core/utils';
export class SupportViewModel extends Observable {
    constructor() {
        super();
        this._userName = '';
        this._userEmail = '';
        this._userMessage = '';
        this.loadFAQ();
    }
    get userName() { return this._userName; }
    set userName(value) {
        this._userName = value;
        this.notifyPropertyChange('userName', value);
    }
    get userEmail() { return this._userEmail; }
    set userEmail(value) {
        this._userEmail = value;
        this.notifyPropertyChange('userEmail', value);
    }
    get userMessage() { return this._userMessage; }
    set userMessage(value) {
        this._userMessage = value;
        this.notifyPropertyChange('userMessage', value);
    }
    get faqItems() {
        return this._faqItems;
    }
    onJoinDiscord() {
        openUrl('https://discord.gg/l2troia');
    }
    onSubmitSupport() {
        console.log('Support ticket submitted:', {
            name: this._userName,
            email: this._userEmail,
            message: this._userMessage
        });
        // Reset form
        this.userName = '';
        this.userEmail = '';
        this.userMessage = '';
    }
    loadFAQ() {
        this._faqItems = [
            {
                question: "Como começar a jogar?",
                answer: "Faça o download do cliente, instale o jogo e patch, crie sua conta e comece sua aventura!"
            },
            {
                question: "Quais são as rates do servidor?",
                answer: "EXP: 100x, SP: 100x, Drop: 50x, Adena: 1000x"
            },
            {
                question: "Como reportar um bug?",
                answer: "Use nosso sistema de suporte ou entre em contato pelo Discord."
            }
        ];
        this.notifyPropertyChange('faqItems', this._faqItems);
    }
}
//# sourceMappingURL=support-view-model.js.map