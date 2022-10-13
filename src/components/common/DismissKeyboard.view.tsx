import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

const DismissKeyboardHOC = () => {
  return ({children}: any) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export const hideKeyboard = () => {
  Keyboard.dismiss();
};

export default DismissKeyboardHOC();
