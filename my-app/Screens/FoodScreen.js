import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import FoodListScreen from './FoodList';

const Drawer = createDrawerNavigator();


const FoodScreen = ({ navigation }) => {
  return (
      <Drawer.Navigator initialRouteName="Quản lý thực phẩm">
        <Drawer.Screen name="Quản lý thực phẩm" component={FoodListScreen} />
        {/* <Drawer.Screen name="Tìm kiếm" component={FoodFindScreen} />
        <Drawer.Screen name="Thống kê" component={FoodReportScreen} /> */}
      </Drawer.Navigator>
  );
};


export default FoodScreen;