import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { StyleSheet } from 'react-native';

interface Props {
    dataLabel: String,
    dataValue: String
};

const UserDataBox: React.FC<Props> =({dataLabel, dataValue}) => {
    return (
        <View style={styles.userDataBox}>
            <Text style={styles.userDataLabel}>
                {dataLabel}
            </Text>
            <Text style={styles.userDataValue}>
                {dataValue}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    userDataBox: {
        backgroundColor: "#FFA733",
        height: 100,
        width: "100%",
        marginVertical: 5,
        borderRadius: 5,
        paddingLeft: 15,
        justifyContent: "center",
    },
    userDataLabel: {
        fontSize: 25,
        color: "black",
        fontWeight: "bold",
        fontStyle: "italic",
    },
    userDataValue: {
        fontSize: 30,
        color: "#5A3200",
        fontWeight: "bold",
    },
});

export default UserDataBox;