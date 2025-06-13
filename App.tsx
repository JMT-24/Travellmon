import React, {useEffect} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { getApp } from '@react-native-firebase/app';

//Screens
import AppNavigator from './src/AppNavigator';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';


const Stack = createNativeStackNavigator();
const App = () => {
  useEffect(() => {
    console.log('Firebase initialized:', getApp().name);
  }, []);

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   {/* <AppNavigator /> */}
    //   <LoginScreen />
    // </GestureHandlerRootView>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainApp"
          component={AppNavigator}
          options={{ headerShown: false }} // Hide header for the main app
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
