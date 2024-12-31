import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodListScreen from './FoodListScreen';
import FoodDetailsScreen from './FoodDetailsScreen';

const ListStack = createNativeStackNavigator();

const FoodList1 = () => {
  return (
    <ListStack.Navigator initialRouteName="FoodList">
      <ListStack.Screen 
        name="FoodList" 
        component={FoodListScreen} 
        options={{ title: 'Danh Sách Thực Phẩm' , headerShown: false }} 
      />
      <ListStack.Screen 
        name="FoodDetails" 
        component={FoodDetailsScreen} 
        options={{ title: 'Chi Tiết Thực Phẩm' }} 
      />
    </ListStack.Navigator>
  );
};

export default FoodList1;


