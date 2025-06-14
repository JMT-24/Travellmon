import React from "react";
import { View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleSheet } from "react-native";


const SettingsScreen = () => {
    return (
        <View style={styles.body}>
            <View style={styles.background}>
                <View style={styles.container}>
                    <Text>
                        Hello SettingsScreen
                    </Text>
                </View>
            </View>
        </View>
    );
};

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
        backgroundColor: "#1f1c1b",
    },
    container: {
        flex: 1,
        width: "100%",
    },
});

export default SettingsScreen;