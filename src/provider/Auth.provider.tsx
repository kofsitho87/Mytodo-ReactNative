import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiClient} from '../utils/axios';

interface IUser {
  id: number;
  email: string;
  createdAt: Date;
}

type AuthState = {
  userToken?: string;
  user?: IUser;
};

interface IAuthContextProvider {
  auth: AuthState;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextProvider>({
  auth: {
    userToken: undefined,
    user: undefined,
  },
  isLoggedIn: false,
  isLoading: false,
  login() {},
  logout() {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState<string>();
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    const loginData = await ApiClient.post('/auth/login', {
      email: 's1@s.com',
      password: '123456',
    })
      .then(result => result.data.data)
      .catch(e => {
        console.log(e);
        return null;
      });
    console.log('loginData', loginData);
    if (!loginData) {
      return;
    }

    ApiClient.defaults.headers.common.Authorization = loginData.accessToken;

    const meData = await ApiClient.get('/auth/me').then(
      result => result.data.data,
    );
    console.log('meData', meData);

    const token = loginData.accessToken;
    const user = {
      id: meData.id,
      email: meData.email,
      createdAt: meData.createdAt,
    };
    await AsyncStorage.setItem('auth.token', token);
    await AsyncStorage.setItem('auth.user', JSON.stringify(user));
    setUserToken(token);
    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('auth.token');
    await AsyncStorage.removeItem('auth.user');
    setUserToken(undefined);
    setUser(undefined);
    setIsLoggedIn(false);
  };

  const checkLoggedIn = async () => {
    console.log('checkLoggedIn');
    setIsLoading(true);

    const token = await AsyncStorage.getItem('auth.token');
    console.log('token', token);

    if (token) {
      ApiClient.defaults.headers.common.Authorization = token;
      const meData = await ApiClient.get('http://localhost:3000/api/auth/me')
        .then(result => result.data?.data)
        .catch(e => {
          console.log('checkLoggedIn error: ', e);
          return null;
        });
      console.log('meData', meData);

      if (meData) {
        setUserToken(token);
        setUser(meData);
        setIsLoggedIn(true);
      } else {
        setUserToken(undefined);
        setUser(undefined);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const auth = {
    userToken,
    user,
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, auth, isLoading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
