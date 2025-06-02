import React, {useState} from 'react';
import { Image, ImageSourcePropType} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import GoScreen from './Screens/GoScreen';

//Components
import MapsScreen from './Screens/MapsScreen';
import BurgerMenu from './Components/BurgerMenu';

//Icon Images
const homeIcon: ImageSourcePropType = require('./Assets/Icons/homeIcon.png');
const settingsIcon: ImageSourcePropType = require('./Assets/Icons/settingsIcon.png');
const globeIcon: ImageSourcePropType = require('./Assets/Icons/globeIcon.png');
const goIcon: ImageSourcePropType = require('./Assets/Icons/goIcon.png')

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
  const [monsterExp, setMonsterExp] = useState(0);
  const [monsterLvl, setMonsterLvl] = useState(0);

  return (
    <Tab.Navigator>

        <Tab.Screen
          name="Home"
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerRight: () => <BurgerMenu />,
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
              monsterExp={monsterExp}
              monsterLvl={monsterLvl}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Maps"
          options={{
            headerShown: true,
            headerTitleAlign: "center",
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
          name="Go"
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerRight: () => <BurgerMenu />,
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={goIcon} 
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
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            headerTitleAlign: "center",
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
  );
};

export default AppNavigator;
