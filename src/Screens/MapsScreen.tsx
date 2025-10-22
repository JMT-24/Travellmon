import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform, PermissionsAndroid } from "react-native";
import MapboxGL from '@rnmapbox/maps';
import { Coordinate } from "../AppNavigator";

MapboxGL.setAccessToken('pk.eyJ1IjoiaHlya2FuIiwiYSI6ImNtaDFvb285MjJjY3Myd3MydTFlangyMWQifQ.ism9_zzBTgz3NG3TISs0bg');

interface Props {
  setCurrentSpeed: (speed: number) => void;
  speed: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  seconds: number;
  setDistance: (distance: number) => void;
  distance: number;
  routeCoordinates: Coordinate[];
  setRouteCoordinates: React.Dispatch<React.SetStateAction<Coordinate[]>>;
}

const MapsScreen: React.FC<Props> = ({
  setCurrentSpeed, setSeconds, setDistance, speed, seconds, distance,
  setRouteCoordinates, routeCoordinates
}) => {
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [region, setRegion] = useState({ latitude: 13.9411, longitude: 121.1624 });

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) setShowUserLocation(true);
    } else {
      setShowUserLocation(true);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL="mapbox://styles/mapbox/streets-v12"
          onDidFinishLoadingMap={() => setShowUserLocation(true)}
        >
          <MapboxGL.Camera
            zoomLevel={15}
            followUserLocation={true}
            followUserMode="normal"
          />

          <MapboxGL.UserLocation visible={showUserLocation} />

          {routeCoordinates.length > 0 && (
            <MapboxGL.ShapeSource
              id="routeLine"
              shape={{
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: routeCoordinates.map(coord => [coord.longitude, coord.latitude]),
                },
              }}
            >
              <MapboxGL.LineLayer id="routeLineLayer" style={{ lineColor: "#00BFFF", lineWidth: 7 }} />
            </MapboxGL.ShapeSource>
          )}
        </MapboxGL.MapView>

        <View style={styles.meter}>
          <Text style={styles.meterText}>{formatTime(seconds)}</Text>
          <Text style={styles.meterText}>{distance.toFixed(2)} km</Text>
          <Text style={styles.meterText}>{speed.toFixed(2)} km/h</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#1f1c1b",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 16,
    borderColor: "#FFA733",
  },
  container: {
    height: "95%",
    width: "95%",
  },
  map: {
    flex: 1,
  },
  meter: {
    position: "absolute",
    top: 12,
    left: 70,
    right: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(31, 28, 27, 0.9)",
    padding: 10,
    borderRadius: 10,
  },
  meterText: {
    fontWeight: "bold",
    color: "#FFA733",
  },
});

export default MapsScreen;
