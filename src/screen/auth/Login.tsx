import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DismissKeyboardView from '../../components/common/DismissKeyboard.view';
import {useAuth} from '../../provider/Auth.provider';

const Login = () => {
  const {login} = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboardView>
        <View style={styles.container2}>
          <Text>login page</Text>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="black"
              editable
              placeholder="email"
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="black"
              editable
              placeholder="password"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text>Press Here</Text>
          </TouchableOpacity>
          {/* <Button
            onPress={login}
            title="Login"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          /> */}
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  formContainer: {
    height: 100,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 10,
    borderWidth: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default Login;
