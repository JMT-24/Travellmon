import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/AppNavigator';
import LoginScreen from './src/Screens/LoginScreen';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <AppNavigator /> */}
      <LoginScreen />
    </GestureHandlerRootView>
  );
};

export default App;
