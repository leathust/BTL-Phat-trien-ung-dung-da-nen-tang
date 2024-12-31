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
import { createDrawerNavigator } from '@react-navigation/drawer';

import Cookbook from './Meal_Cookbook';
import Menus from './Meal_Menus';
import Recommend from './Meal_Recommend';
import { MealProvider } from '../Context/MealContext';

const Drawer1 = createDrawerNavigator();

const MealScreen = () => {
  return (
    <MealProvider>
      <Drawer1.Navigator initialRouteName='Thực đơn theo tuần'>
        <Drawer1.Screen name='Thực đơn theo tuần' component={Menus} />
        <Drawer1.Screen name='Sách công thức của tôi' component={Cookbook} />
        <Drawer1.Screen name='Gợi ý món từ tủ lạnh' component={Recommend}/>
      </Drawer1.Navigator>
      </MealProvider>
  );
};

export default MealScreen;
