import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
//import ProfileScreen from './screens/ProfileScreen';
//import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Welcome" component={WelcomeScreen} />
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  {/* <Stack.Screen name="Profile" component={ProfileScreen} />
  <Stack.Screen name="Chat" component={ChatScreen} /> */}
</Stack.Navigator>

    </NavigationContainer>
  );
}
