import React from "react";
import { View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleSheet } from "react-native";


const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>
                Hello SettingsScreen
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SettingsScreen;