import React from 'react';
import {Button} from 'react-native';
import {useAuth} from '../../provider/Auth.provider';

interface ILogoutButton {
  title: string;
}

export default ({title}: ILogoutButton) => {
  const {logout} = useAuth();

  return <Button onPress={logout} title={title} color="#841584" />;
};
