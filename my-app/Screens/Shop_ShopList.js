import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TodoTask from '../Components/TodoTask';
import FormWithAlert from '../Components/FormWithAlert';
import AllList from '../Components/AllList';
import AddListForm from '../Components/AddNewListForm';

const ListStack = createNativeStackNavigator();

const ShopListScreen = ({ navigation }) => {
    return (
            <ListStack.Navigator initialRouteName='AllList'>
                <ListStack.Screen name='AllList' component={AllList} options={{ headerShown: false }} />
                <ListStack.Screen name='TodoTask' component={TodoTask} />
                <ListStack.Screen name='AddItemForm' component={FormWithAlert} options={{ headerTitle: "Thêm đồ" }} />
                <ListStack.Screen name='AddListForm' component={AddListForm} options={{ headerTitle: "Thêm danh sách mới" }} />
            </ListStack.Navigator>
    );
};

export default ShopListScreen;