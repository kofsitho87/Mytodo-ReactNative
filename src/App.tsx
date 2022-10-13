import React from 'react';
import {StatusBar} from 'react-native';
import {AuthContextProvider} from './provider/Auth.provider';
import NavitationStack from './screen/Navigation';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="default"
        hidden={true}
        networkActivityIndicatorVisible={true}
        translucent={true}
      />
      <AuthContextProvider>
        <NavitationStack />
      </AuthContextProvider>
    </>
  );
};

export default App;
