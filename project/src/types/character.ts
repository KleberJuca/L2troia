export interface Character {
    login: string;
    name: string;
    level: number;
    className: string;
    clan: string;
    //status: string;
    lastAccess: string;
    onlineTime: number;
    hp: {
        current: number;
        max: number;
    };
    mp: {
        current: number;
        max: number;
    };
    cp: {
        current: number;
        max: number;
    };
    stats: {
        pAtk: number;
        mAtk: number;
        pDef: number;
        mDef: number;
        accuracy: number;
        evasion: number;
        critRate: number;
        speed: number;
        atkSpd: number;
        castSpd: number;
        str: number;
        dex: number;
        con: number;
        int: number;
        wit: number;
        men: number;
    };
    social: {
        pvpPk: number;
        karma: number;
        fame: number;
    };
    Activity: {
        lastAccess: string;
        onlineTime: number
    };
}