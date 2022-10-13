import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useAuth} from '../provider/Auth.provider';
import AppStack from './app/Index';
import AuthStack from './auth/Index';

const NavitationStack = () => {
  const {isLoggedIn, isLoading} = useAuth();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NavitationStack;
