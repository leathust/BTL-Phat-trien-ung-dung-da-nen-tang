import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddGroupForm from '../Components/AddNewGroupForm';
import AllGroup from '../Components/AllGroup';
import GroupDetail from '../Components/GroupDetail';
import MemberList from '../Components/MemberList';
import AddMemberForm from '../Components/AddMemberForm';

const GroupStack = createNativeStackNavigator();

const FamilyScreen = ({ navigation }) => {
    return (
            <GroupStack.Navigator initialRouteName='AllGroup'>
                <GroupStack.Screen name='AllGroup' component={AllGroup} options={{ headerShown: false }} />
                <GroupStack.Screen name='AddGroupForm' component={AddGroupForm} options={{ headerTitle: "Thêm nhóm mới" }} />
                <GroupStack.Screen name='GroupDetail' component={GroupDetail} />
                <GroupStack.Screen name='MemberList' component={MemberList} options={{ headerTitle: "Thông tin thành viên"}} />
                <GroupStack.Screen name='AddMemberForm' component={AddMemberForm} options={{ headerTitle: "Thêm thành viên"}} />
            </GroupStack.Navigator>
    );
};

export default FamilyScreen;