import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import SettingScreen from './Screens/SettingScreen';

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
            options={({ navigation }) => ({
              title: 'Đi chợ tiện lợi',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Settingss")
                }>
                  <Icon name="person-circle" size={40} color="green" />
                </TouchableOpacity>
              ),
              headerStyle: { backgroundColor: 'lightskyblue' },
              //headerShown: false,
              headerBackVisible: false,
              //headerLeft: () => {return null;}
            })}
          />
          <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;