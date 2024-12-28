// import React, { useContext } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';

// import MealNavigator2 from './MealNavigator2';
// import MealNavigator from './MealNavigator';
// import { MealProvider } from '../Context/MealContext'; // Nhập MealProvider


// const Stack = createStackNavigator();

// const MealScreen = ({ navigation }) => {
//   return (
//     <MealProvider>
//       <Stack.Navigator initialRouteName="Danh sách món ăn">
//         <Stack.Screen name="Danh sách món ăn" component={MealScreen} />
//         <Stack.Screen name="MealNalvigator2" component={MealNavigator2} />
//       </Stack.Navigator>
//     </MealProvider>
//   );
// };

// export default MealScreen;
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
