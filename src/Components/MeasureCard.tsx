import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, Image, ImageSourcePropType, Modal } from 'react-native';
import { StyleSheet } from 'react-native';

interface Props {
    title: string,
    value: string | number,
    addon: string,
};

const MeasureCard: React.FC<Props> = ({title, value, addon}) => {
    return (
        <View style={styles.meterContainer}>
            <View style={styles.meterTop}>
                <Text>{title}</Text>
            </View>
            <View style={styles.meterBot}> 
                <Text>{value} {addon}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    meterContainer: {
        // backgroundColor: "lightblue",
        height: "95%",
        width: "30%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 20,
    },
    meterTop: {
        backgroundColor:"lightgray",
        width: "100%",
        height: "40%",
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    meterBot: {
        // backgroundColor: "yellow",
        width: "100%",
        height: "60%",
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

});

export default MeasureCard