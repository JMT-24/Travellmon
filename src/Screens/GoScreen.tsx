import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, Image, ImageSourcePropType, Modal } from 'react-native';
import Geolocation, {GeolocationError, GeolocationOptions, GeolocationResponse} from "@react-native-community/geolocation";
import { getPathLength, getDistance } from "geolib";
import styles from '../Styles/GoScreenStyles';
import { Coordinate } from '../AppNavigator';

import MeasureCard from '../Components/MeasureCard';


interface Props {
    setCurrentSpeed: (speed: number) => void;
    speed: number;
    setSeconds: React.Dispatch<React.SetStateAction<number>>;
    seconds: number;
    setDistance: (distance: number) => void;
    distance: number;
    routeCoordinates: Coordinate[];
    setRouteCoordinates: React.Dispatch<React.SetStateAction<Coordinate[]>>;
    monsterExp: number;
    setMonsterExp: React.Dispatch<React.SetStateAction<number>>;
    setMonsterLvl: (lvl: number) => void;
};

const GoScreen: React.FC<Props> = ({ setCurrentSpeed, speed, setSeconds, seconds, setDistance, distance,
    routeCoordinates, setRouteCoordinates, monsterExp, setMonsterExp, setMonsterLvl
}) => {
    const [isRecording, setIsRecording] = useState(false);
    const watchId = useRef<number | null>(null);
    const speedResetTimeout = useRef<NodeJS.Timeout | null>(null);

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
            );

            const timeSeconds = (timestamp - last.timestamp) / 1000;
            const speedKms = (distance / 1000) / timeSeconds;
            const speedKmh = speedKms * 3600;

            // console.log(`Speed: ${speedKms.toFixed(4)} km/s`);
            // console.log(`Speed: ${speedKmh.toFixed(2)} km/h`);
            setCurrentSpeed(speedKmh);

            // Clear previous speed reset timer
            if (speedResetTimeout.current) {
                clearTimeout(speedResetTimeout.current);
            }

            // Set speed to 0 if no updates within 5 seconds
            speedResetTimeout.current = setTimeout(() => {
                setCurrentSpeed(0);
            }, 5000);

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

        // Clear speed reset timer when stopping
        if (speedResetTimeout.current) {
        clearTimeout(speedResetTimeout.current);
        speedResetTimeout.current = null;
        }

        // Also reset speed to 0 when stopping
        setCurrentSpeed(0);
    };

    const [running, setRunning] = useState(false);
    const internalRev = useRef<NodeJS.Timeout | null>(null);
    
    const startTimer = () => {
        console.log('startTimer called');
        if (!running) {
        console.log(running);
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

    const prevDistance = useRef(0); // meters
    const leftoverDistance = useRef(0); // meters

    const resetRoute = () => {
        stopRecording();
        setRouteCoordinates([]);
        resetTimer();
        setMonsterExp(0);
    };

    const pause = () => {
        stopRecording();
    }

    useEffect(() => {
        const distanceInMeters = getPathLength(routeCoordinates);
        setDistance(distanceInMeters / 1000); // display in km

        // Calculate change in distance since last update
        const rawDelta = distanceInMeters - prevDistance.current;
        const totalDelta = rawDelta + leftoverDistance.current;

        const expGained = Math.floor(totalDelta / 100); // 1 EXP per 100m
        leftoverDistance.current = totalDelta % 100; // carry over leftover meters

        if (expGained > 0) {
        setMonsterExp((prev: number) => prev + expGained);
        }
        setMonsterLvl(Math.floor(monsterExp / 10))

        prevDistance.current = distanceInMeters;
    }, [routeCoordinates]);

    return (
        <View style={styles.body}>
            

            <View style={styles.monsterDisplayContainer}>
                <View style={styles.topView}>
                    <Text style={styles.timerText}>{formatTime(seconds)}</Text>
                </View>

                <View style={styles.midView}>

                </View>

                <View style={styles.botView}>
                    <Text style={styles.speedText}>{speed.toFixed(2)} km/h</Text>
                    <Text style={styles.distanceText}>{distance.toFixed(2)} km</Text>
                </View>


            </View>

            
            <View style={styles.controls}>
                <TouchableOpacity
                    style={[
                        styles.startButton,
                        isRecording && styles.disabledButton
                    ]}
                    onPress={startRecording}
                    disabled={isRecording}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.endButton,
                        !isRecording && styles.disabledButton
                    ]}
                    onPress={stopRecording}
                    disabled={!isRecording}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>End</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={resetRoute}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default GoScreen