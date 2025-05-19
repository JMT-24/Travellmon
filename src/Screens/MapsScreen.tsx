import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Platform, PermissionsAndroid, Button } from "react-native";
import MapView, { Region, Marker, Polyline } from "react-native-maps";
// import Geolocation, {GeolocationError, GeolocationOptions, GeolocationResponse} from "@react-native-community/geolocation";
// import { getPathLength, getDistance } from "geolib";

import {Coordinate} from '../AppNavigator';

interface Props {
  setCurrentSpeed: (speed: number) => void;
  speed: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  seconds: number;
  setDistance: (distance: number) => void;
  distance: number;
  routeCoordinates: Coordinate[];
  setRouteCoordinates: React.Dispatch<React.SetStateAction<Coordinate[]>>;
};

const MapsScreen: React.FC<Props> = ({setCurrentSpeed, setSeconds, setDistance, speed, seconds, distance,
  setRouteCoordinates, routeCoordinates
}) => {
  const [locationPermission, setLocationPermission] = useState<
    'granted' | 'denied' | 'unavailable' | 'blocked' | 'limited' | 'loading'
  >('loading');

  const [region, setRegion] = useState<Region>({
    latitude: 13.9411,
    longitude: 121.1624,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('Location permission granted');
          setLocationPermission('granted');
        } else {
          console.log('Location permission denied');
          setLocationPermission('denied');
        }
      } catch (error) {
        console.warn('Permission request failed', error);
        setLocationPermission('unavailable');
      }
    }
  };

  const onRegionChange = (newRegion: Region) => {
    // setRegion(newRegion);
    // console.log("Region changes:", newRegion);
  };

  const [showUserLocation, setShowUserLocation] = useState(false);

  const onMapReady = () => {
    setShowUserLocation(true);
  }

  useEffect(() => {
     const handlePermission = async () => {
      await requestLocationPermission(); // Await here if it's async
    };

    handlePermission();
  });

  const formatTime = (totalSeconds : number) => {
        const mins = Math.floor(totalSeconds/60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    return (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
        onMapReady={onMapReady}
        showsUserLocation={showUserLocation}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        loadingEnabled={true}
        zoomControlEnabled={true}
        zoomEnabled={true}
        minZoomLevel={1}
      >
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#00BFFF"
            strokeWidth={7}
          />
        )}
        
      </MapView>

      <View style={styles.meter}>
          <Text style={styles.meterText}>{formatTime(seconds)}</Text>
          <Text style={styles.meterText}>{distance.toFixed(2)} km</Text>
          <Text style={styles.meterText}>{speed.toFixed(2)} km/h</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
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
  permissionMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meter: {
        position: 'absolute',
        top: 12,
        left: 70,
        right: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(159, 159, 159, 0.9)',
        padding: 10,
        borderRadius: 10,
    },
    meterText: {
      fontWeight: "bold",
    },
});

export default MapsScreen;
