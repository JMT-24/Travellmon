import React, {useEffect, useState} from 'react';
import { Image, ImageSourcePropType} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth } from '@react-native-firebase/auth';

// Screens
import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import GoScreen from './Screens/GoScreen';
import ProfileScreen from './Screens/ProfileScreen';

//Components
import MapsScreen from './Screens/MapsScreen';
import BurgerMenu from './Components/BurgerMenu';
import CustomTabBar from './Components/CustomTabBar';

//Icon Images
const homeIcon: ImageSourcePropType = require('./Assets/Icons/homeIcon.png');
const settingsIcon: ImageSourcePropType = require('./Assets/Icons/settingsIcon.png');
const globeIcon: ImageSourcePropType = require('./Assets/Icons/globeIcon.png');
const goIcon: ImageSourcePropType = require('./Assets/Icons/goIcon.png')
const profileIcon: ImageSourcePropType = require('./Assets/Icons/profileIcon.png');

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
  const [monsterExp, setMonsterExp] = useState<number>(0);
  const [monsterLvl, setMonsterLvl] = useState<number>(0);

  
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>

        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={homeIcon} 
                style={{
                  width: size,
                  height: size,
                  resizeMode: 'contain',
                  tintColor: focused ? color : "#FFA733", 
                }}
              />
            ),
          }}
        >
          {() => (
            <HomeScreen
              monsterExp={monsterExp}
              monsterLvl={monsterLvl}
              setMonsterLvl={setMonsterLvl}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Maps"
          options={{
            headerShown: false,
            headerTitleAlign: "center",
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={globeIcon}
                style={{
                  width: size,
                  height: size,
                  resizeMode: 'contain',
                  tintColor: focused ? color : "#FFA733",
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
          name="Go"
          options={{
            headerShown: false,
            headerTitleAlign: "center",
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={goIcon} 
                style={{
                  width: size,
                  height: size,
                  resizeMode: 'contain',
                  tintColor: focused ? color : "#FFA733", 
                }}
              />
            ),
          }}
        >
          {() => (
            <GoScreen
              setCurrentSpeed={setCurrentSpeed}
              setSeconds={setSeconds}
              setDistance={setDistance}
              speed={currentSpeed}
              seconds={seconds}
              distance={distance}
              setRouteCoordinates={setRouteCoordinates}
              routeCoordinates={routeCoordinates}
              monsterExp={monsterExp}
              setMonsterExp={setMonsterExp}
              setMonsterLvl={setMonsterLvl}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            headerTitleAlign: "center",
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={profileIcon} 
                style={{
                  width: size,
                  height: size,
                  resizeMode: 'contain',
                  tintColor: focused ? color : "#FFA733", 
                }}
              />
            ),
          }}
        />

      </Tab.Navigator>
  );
};

export default AppNavigator;
