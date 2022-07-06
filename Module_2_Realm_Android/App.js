import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// REALM
import { RealmProvider } from './app/models/Project';

// SCREENS
import Welcome from './app/Welcome';
import Login from './app/Login';
import Add from './app/Add';
import Edit from './app/Edit';
import Profile from './app/Profile';
import Home from './app/Home';

const Stack = createNativeStackNavigator();

/*
 *  Author:   Ovezmyrat Arnazarov
 *  Class Description:  App component that wrap the whole application in a single naviation container
 *
 */
function AppWrapper() {
  if (!RealmProvider) {
    return null;
  }
  return (
    <RealmProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Add"
            component={Add}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Edit"
            component={Edit}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RealmProvider>
  );
}

export default AppWrapper;
