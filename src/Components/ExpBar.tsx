import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { StyleSheet } from 'react-native';

interface Props {
    monsterExp: number;
    monsterLvl: number;
    maxExp: number;
};

const ExpBar: React.FC<Props> = ({monsterExp, monsterLvl, maxExp}) => {
    const expPercent = monsterExp / maxExp;
    const animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: expPercent,
            duration: 500,
            useNativeDriver: false, // false because we animate width
        }).start();
    }, [expPercent]);

    const widthInterpolated = animatedWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.expContainer}>
            <Animated.View style={[styles.barFill, { width: widthInterpolated }]} />
            <Text style={styles.monsterLvl}>Lv. {monsterLvl}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    expContainer: {
        height: "6%",
        width: "90%",
        backgroundColor: "#804803",
        margin: 10,
        borderWidth: 2,
        borderColor: "#FFA733",
    },
    barFill: {
        height: '100%',
        backgroundColor: '#FFD700',
    },
    monsterLvl: {
        color: "#FFA733",
        fontSize: 20, 
        position: "absolute",
        top: 5,
        right: 15,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        // To simulate stroke better, you can repeat shadow in multiple directions
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
});

export default ExpBar