import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';


import { ShopProvider } from '../Context/ShopContext';

import ShopListScreen from './Shop_ShopList';
import FamilyScreen from './Shop_Family';

const Drawer = createDrawerNavigator();


const ShopScreen = ({ navigation }) => {
  return (
    <ShopProvider>
      <Drawer.Navigator initialRouteName="Danh sách mua sắm">
        <Drawer.Screen name="Danh sách mua sắm" component={ShopListScreen} />
        <Drawer.Screen name="Nhóm gia đình" component={FamilyScreen} />
      </Drawer.Navigator>
    </ShopProvider>
  );
};


export default ShopScreen;