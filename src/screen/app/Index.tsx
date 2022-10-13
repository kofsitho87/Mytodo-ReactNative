import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {TodoContextProvider} from '../../provider/Todo.provider';
import CreateTodo from './CreateTodo';
import Home from './Home';
import LogoutButton from '../../components/common/Logout.button';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <TodoContextProvider>
      <Stack.Navigator
        initialRouteName="Home"
        defaultScreenOptions={{
          headerShown: true,
          // headerRight: () => <LogoutButton title="logout" />,
          headerTransparent: true,
          // headerStyle: {
          //   backgroundColor: 'transparent',
          // },
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerRight: () => <LogoutButton title="logout" />}}
        />
        <Stack.Screen
          name="CreateTodo"
          component={CreateTodo}
          options={{
            // headerShown: false,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
      </Stack.Navigator>
    </TodoContextProvider>
  );
};

export default AppStack;
