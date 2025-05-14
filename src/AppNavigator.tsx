import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import MapsScreen from './Screens/MapsScreen';

const homeIcon: ImageSourcePropType = require('./Assets/Icons/homeIcon.png');
const settingsIcon: ImageSourcePropType = require('./Assets/Icons/settingsIcon.png');
const globeIcon: ImageSourcePropType = require('./Assets/Icons/globeIcon.png');

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
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
        />

        <Tab.Screen
          name="Maps"
          component={MapsScreen}
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
        />

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
