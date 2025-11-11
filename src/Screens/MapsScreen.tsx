import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Platform, PermissionsAndroid, TouchableOpacity } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import { Coordinate } from "../AppNavigator";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialIcons";

MapboxGL.setAccessToken(
  "pk.eyJ1IjoiaHlya2FuIiwiYSI6ImNtaDFvb285MjJjY3Myd3MydTFlangyMWQifQ.ism9_zzBTgz3NG3TISs0bg"
);

interface Props {
  setCurrentSpeed: (speed: number) => void;
  speed: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  seconds: number;
  setDistance: (distance: number) => void;
  distance: number;
  routeCoordinates: Coonpxrdinate[];
  setRouteCoordinates: React.Dispatch<React.SetStateAction<Coordinate[]>>;
  isRecording: boolean;
}

const MapsScreen: React.FC<Props> = ({
  setCurrentSpeed,
  setSeconds,
  setDistance,
  speed,
  seconds,
  distance,
  setRouteCoordinates,
  routeCoordinates,
  isRecording,
}) => {
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(13);
  const [followUser, setFollowUser] = useState(true);
  const cameraRef = useRef<MapboxGL.Camera>(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
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

  // Move camera to user location
  const flyToUserLocation = async () => {
    try {
      const location = await MapboxGL.locationManager.getLastKnownLocation();
      if (location && cameraRef.current) {
        // const coords = [location.coords.longitude, location.coords.latitude];
        // cameraRef.current.flyTo(coords, 1000);
        setFollowUser(true);
      }
    } catch (err) {
      console.warn("Error fetching user location", err);
    }
  };

  // Auto move to user when map loads first
  const onMapLoaded = async () => {
    setShowUserLocation(true);
    await flyToUserLocation();
  };

  // Stop following if user pans the map manually
  const onRegionWillChange = () => {
    if (followUser) setFollowUser(false);
  };

  const zoomIn = () => {
    const newZoom = zoomLevel + 1;
    setZoomLevel(newZoom);
    cameraRef.current?.setCamera({
      zoomLevel: newZoom,
      animationDuration: 500,
    });
  };

  const zoomOut = () => {
    const newZoom = zoomLevel - 1;
    setZoomLevel(newZoom);
    cameraRef.current?.setCamera({
      zoomLevel: newZoom,
      animationDuration: 500,
    });
  };

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
          zoomEnabled
          styleURL="mapbox://styles/mapbox/streets-v12"
          rotateEnabled
          scaleBarEnabled={false}
          onDidFinishLoadingMap={onMapLoaded}
          onRegionWillChange={onRegionWillChange}
        >
          <MapboxGL.Camera
            ref={cameraRef}
            followUserLocation={followUser}
            followZoomLevel={zoomLevel}
            animationMode="flyTo"
            animationDuration={1000}
          />

          <MapboxGL.UserLocation visible={showUserLocation} />

          {routeCoordinates.length > 1 && (
            <MapboxGL.ShapeSource
              id="routeSource"
              shape={{
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: routeCoordinates.map((coord) => [
                    coord.longitude,
                    coord.latitude,
                  ]),
                },
                properties: {},
              }}
            >
              <MapboxGL.LineLayer
                id="routeLine"
                style={{
                  lineColor: "#FF0000",
                  lineWidth: 3,
                  lineJoin: "round",
                  lineCap: "round",
                }}
              />
            </MapboxGL.ShapeSource>
          )}
        </MapboxGL.MapView>

        {/* Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={flyToUserLocation}>
            <Icon name="my-location" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={zoomIn}>
            <Icon name="zoom-in" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={zoomOut}>
            <Icon name="zoom-out" style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* Meter Display */}
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
  buttons: {
    position: "absolute",
    bottom: 30,
    right: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10,
    borderRadius: 10,
  },
  button: {
    width: 42,
    height: 42,
    backgroundColor: "rgba(31, 28, 27, 0.9)",
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    fontSize: 22,
    color: "#FFA733",
  },
});

export default MapsScreen;
