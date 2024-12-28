
import React, { createContext, useState } from "react";

const MealContext = createContext();

const MealProvider = ({ children }) => {        
    
    const mealTypes = [{id: '00', name: 'Bữa sáng'}, {id: '01', name: 'Bữa trưa'}, 
                        {id: '10', name: 'Bữa tối'}, {id: '11', name: 'Bữa phụ'}];    
    const units = [{id: '0', name: 'đĩa'}, {id: '1', name: 'cái'}, {id: '2', name: 'bát'}, {id: '3', name: 'cốc'}];
    const dishtypes = [{id: '00', name: 'Thịt - Đạm'}, {id: '01', name: 'Tinh bột'}, {id: '10', name: 'Sữa'}];

    const [meals, setMeals] = useState([{ id: '1', type: 'Bữa sáng', date: '2024-12-28', numOfPeople: 1, dishesIds: ['00'] },
                                        { id: '2', type: 'Bữa sáng', date: '2024-12-27', numOfPeople: 1, dishesIds: ['01'] },
                                        { id: '3', type: 'Bữa tối', date: '2024-12-28', numOfPeople: 2, dishesIds: [] },
                                        { id: '4', type: 'Bữa phụ', date: '2024-12-26', numOfPeople: 4, dishesIds: ['10', '11'] }
                                    ]);
    
    const [dishes, setDishes] = useState([{ id: '00', name: 'Bún chả', type: 'Thịt - Đạm', count: 1, unit: 'đĩa', ingredients: 'none' },
                                        { id: '01', name: 'Bánh mì', type: 'Thịt - Đạm', count: 1, unit: 'cái', ingredients: 'none' },
                                        { id: '10', name: 'Mì tôm', type: 'Tinh bột', count: 1, unit: 'bát', ingredients: 'none' },
                                        { id: '11', name: 'Sữa tươi', type: 'Sữa', count: 1, unit: 'cốc', ingredients: 'none' }
                                    ]);
    
    const addMeal = (meal) => {
        if (!meals.some(item => item.id === meal.id)) {
            setMeals([...meals, meal]);
        }
    };

    const addDish = (dish) => {
        if (!dishes.some(item => item.id === dish.id)) {
            setDishes([...dishes, dish]);
        }
    };

    const removeDish = (id) => {
        const newDishes = dishes.filter(item => item.id !== id);
        setDishes(newDishes);
    };

    const removeMeal = (id) => {
        const newMeals = meals.filter(item => item.id !== id);
        setMeals(newMeals);
    };
    const getMealsByDate = (date) => {
        return meals.filter(meal => meal.date === date);
    };

    return (
        <MealContext.Provider value={{ meals, addMeal, removeMeal, dishes, addDish, removeDish, mealTypes, units, dishtypes, getMealsByDate }}>
            {children}
        </MealContext.Provider>
    );
};

export { MealContext, MealProvider };