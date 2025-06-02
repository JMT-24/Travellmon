import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, Image, ImageSourcePropType, Modal } from 'react-native';
import Geolocation, {GeolocationError, GeolocationOptions, GeolocationResponse} from "@react-native-community/geolocation";
import { getPathLength, getDistance } from "geolib";
import styles from '../Styles/HomeScreenStyles';
import { Coordinate } from '../AppNavigator';

//Components
import ExpBar from '../Components/ExpBar';
import MeasureCard from '../Components/MeasureCard';
import ExpBar2 from '../Components/ExpBar2';

const monsterPic: ImageSourcePropType = require('../Assets/Img/placeholderMonster.jpg');


interface Props {
    monsterExp: number;
    monsterLvl: number;
};

const HomeScreen: React.FC<Props> = ({ monsterExp, monsterLvl}) => {
    const steps = 5;
    const [exp, setExp] = useState(0);
    const maxExp = 100;
    return (
        <View style={styles.body}>
            <View style={styles.container}>

                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>Woka-mon</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={monsterPic} style={styles.monsterPic} />
                    <Text style={styles.placeholderWarningText}>PLACEHOLDER AI GENERATED IMAGE</Text>
                </View>

                <ExpBar monsterExp={exp} monsterLvl={monsterLvl} maxExp={maxExp} />
                <ExpBar2 currentExp={exp} maxExp={maxExp} />
                <Button title="Gain EXP" onPress={() => setExp(prev => Math.min(prev + steps, maxExp))} />
                <Button title="Reset EXP" onPress={() => setExp(0)} />
                
            </View>  
        </View>
    );
};

export default HomeScreen;