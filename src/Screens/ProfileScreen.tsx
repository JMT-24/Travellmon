import React from "react";
import {View, Text, ScrollView} from "react-native";
import {StyleSheet} from "react-native";
import { User } from "../Models/User";

interface Props {
    user: User | null;
}

const ProfileScreen: React.FC<Props> = ({user}) => {
    return (
        <View style={styles.body}>
            <View style={styles.background}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.section}>
                        <View style={styles.tempProfPic} />
                        <Text style={styles.usernameText}>{user?.username}</Text>
                    </View>
                    <View style={styles.section}>
                        
                    </View>
                </ScrollView>
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
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 20,
        // backgroundColor: "aqua",
    },
    section: {
        width: "90%",
        marginVertical: 15,
        padding: 10,
        // backgroundColor: "yellow",
        alignItems: "center",
        elevation: 2,
    },
    tempProfPic: {
        height: 120,
        width: 120,
        backgroundColor: "white",
        borderRadius: 90,
    },
    usernameText: {
        fontSize: 26,
        marginTop: 20,
        color: "#FFA733",
    },
});