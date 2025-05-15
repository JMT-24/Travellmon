import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleSheet, Button, Platform, PermissionsAndroid } from "react-native";
import MapView, {Region, Marker} from "react-native-maps";
import { request, PERMISSIONS, check, RESULTS } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";

const MapsScreen = () => {
    const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'unavailable' | 'blocked' | 'limited' | 'loading'>('loading');

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
                followsUserLocation={true}
                showsCompass={true}
                loadingEnabled={true}
                zoomControlEnabled={true}
                zoomEnabled={true}
                minZoomLevel={1}
                onMapReady={async () => {
                    try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    );

                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('Location permission granted');
                        setLocationPermission('granted');
                    } else {
                        console.log('Location permission denied');
                        setLocationPermission('denied');
                    }
                    } catch (error) {
                    console.warn('Permission request failed', error);
                    setLocationPermission('unavailable');
                    }
                }}
                />


            {/* Overlay the UI on top of the map */}
            <View style={styles.overlay}>
                <Text>Location Permission Status: {locationPermission}</Text>
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
        top: 11,
        left: 60,
        right: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 10,
        padding: 10,
        zIndex: 10,
        width: "65%",
    },
});

export default MapsScreen;