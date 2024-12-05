import { Observable } from '@nativescript/core';
import { openUrl } from '@nativescript/core/utils';

export class SupportViewModel extends Observable {
    private _userName: string = '';
    private _userEmail: string = '';
    private _userMessage: string = '';
    private _faqItems: Array<FAQItem>;

    constructor() {
        super();
        this.loadFAQ();
    }

    get userName(): string { return this._userName; }
    set userName(value: string) {
        this._userName = value;
        this.notifyPropertyChange('userName', value);
    }

    get userEmail(): string { return this._userEmail; }
    set userEmail(value: string) {
        this._userEmail = value;
        this.notifyPropertyChange('userEmail', value);
    }

    get userMessage(): string { return this._userMessage; }
    set userMessage(value: string) {
        this._userMessage = value;
        this.notifyPropertyChange('userMessage', value);
    }

    get faqItems(): Array<FAQItem> {
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

    private loadFAQ() {
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

interface FAQItem {
    question: string;
    answer: string;
}