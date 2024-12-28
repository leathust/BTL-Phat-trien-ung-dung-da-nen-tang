import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';


import { ShopProvider } from './Context/ShopContext';

import ShopListScreen from './Screens/Shop_ShopList';
import FamilyScreen from './Screens/Shop_Family';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();


const Dav = ({ navigation }) => {
  return (
    <NavigationContainer>
    <ShopProvider>
      <Drawer.Navigator initialRouteName="Danh sách mua sắm">
        <Drawer.Screen name="Danh sách mua sắm" component={ShopListScreen} />
        <Drawer.Screen name="Nhóm gia đình" component={FamilyScreen} />
      </Drawer.Navigator>
    </ShopProvider>
    </NavigationContainer>
  );
};


export default Dav;