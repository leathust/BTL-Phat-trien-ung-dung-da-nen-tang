import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddGroupForm from '../Components/AddNewGroupForm';
import AllGroup from '../Components/AllGroup';

const ListStack = createNativeStackNavigator();

const FamilyScreen = ({ navigation }) => {
    return (
            <ListStack.Navigator initialRouteName='AllGroup'>
                <ListStack.Screen name='AllGroup' component={AllGroup} options={{ headerShown: false }} />
                <ListStack.Screen name='AddGroupForm' component={AddGroupForm} options={{ headerTitle: "Thêm nhóm mới" }} />
            </ListStack.Navigator>
    );
};

export default FamilyScreen;