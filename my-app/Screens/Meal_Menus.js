import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WeeklyMenus from '../Components/WeeklyMenus';

const MenuStack = createNativeStackNavigator();

const Menus = () => {
    return (
            <MenuStack.Navigator initialRouteName="WeeklyMenus">
                <MenuStack.Screen name="WeeklyMenus" component={WeeklyMenus} />
            </MenuStack.Navigator>
    );
};

export default Menus;