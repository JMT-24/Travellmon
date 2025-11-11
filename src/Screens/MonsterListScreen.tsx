import React from "react";
import { useState, useCallback } from "react";
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

    const handleBackPress = () => {
        navigation.replace("MainApp");
    }
    return (
        <View>
            <View style={styles.body}>
                <TouchableOpacity style={styles.btnBack} onPress={handleBackPress}>
                    <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Hello Monster List</Text>
            </View>
        </View>
    );
};

export default MonsterListScreen;

const styles = StyleSheet.create({
    body: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f1c1b",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopWidth: 16,
        borderBottomWidth: 10,
        borderColor: "#FFA733",
        height: "100%",
    },
    text: {
        color: "white",
        fontSize: 20,
    },
    btnBack: {
        backgroundColor: "brown",
        height: 100,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "white",
        fontSize: 20,
    },
});