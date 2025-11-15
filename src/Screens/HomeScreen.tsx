import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Button, Image, ImageSourcePropType, Modal, StyleSheet } from 'react-native';
import styles from '../Styles/HomeScreenStyles';

import { User } from "../Models/User";
import { VitaMonster } from '../Models/VitaMonster';
import { updateMonsterEXP } from '../Database/monsterService';
import { uploadLogs } from '../Database/lifePathService';

//Components
import ExpBar from '../Components/ExpBar';
import BurgerMenu from '../Components/BurgerMenu';

const monsterPic: ImageSourcePropType = require('../Assets/Img/placeholderMonster.jpg');

interface Props {
    offlineExp: number;
    maxExp: number;
    setMonsterExp: React.Dispatch<React.SetStateAction<number>>
    user: User | null;
    monsters: VitaMonster[];
    reloadMonsters: () => Promise<void>;
};

const HomeScreen: React.FC<Props> = ({ offlineExp, setMonsterExp , maxExp, user, monsters, reloadMonsters}) => {

    const [currentMonster, setCurrentMonster] = useState<VitaMonster>();

    const loadWokamon = () => {
        if (monsters && monsters.length > 0) {
        setCurrentMonster(monsters[0]);
        }
    };

    useFocusEffect(
        useCallback(() => {
            console.log("Home screen is focused");
            loadWokamon();

            return () => {
                console.log("Home screen is Unfocused");
            };
        }, [monsters])
    );

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
        
        var monsterName = currentMonster.name;
        var monsterEXP = currentMonster.exp;
        var monsterLVL = currentMonster.level;

        const updatedEXP = monsterEXP + offlineExp;
        let newLevel = monsterLVL;
        let newExp = updatedEXP;

        if (updatedEXP >= maxExp) {
            newLevel += Math.floor(updatedEXP / maxExp);
            newExp = updatedEXP % maxExp;
        }

        if (!monsterName)
        {
            console.error("Cannot find current monster");
            return;
        }

        await updateMonsterEXP(user.uid, monsterName, newExp, newLevel);
        setMonsterExp(0);
        await reloadMonsters();
        await loadWokamon();
        await uploadLogs();
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