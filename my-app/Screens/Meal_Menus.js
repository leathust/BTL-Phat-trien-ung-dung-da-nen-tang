import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WeeklyMenus from '../Components/WeeklyMenus';
import MealDetail from '../Components/MealDetail';

const MenuStack = createNativeStackNavigator();

const Menus = () => {
    return (
            <MenuStack.Navigator initialRouteName="WeeklyMenus">
                <MenuStack.Screen name="WeeklyMenus" component={WeeklyMenus} options={{headerShown: false}} />
                <MenuStack.Screen name="MealDetail" component={MealDetail} />
            </MenuStack.Navigator>
    );
};

export default Menus;