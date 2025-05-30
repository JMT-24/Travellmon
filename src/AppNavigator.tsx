import React, {useState} from 'react';
import { Image, ImageSourcePropType} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import MapsScreen from './Screens/MapsScreen';

const homeIcon: ImageSourcePropType = require('./Assets/Icons/homeIcon.png');
const settingsIcon: ImageSourcePropType = require('./Assets/Icons/settingsIcon.png');
const globeIcon: ImageSourcePropType = require('./Assets/Icons/globeIcon.png');

const Tab = createBottomTabNavigator();

export type Coordinate = { 
    latitude: number; 
    longitude: number; 
    timestamp: number; 
};

const AppNavigator = () => {
const [currentSpeed, setCurrentSpeed] = useState<number>(0);
const [seconds, setSeconds] = useState(0);
const [distance, setDistance] = useState(0);
const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);

  return (
    <NavigationContainer>
      <Tab.Navigator>

        <Tab.Screen
          name="Home"
          options={{
            headerShown: true,
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={homeIcon} 
                style={{
                  width: size,
                  height: size,
                  resizeMode: 'contain',
                  tintColor: focused ? color : 'gray', 
                }}
              />
            ),
          }}
        >
          {() => (
            <HomeScreen
              setCurrentSpeed={setCurrentSpeed}
              setSeconds={setSeconds}
              setDistance={setDistance}
              speed={currentSpeed}
              seconds={seconds}
              distance={distance}
              setRouteCoordinates={setRouteCoordinates}
              routeCoordinates={routeCoordinates}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Maps"
          options={{
            headerShown: true,
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={globeIcon}
                style={{
                  width: size,
                  height: size,
                  resizeMode: 'contain',
                  tintColor: focused ? color : 'gray',
                }}
              />
            ),
          }}
        >
          {() => (
            <MapsScreen
              setCurrentSpeed={setCurrentSpeed}
              setSeconds={setSeconds}
              setDistance={setDistance}
              speed={currentSpeed}
              seconds={seconds}
              distance={distance}
              setRouteCoordinates={setRouteCoordinates}
              routeCoordinates={routeCoordinates}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={settingsIcon} 
                style={{
                  width: size,
                  height: size,
                  resizeMode: 'contain',
                  tintColor: focused ? color : 'gray', 
                }}
              />
            ),
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
