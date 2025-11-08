import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, Image, ImageSourcePropType, Modal, StyleSheet } from 'react-native';
import styles from '../Styles/HomeScreenStyles';

import { User } from "../Models/User";
import { Monster } from '../Models/VitaMonster';
import { updateMonsterEXP } from '../Database/monsterService';

//Components
import ExpBar from '../Components/ExpBar';
import BurgerMenu from '../Components/BurgerMenu';

const monsterPic: ImageSourcePropType = require('../Assets/Img/placeholderMonster.jpg');

interface Props {
    offlineExp: number;
    monsterLvl: number;
    maxExp: number;
    setMonsterExp: React.Dispatch<React.SetStateAction<number>>
    user: User | null;
    monsters: Monster[];
    reloadMonsters: () => Promise<void>;
};

const HomeScreen: React.FC<Props> = ({ offlineExp, monsterLvl, setMonsterExp , maxExp, user, monsters, reloadMonsters}) => {

    const [currentMonster, setCurrentMonster] = useState<Monster>();

    const loadWokamon = () => {
        if (monsters && monsters.length > 0) {
        setCurrentMonster(monsters[0]);
        }
    };

    useEffect(() => {
        loadWokamon();
    }, [monsters]);

    const claimOfflineEXP = async () => {
        if (!user)
        {
            console.error("No current user");
            return;
        }
        if (!currentMonster)
        {
            console.error("No current monster");
            return;
        }
        
        var monsterID = currentMonster.id;
        var monsterEXP = currentMonster.exp;
        var monsterLVL = currentMonster.level;

        const updatedEXP = monsterEXP + offlineExp;
        let newLevel = monsterLVL;
        let newExp = updatedEXP;

        if (updatedEXP >= maxExp) {
            newLevel += Math.floor(updatedEXP / maxExp);
            newExp = updatedEXP % maxExp;
        }

        if (!monsterID)
        {
            console.error("Cannot find current monster uid");
            return;
        }

        await updateMonsterEXP(user.uid, monsterID, newExp, newLevel);
        setMonsterExp(0);
        await reloadMonsters();
        await loadWokamon();
    }

    return (
        <View style={styles.body}>
            <BurgerMenu />
            <View style={styles.container}>

                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{currentMonster?.name ?? "No VitaMonster"}</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={monsterPic} style={styles.monsterPic} />
                    <Text style={styles.placeholderWarningText}>PLACEHOLDER AI GENERATED IMAGE</Text>
                </View>

                <ExpBar monsterExp={currentMonster?.exp ?? 0} monsterLvl={currentMonster?.level ?? 0} maxExp={maxExp} />
                
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>EXP Gained: {offlineExp}</Text>
                </View>

                <TouchableOpacity style={styles.btnStyle} onPress={claimOfflineEXP}>
                    <Text style={styles.buttonText}>Claim EXP</Text>
                </TouchableOpacity>

            </View>  
        </View>
    );
};

export default HomeScreen;