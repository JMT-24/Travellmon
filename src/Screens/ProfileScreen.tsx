import React, {useState, useRef} from "react";
import {View, Text, TouchableOpacity, Image, ImageSourcePropType, Modal} from "react-native";
import {StyleSheet} from "react-native";
import { getApp } from "@react-native-firebase/app";
import { getAuth, signInWithEmailAndPassword } from "@react-native-firebase/auth";

const ProfileScreen = () => {
    const auth = getAuth(getApp());
    const currentUser = auth.currentUser;


    return (
        <View style={styles.body}>
            <View style={styles.background}>
                <View style={styles.container}>
                    <Text style={{color: "#FFA733", fontSize: 24, marginBottom: 20}}>
                        Hello {currentUser?.email || "Guest"}!
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
   body: {
        height: "100%",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#1f1c1b",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopWidth: 16,
        borderColor: "#FFA733",
    },
    background: {
        flex: 1,
        width: "100%",
    },
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});