import React from "react";
import { useState, useCallback } from "react";
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageSourcePropType, Image} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { VitaMonster } from "../Models/VitaMonster";
import { User } from "../Models/User";
import { fetchCurrentUser } from "../Database/userService";
import { fetchUserMonsters } from "../Database/monsterService";

const monsterPic: ImageSourcePropType = require('../Assets/Img/placeholderMonster.jpg');

type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
  Settings: undefined;
  MonsterList: undefined;
};

interface Props {

}

const MonsterListScreen: React.FC<Props> = ({}) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [vitaMonsters, setVitaMonsters] = useState<VitaMonster[]>([]);


    const loadUserMonsters = async() => {
        const currentUser = await fetchCurrentUser();
        console.log("user loaded");
        if (currentUser)
        {
            console.log("loading monsters");
            const monsters = await fetchUserMonsters(currentUser.uid);
            setVitaMonsters(monsters);
            console.log("monsters set");
        }
    }

    useFocusEffect(
        useCallback(
            () => {
                console.log("MonsterList Focused");
                const fetchData = async() => {
                    await loadUserMonsters();
                };

                fetchData();

                return () => {
                    console.log("MonsterList unfocused");
                };
            }, []
        )
    );

    const handleBackPress = () => {
        navigation.replace("MainApp");
    }
    return (
        <View>
            <View style={styles.body}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.btnBack} onPress={handleBackPress}>
                        <Text style={styles.btnText}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnPath}>
                        <Text style={styles.pathText}>{'Path\nof\nMotion'}</Text>
                    </TouchableOpacity>

                    <View style={styles.filler}>
                    </View>
                </View>
                
                <ScrollView style={styles.scrollContainer}>
                    {vitaMonsters.map(monster => (
                            <View style={styles.monsterContainer}>
                                <View style={styles.detailContainerL}>
                                    <Image source={monsterPic} style={styles.monsterPic}/>
                                </View>

                                <View style={styles.detailContainerM}>
                                    <Text style={styles.monsterNameText}>{monster.name}</Text>
                                    <View style={styles.monsterStats}>
                                        <Text style={styles.text}>Atk: {monster.atk}</Text>
                                        <Text style={styles.text}>HP: {monster.hp}</Text>
                                    </View>
                                </View>

                                <View style={styles.detailContainerR}>
                                    <Text style={styles.lvlText}>LVL: {monster.level}</Text>
                                </View>
                            </View>
                        ))
                    }

                    <View style={styles.monsterContainer}>
                    </View>
                    <View style={styles.monsterContainer}>
                    </View>
                    <View style={styles.monsterContainer}>
                    </View>
                    <View style={styles.monsterContainer}>
                    </View>
                    <View style={styles.monsterContainer}>
                    </View>
                    <View style={styles.monsterContainer}>
                    </View>
                    <View style={styles.monsterContainer}>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default MonsterListScreen;

const styles = StyleSheet.create({
    body: {
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1f1c1b",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopWidth: 16,
        borderBottomWidth: 10,
        borderColor: "#FFA733",
        height: "100%",
    },
    container: {
        // backgroundColor: "yellow",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    scrollContainer: {
        // backgroundColor: "aqua",
        width: "100%",
        marginTop: 3,
    },
    monsterContainer: {
        backgroundColor: "gray",
        width: "100%",
        height: 100,
        marginVertical: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    detailContainerL: {
        // backgroundColor: "aqua",
        alignItems: "center",
        justifyContent: "center",
        width: "25%",
    },
    detailContainerM: {
        // backgroundColor: "aqua",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "50%",
    },
    monsterNameText: {
        color: "white",
        fontSize: 27,
        fontWeight: "bold",
        fontStyle: "italic",
        textAlign: "center",
        width: "100%",
    },
    monsterStats: {
        // backgroundColor: "pink",
        width: "100%",
        height: "50%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    detailContainerR: {
        // backgroundColor: "aqua",
        alignItems: "center",
        justifyContent: "center",
        width: "15%",
        marginRight: 10,
    },
    monsterPic: {
        backgroundColor:"white",
        height: 85,
        width: 85,
        borderRadius: 10,
    },
    lvlText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    text: {
        color: "white",
        fontSize: 20,
    },
    btnBack: {
        backgroundColor: "brown",
        height: 60,
        width: 80,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "white",
        fontSize: 20,
    },
    btnPath: {
        backgroundColor: "white",
        height: 60,
        width: 120,
        justifyContent: "center",
        alignItems: "center",
    },
    pathText: {
        color: "black",
        fontSize: 15,
        textAlign: "center",
    },
    filler: {
        height: 60,
        width: 80,
    },
});