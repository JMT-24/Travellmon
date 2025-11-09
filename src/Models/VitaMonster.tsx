
export class VitaMonster {
    name: string;
    type: string;
    hp: number;
    atk: number;
    exp: number;
    level: number;
    createdAt: Date;

    constructor(data: 
        {name: string; type: string; hp: number; atk: number; exp: number; level: number; createdAt: Date}
    ) {
        this.name = data.name;
        this.type = data.type;
        this.hp = data.hp;
        this.atk = data.atk;
        this.exp = data.exp;
        this.level = data.level;
        this.createdAt = data.createdAt;
  }

}
