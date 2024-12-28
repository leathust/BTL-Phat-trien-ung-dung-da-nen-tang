// // MealContext.js
// import React, { createContext, useState } from 'react';

// const MealContext = createContext();

// export const MealProvider = ({ children }) => {
//   const [selectedDay, setSelectedDay] = useState(null);

//   // Dữ liệu thực đơn mẫu
//   const mealsData = {
//     Monday: { breakfast: 'Pancakes', lunch: 'Sandwich', dinner: 'Pizza' },
//     Tuesday: { breakfast: 'Oatmeal', lunch: 'Salad', dinner: 'Spaghetti' },
//     Wednesday: { breakfast: 'Eggs', lunch: 'Burger', dinner: 'Sushi' },
//     Thursday: { breakfast: 'Toast', lunch: 'Pizza', dinner: 'Steak' },
//     Friday: { breakfast: 'Cereal', lunch: 'Tacos', dinner: 'Pasta' },
//     Saturday: { breakfast: 'Smoothie', lunch: 'Wrap', dinner: 'BBQ' },
//     Sunday: { breakfast: 'Bagels', lunch: 'Soup', dinner: 'Roast Chicken' },
//   };

//   return (
//     <MealContext.Provider value={{ selectedDay, setSelectedDay, mealsData }}>
//       {children}
//     </MealContext.Provider>
//   );
// };

// export default MealContext;
