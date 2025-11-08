export interface VitaMonster {
    id?: string,
    name: string,
    type: string,
    hp: number,
    atk: number,
    exp: number,
    level: number,
    createdAt: Date,
}

export class Monster implements VitaMonster {
    id?: string;
    name: string;
    type: string;
    hp: number;
    atk: number;
    exp: number;
    level: number;
    createdAt: Date;

    constructor (data: VitaMonster) {
        if (data.id) this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.hp = data.hp;
        this.atk = data.atk;
        this.exp = data.exp;
        this.level = data.level;
        this.createdAt = new Date();
    }
}