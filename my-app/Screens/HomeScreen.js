import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import FoodScreen from './FoodScreen';
import MealScreen from './MealScreen';
import ShopScreen from './ShopScreen';

const Tab = createMaterialTopTabNavigator();

let username = 'Nhóm 18';

function UserStatusBar() {
  return (
    <View style={styles.headerContainer}>
      <Icon name="person-circle" size={40} color="green" />
      <View style={styles.userInfo}>
        <Text style={styles.userName}> Đi chợ cùng {username}! </Text>
      </View>
    </View>
  );
}

const HomeScreen = ({navigation}) => {
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
