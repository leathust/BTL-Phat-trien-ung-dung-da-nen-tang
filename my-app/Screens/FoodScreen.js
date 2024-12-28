import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';


import { ShopProvider } from '../Context/ShopContext';

import FoodListScreen from './FoodList';
import FoodFindScreen from './FoodFindScreen';
import FoodReportScreen from './FooodReportScreen';

const Drawer = createDrawerNavigator();


const FoodScreen = ({ navigation }) => {
  return (
    <ShopProvider>
      <Drawer.Navigator initialRouteName="Quản lý thực phẩm">
        <Drawer.Screen name="Quản lý thực phẩm" component={FoodListScreen} />
        {/* <Drawer.Screen name="Tìm kiếm" component={FoodFindScreen} />
        <Drawer.Screen name="Thống kê" component={FoodReportScreen} /> */}
      </Drawer.Navigator>
    </ShopProvider>
  );
};


export default FoodScreen;