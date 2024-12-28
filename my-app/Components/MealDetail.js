import React, {useState, useContext, useLayoutEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MealDetail = ({navigation, route}) => {
    const { mealType, date } = route.params;
    useLayoutEffect(() => {
        navigation.setOptions({
          title: mealType + ' ' + restructDate(date), // Dynamically set the title here
        });
      }, [mealType, date]); // This will run when navigation or screenTitle changes

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Group Detail</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});

export default MealDetail;

const restructDate = (date) => {
    const parts = date.split('-');
    return (parts[2] + '/' + parts[1] + '/' + parts[0]);
};