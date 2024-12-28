import React from 'react';
import { View, Text, Button, StyleSheet, Image, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FoodScreen from './FoodScreen';
import MealScreen from './MealScreen';
import ShopScreen from './ShopScreen';

const Tab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

let username = 'Nhóm 18';

const HomeScreen = ({ navigation }) => {
  if (Platform.OS === 'ios') {
    return (
      <BottomTab.Navigator
        initialRouteName="Mua sắm"
        tabBarOptions={{
          labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
          style: {
            backgroundColor: '#6200ea',
          },
          indicatorStyle: {
            backgroundColor: '#ffffff',
          },
        }}
      >
        <BottomTab.Screen name="Thực đơn" component={MealScreen} />
        <BottomTab.Screen name="Mua sắm" component={ShopScreen} />
        <BottomTab.Screen name="Thực phẩm" component={FoodScreen} />

      </BottomTab.Navigator>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Mua sắm"
      tabBarOptions={{
        labelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        style: {
          backgroundColor: '#6200ea',
        },
        indicatorStyle: {
          backgroundColor: '#ffffff',
        },
      }}
    >
      <Tab.Screen name="Thực đơn" component={MealScreen} />
      <Tab.Screen name="Mua sắm" component={ShopScreen} />
      <Tab.Screen name="Thực phẩm" component={FoodScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightskyblue', // Status bar background color
    marginTop: 27,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default HomeScreen;
