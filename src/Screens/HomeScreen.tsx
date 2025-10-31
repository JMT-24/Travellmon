import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, Image, ImageSourcePropType, Modal } from 'react-native';
import styles from '../Styles/HomeScreenStyles';

//Components
import ExpBar from '../Components/ExpBar';
import BurgerMenu from '../Components/BurgerMenu';

const monsterPic: ImageSourcePropType = require('../Assets/Img/placeholderMonster.jpg');

interface Props {
    monsterExp: number;
    monsterLvl: number;
    setMonsterLvl: React.Dispatch<React.SetStateAction<number>>;
    maxExp: number;
};

const HomeScreen: React.FC<Props> = ({ monsterExp, monsterLvl, setMonsterLvl, maxExp}) => {

    return (
        <View style={styles.body}>
            <BurgerMenu />
            <View style={styles.container}>

                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>Woka-mon</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={monsterPic} style={styles.monsterPic} />
                    <Text style={styles.placeholderWarningText}>PLACEHOLDER AI GENERATED IMAGE</Text>
                </View>

                <ExpBar monsterExp={monsterExp} monsterLvl={monsterLvl} maxExp={maxExp} />
                
            </View>  
        </View>
    );
};

export default HomeScreen;