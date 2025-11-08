import React, {useEffect, useState} from 'react';
import { Image, ImageSourcePropType} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

//Services
import { fetchCurrentUser } from './Database/userService';
import { fetchUserMonsters } from './Database/monsterService';

//Models
import { User } from './Models/User';
import { Monster } from './Models/VitaMonster';

// Screens
import HomeScreen from './Screens/HomeScreen';
import MapsScreen from './Screens/MapsScreen';
import SettingsScreen from './Screens/SettingsScreen';
import GoScreen from './Screens/GoScreen';
import ProfileScreen from './Screens/ProfileScreen';

//Components
import BurgerMenu from './Components/BurgerMenu';
import CustomTabBar from './Components/CustomTabBar';

//Icon Images
import { homeIcon, settingsIcon,globeIcon, goIcon, profileIcon } from './Assets/Icons';

const Tab = createBottomTabNavigator();

export type Coordinate = { 
    latitude: number; 
    longitude: number; 
    timestamp: number; 
};

  const AppNavigator = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [currentSpeed, setCurrentSpeed] = useState<number>(0);
    const [seconds, setSeconds] = useState(0);
    const [distance, setDistance] = useState(0);
    const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
    const [monsterExp, setMonsterExp] = useState<number>(0);
    const [monsterLvl, setMonsterLvl] = useState<number>(0);
    const [maxExp, setMaxExp] = useState<number>(10);

    const [user, setUser] = useState<User | null>(null);
    const [monsters, setMonsters] = useState<Monster[]>([]);

    useEffect(() => {
      const loadUser = async () => {
        const user = await fetchCurrentUser();
        if (user) {
          setUser(user);
          fetchUserMonsters(user.uid).then(
            (mons) => {
              setMonsters(mons);
            });
        } else {
          console.log('No user fetched');
        }
      };

      loadUser();
    }, []);

    const reloadMonsters = async () => {
      if (user) {
        const mons = await fetchUserMonsters(user.uid);
        setMonsters(mons);
      }
    };
      
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
              offlineExp={monsterExp}
              monsterLvl={monsterLvl}
              setMonsterExp={setMonsterExp}
              maxExp={maxExp}
              user={user}
              monsters={monsters}
              reloadMonsters={reloadMonsters}
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
              isRecording={isRecording}
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
              isRecording={isRecording}
              setIsRecording={setIsRecording}
              maxExp={maxExp}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Profile"
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
        >
          {() => (
            <ProfileScreen
              user={user}
            />
          )}
        </Tab.Screen>

      </Tab.Navigator>
  );
};

export default AppNavigator;
