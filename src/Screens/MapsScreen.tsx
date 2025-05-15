import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Platform, PermissionsAndroid, Button } from "react-native";
import MapView, { Region, Marker, Polyline } from "react-native-maps";
import Geolocation, {GeolocationError, GeolocationOptions, GeolocationResponse} from "@react-native-community/geolocation";


type Coordinate = { latitude: number; longitude: number };

const MapsScreen = () => {
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
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const onRegionChange = (newRegion: Region) => {
    // setRegion(newRegion);
    // console.log("Region changes:", newRegion);
  };

  const [showUserLocation, setShowUserLocation] = useState(false);

  const onMapReady = () => {
    setShowUserLocation(true);
  }

  const [isRecording, setIsRecording] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
  const watchId = useRef<number | null>(null);

  const startRecording = () => {
    setIsRecording(true);

    const options: GeolocationOptions = {
      enableHighAccuracy: true,
      distanceFilter: 5,
      timeout: 10000,
      maximumAge: 1000,
    };

    watchId.current = Geolocation.watchPosition(
      (position: GeolocationResponse) => {
        const { latitude, longitude } = position.coords;
        setRouteCoordinates(prev => [
          ...prev,
          { latitude, longitude },
        ]);
      },
      (error: GeolocationError) => {
        console.error('Geolocation error:', error.message);
      },
      options
    );
  };


  const stopRecording = () => {
    setIsRecording(false);
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  const resetRoute = () => {
    stopRecording();
    setRouteCoordinates([]);
  };

    return (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
        onMapReady={onMapReady}
        showsUserLocation={true}
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

      <View style={styles.controls}>
        <Button title="Record" onPress={startRecording} disabled={isRecording} />
        <Button title="End" onPress={stopRecording} disabled={!isRecording} />
        <Button title="Reset" onPress={resetRoute} />
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
   controls: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    borderRadius: 10,
  },
});

export default MapsScreen;
