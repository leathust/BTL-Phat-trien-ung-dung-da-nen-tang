import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FoodScreen = () => {
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

export default FoodScreen;