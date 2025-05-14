import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleSheet, Button, Platform } from "react-native";
import MapView, {Region, Marker} from "react-native-maps";
import { request, PERMISSIONS, check, RESULTS } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";

const MapsScreen = () => {
    const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'unavailable' | 'blocked' | 'limited' | 'loading'>('loading');

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
        try {
            const fine = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

            if (fine === RESULTS.GRANTED) {
            setLocationPermission('granted');
            } else if (fine === RESULTS.DENIED) {
            setLocationPermission('denied');
            } else if (fine === RESULTS.BLOCKED) {
            setLocationPermission('blocked');
            } else {
            setLocationPermission('unavailable');
            }
        } catch (error) {
            console.warn('Permission error:', error);
            setLocationPermission('unavailable');
        }
        }
    };

    useEffect(() => {
        // requestLocationPermission();
    }, []);


    const [region, setRegion] = useState<Region>({
        latitude: 13.9411,
        longitude: 121.1624,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    const onRegionChange = (newRegion: Region) => {
        setRegion(newRegion);
    };

    const showRegion = () => {
        console.log(region);
    };  

    return (
         <View style={styles.container}>
            <MapView
                provider="google"
                style={styles.map}
                initialRegion={region}
                onRegionChangeComplete={onRegionChange}
                showsUserLocation={true}
                showsMyLocationButton={true}    
                followsUserLocation= {true}
                loadingEnabled
                zoomControlEnabled={true}
                showsCompass={true}
                minZoomLevel={1}
                zoomEnabled={true}
            />

            {/* Overlay the UI on top of the map */}
            <View style={styles.overlay}>
                <Text>Location Permission Status: {locationPermission}</Text>
                {locationPermission !== 'granted' && (
                <Button title="Request Again" onPress={requestLocationPermission} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject, // fills the screen
    },
    overlay: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 10,
        padding: 10,
        zIndex: 10,
        width: "70%"
    },
});

export default MapsScreen;