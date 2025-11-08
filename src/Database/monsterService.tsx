import { getApp } from "@react-native-firebase/app";
import { Monster } from "../Models/VitaMonster"
import { collection, getDocs, getFirestore, updateDoc, doc } from "@react-native-firebase/firestore";


export const newUserMonster = (): Monster => {
    const wokamon = new Monster({
        name: "Woka-mon",
        type: "Physical",
        hp: 20,
        atk: 5,
        exp:0,
        level: 1,
        createdAt: new Date(),
    });
    return wokamon;
}

export const fetchUserMonsters = async (uid: string) => {
    const firestore = getFirestore(getApp());
    const monsterSnapshots = await getDocs(collection(firestore, "users", uid, "vitamonsters"));

    const monsterArray: Monster[] = [];

    monsterSnapshots.forEach(
     (doc) => {
        const data = doc.data();
        const monster: Monster = {
            id: doc.id,
            name: data.name,
            type: data.type,
            hp: data.hp,
            atk: data.atk,
            exp: data.exp,
            level: data.level,
            createdAt: data.createdAt,
        };

        monsterArray.push(monster);
     }   
    );

    return monsterArray;
}

export const updateMonsterEXP = async (uid: string, monsterid: string, newEXP: number, newLVL: number) => {
    const firestore = getFirestore(getApp());
    await updateDoc(doc(firestore, "users", uid, "vitamonsters", monsterid),
    {
        exp: newEXP,
        level: newLVL,
    });
}