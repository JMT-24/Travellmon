import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../Styles/HomeScreenStyles';


type Location = {
    latitude: number;
    longitude: number;
  };

const HomeScreen = () => {

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <Text style={styles.appText}>Hello HomeScreens</Text>
            </View>  
        </View>
    );
};

export default HomeScreen;