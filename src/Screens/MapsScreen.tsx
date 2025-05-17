import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Platform, PermissionsAndroid, Button } from "react-native";
import MapView, { Region, Marker, Polyline } from "react-native-maps";
import Geolocation, {GeolocationError, GeolocationOptions, GeolocationResponse} from "@react-native-community/geolocation";
import { getPathLength, getDistance } from "geolib";


type Coordinate = { latitude: number; longitude: number; timestamp: number; };

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
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);

  const startRecording = () => {
    setIsRecording(true);
    startTimer();

    const options: GeolocationOptions = {
      enableHighAccuracy: true,
      distanceFilter: 5,
      timeout: 10000,
      maximumAge: 1000,
    };

    watchId.current = Geolocation.watchPosition(
      (position: GeolocationResponse) => {
        const { latitude, longitude } = position.coords;
        const timestamp = position.timestamp;

        setRouteCoordinates(prev => {
          if (prev.length === 0) {
            return [{ latitude, longitude, timestamp }];
          }

          const last = prev[prev.length - 1];
          const distance = getDistance(
            { latitude: last.latitude, longitude: last.longitude },
            { latitude, longitude }
          ); // in meters

          const timeSeconds = (timestamp - last.timestamp) / 1000; // ms → s
          const speedKms = (distance / 1000) / timeSeconds;
          const speedKmh = speedKms * 3600;

          console.log(`Speed: ${speedKms.toFixed(4)} km/s`);
          console.log(`Speed: ${speedKmh.toFixed(2)} km/h`);
          setCurrentSpeed(speedKmh);
          return [...prev, { latitude, longitude, timestamp }];
        });
      },
      (error: GeolocationError) => {
        console.error('Geolocation error:', error.message);
      },
      options
    );
  };


  const stopRecording = () => {
    setIsRecording(false);
    stopTimer();
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  const resetRoute = () => {
    stopRecording();
    setRouteCoordinates([]);
    resetTimer();
  };

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const internalRev = useRef<NodeJS.Timeout | null>(null);
  
  const startTimer = () => {
    if (!running) {
      setRunning(true);
      internalRev.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (internalRev.current) {
      clearInterval(internalRev.current);
      internalRev.current = null;
    }
    setRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  const formatTime = (totalSeconds : number) => {
    const mins = Math.floor(totalSeconds/60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  const distanceInKm = getPathLength(routeCoordinates) / 1000;

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
        <Text style={styles.meterText}>{distanceInKm.toFixed(2)} km</Text>
        <Text style={styles.meterText}>{currentSpeed.toFixed(2)} km/h</Text>
      </View>

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
  meter: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    borderRadius: 10,
  },
  meterText: {

  },
});

export default MapsScreen;
