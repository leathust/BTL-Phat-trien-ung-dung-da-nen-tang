// import React, { useContext } from 'react';
// import { View, Text } from 'react-native';
// import { MealContext } from './Context/MealContext'; // Nhập MealContext

// const MenuDetailScreen = ({ route }) => {
//   // Lấy mealId và mealType từ route.params
//   const { mealId, mealType } = route.params;

//   // Lấy dữ liệu món ăn từ context
//   const { meals } = useContext(MealContext);

//   // Tìm món ăn theo mealId và mealType
//   const mealCategory = Object.values(meals).find((category) =>
//     category.some((meal) => meal.id === mealId)
//   );

//   const meal = mealCategory?.find((meal) => meal.id === mealId);

//   return (
//     <View style={{ padding: 20 }}>
//       {meal ? (
//         <>
//           <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{meal.name}</Text>
//           <Text style={{ marginTop: 10 }}>{meal.description}</Text>
//           <Text style={{ marginTop: 10 }}>Bữa ăn: {mealType}</Text>
//         </>
//       ) : (
//         <Text>Món ăn không tồn tại.</Text>
//       )}
//     </View>
//   );
// };

// export default MenuDetailScreen;
