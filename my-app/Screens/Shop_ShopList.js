import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TodoTask from '../Components/TodoTask';
import FormWithAlert from '../Components/FormWithAlert';
import AllList from '../Components/AllList';

const ListStack = createNativeStackNavigator();

import { TaskProvider } from '../Context/TaskContext';

const ShopListScreen = ({ navigation }) => {
    return (
        <TaskProvider>
            <ListStack.Navigator initialRouteName='AllList'>
                <ListStack.Screen name='AllList' component={AllList} options={{ headerShown: false }} />
                <ListStack.Screen name='TodoTask' component={TodoTask} options={{ headerTitle: "Ngày 1-12-2024" }} />
                <ListStack.Screen name='AddItemForm' component={FormWithAlert} options={{ headerShown: true }} />
            </ListStack.Navigator>
        </TaskProvider>
    );
};

export default ShopListScreen;