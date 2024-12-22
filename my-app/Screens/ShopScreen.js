import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import { TaskProvider } from '../Context/TaskContext';

import ShopListScreen from './Shop_ShopList';
import FamilyScreen from './Shop_Family';

const Drawer = createDrawerNavigator();


const ShopScreen = ({navigation}) => {
  return (
    <TaskProvider>
        <Drawer.Navigator initialRouteName="Danh sách mua sắm">
          <Drawer.Screen name="Danh sách mua sắm" component={ShopListScreen}/>
          <Drawer.Screen name="Nhóm gia đình" component={FamilyScreen} />
        </Drawer.Navigator>
        </TaskProvider>
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