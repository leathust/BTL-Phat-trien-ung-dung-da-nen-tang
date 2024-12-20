import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TodoTask from '../Components/TodoTask';
import { HeaderShownContext, HeaderTitle } from '@react-navigation/elements';
const ListStack = createNativeStackNavigator();

const AllList = ({navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('TodoTask')}>
            <Text> Ngày 1-12-2024 </Text>
        </TouchableOpacity>
    );
}

const ShopListScreen = () => {
  return (
    <NavigationIndependentTree>
    <NavigationContainer>
        <ListStack.Navigator initialRouteName='AllList'>
            <ListStack.Screen name='AllList' component={AllList} options={{headerShown: false}}/>
            <ListStack.Screen name='TodoTask' component={() => (<TodoTask />)} options={{headerTitle: "Ngày 1-12-2024"}} />
        </ListStack.Navigator>
    </NavigationContainer>
    </NavigationIndependentTree>
  );
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default ShopListScreen;