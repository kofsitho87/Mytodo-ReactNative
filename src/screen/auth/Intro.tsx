import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const Intro = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Text>intro page</Text>
      <Button
        onPress={() => navigation.navigate('Login')}
        title="Login"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Intro;
