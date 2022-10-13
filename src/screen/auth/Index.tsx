import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Intro from './Intro';
import Login from './Login';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Intro"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
