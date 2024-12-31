import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Cookbook from './Meal_Cookbook';
import Menus from './Meal_Menus';
import Recommend from './Meal_Recommend';
import { MealProvider } from '../Context/MealContext';

const Drawer1 = createDrawerNavigator();

const MealScreen = () => {
  return (
    <MealProvider>
      <Drawer1.Navigator initialRouteName='Thực đơn theo tuần'>
        <Drawer1.Screen name='Thực đơn theo tuần' component={Menus} />
        <Drawer1.Screen name='Sách công thức của tôi' component={Cookbook} />
        <Drawer1.Screen name='Gợi ý món từ tủ lạnh' component={Recommend}/>
      </Drawer1.Navigator>
      </MealProvider>
  );
};

export default MealScreen;