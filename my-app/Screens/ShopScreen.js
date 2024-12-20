import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ShopListScreen from './Shop_ShopList';
import FamilyScreen from './Shop_Family';
import StatisticScreen from './Shop_Statistic';

const Drawer = createDrawerNavigator();


const ShopScreen = () => {
  return (
        <Drawer.Navigator initialRouteName="Danh sách mua sắm">
          <Drawer.Screen name="Danh sách mua sắm" component={ShopListScreen}/>
          <Drawer.Screen name="Nhóm gia đình" component={FamilyScreen} />
          <Drawer.Screen name="Thống kê chi tiêu" component={StatisticScreen} />
        </Drawer.Navigator>
  );
};


export default ShopScreen;


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    marginLeft: 10,
  },
});