import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../Styles/HomeScreenStyles';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service'


type Location = {
    latitude: number;
    longitude: number;
  };

const HomeScreen = () => {
    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            return false;
          }
        }
        return true;
      };

      const [location, setLocation] = useState<Location | null>(null);

      const getLocation = async () => {
        console.log("Getting Loc");
        const hasPermission = await requestLocationPermission();
        console.log("Permission Granted");
        if (!hasPermission) return;
    
        Geolocation.getCurrentPosition(
          (position: any) => {
            setLocation(position.coords);
          },
          (error: any) => {
            console.error(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        console.log("Should have loc");
      };
    

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <Text style={styles.appText}>Hello HomeScreens</Text>
                <TouchableOpacity onPress={getLocation} style={{ padding: 10, backgroundColor: '#eee' }}>
                    <Text>
                        {location
                        ? `Lat: ${location.latitude}, Long: ${location.longitude}`
                        : 'Get My Location'}
                    </Text>
                </TouchableOpacity>
            </View>  
        </View>
    );
};

export default HomeScreen;