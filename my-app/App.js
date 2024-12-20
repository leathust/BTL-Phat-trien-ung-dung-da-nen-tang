import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerBackVisible: false,
            //headerLeft: () => {return null;}
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
