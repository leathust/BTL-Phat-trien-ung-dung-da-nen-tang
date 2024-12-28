import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MealScreen = () => {
    return (
        <View style={styles.screenContainer}>
      <Text>Buy List Screen</Text>
    </View>
    );
}; 

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
});

export default MealScreen;