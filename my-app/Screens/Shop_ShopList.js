import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TodoTask from '../Components/TodoTask';
import FormWithAlert from '../Components/FormWithAlert';
import AllList from '../Components/AllList';
import AddListForm from '../Components/AddNewListForm';

const ListStack = createNativeStackNavigator();

import { TaskProvider } from '../Context/TaskContext';

const ShopListScreen = ({ navigation }) => {
    return (
        <TaskProvider>
            <ListStack.Navigator initialRouteName='AllList'>
                <ListStack.Screen name='AllList' component={AllList} options={{ headerShown: false }} />
                <ListStack.Screen name='TodoTask' component={TodoTask} />
                <ListStack.Screen name='AddItemForm' component={FormWithAlert} options={{ headerTitle: "Thêm đồ" }} />
                <ListStack.Screen name='AddListForm' component={AddListForm} options={{ headerTitle: "Thêm danh sách mới" }} />
            </ListStack.Navigator>
        </TaskProvider>
    );
};

export default ShopListScreen;