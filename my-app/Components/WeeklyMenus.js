import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MealContext } from '../Context/MealContext';

function getTodayWeekday() {
    const today = new Date();  // Get today's date
    const weekday = today.getDay();  // Get the weekday (0-6, where 0 is Sunday, 6 is Saturday)

    // Array of weekday names
    const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    return weekdays[weekday];  // Return the name of the current weekday
}

// const mealPlans = {
//     T2: { breakfast: 'Pancakes', lunch: 'Chicken Salad', dinner: 'Spaghetti' },
//     T3: { breakfast: 'Omelette', lunch: 'Grilled Cheese', dinner: 'Tacos' },
//     T4: { breakfast: 'Smoothie', lunch: 'Sushi', dinner: 'Pizza' },
//     T5: { breakfast: 'Toast & Eggs', lunch: 'Burger', dinner: 'Steak' },
//     T6: { breakfast: 'Yogurt & Fruit', lunch: 'Caesar Salad', dinner: 'Fish & Chips' },
//     T7: { breakfast: 'Bagel', lunch: 'BBQ Chicken', dinner: 'Pasta' },
//     CN: { breakfast: 'Cereal', lunch: 'Roast Beef', dinner: 'Roast Chicken' },
// };

const WeeklyMenus = () => {


    const [selectedDay, setSelectedDay] = useState(getTodayWeekday());  // Default to Today

    const { getMealsByDate, mealTypes, removeMeal } = useContext(MealContext);

    const mealPlans = {};
    for (let wd of ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']) {
        let oneday = {};
        const thisDateObj = thisWeek.find(item => item[wd]);
        if (thisDateObj) {
            const thisDate = thisDateObj[wd];
            const mealsOnThisDate = getMealsByDate(thisDate);
            for (let mt of mealTypes) {
                const meal = mealsOnThisDate.find(item => item.type === mt);
                if (meal) {
                    oneday[mt] = meal.dishesIds;
                } else {
                    oneday[mt] = [];
                }
            }
            mealPlans[wd] = oneday;
        }
    }

    //console.log(mealPlans);

    // Meal plan for the selected day
    const currentMealPlan = mealPlans[selectedDay];

    return (
        <View style={styles.container}>
            {/* Weekdays at the top */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekdaysContainer}>
                {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
                    <TouchableOpacity
                        key={day}
                        style={[styles.dayButton, selectedDay === day && styles.selectedDay]}
                        onPress={() => setSelectedDay(day)}
                    >
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.dayText, selectedDay === day && styles.selectedDayText]}>
                                {day}
                            </Text>
                            <Text style={[{ fontSize: 8, color: '#333' }, selectedDay === day && styles.selectedDayText]}>
                                {restructDate(thisWeek.find(item => item[day])?.[day])}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Meal Plan for the selected day */}
            <FlatList
                data={Object.keys(currentMealPlan)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                    if (currentMealPlan[item].length > 0) {
                        return (
                            <View style={styles.mealContainer}>
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'row'}}>
                                <View style={{ flex: 1 }}>
                                <Text style={styles.mealTitle}>{item}</Text>
                                </View>
                                <TouchableOpacity style={{marginRight: 20, flex: 1}}>
                                    <Icon name="trash" size={35} color="purple" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                            </View>
                        );
                    }
                    return null;
                }}
            />
        </View>
    );
};

export default WeeklyMenus;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f7f7f7',
    },
    weekdaysContainer: {
        marginBottom: 20,
        maxHeight: 50,
    },
    dayButton: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    selectedDay: {
        backgroundColor: '#4caf50', // Highlight color
    },
    dayText: {
        fontSize: 18,
        color: '#333',
    },
    selectedDayText: {
        color: '#fff',  // Text color when selected
    },
    mealContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'blue',
        borderWidth: 1,
    },
    mealTitle: {
        fontSize: 18,
        marginBottom: 5,
        marginTop: 5,
        color: '#333',
    },
});

function getCurrentWeekWithDates() {
    const today = new Date();  // Get today's date
    const currentDay = today.getDay();  // Get the day of the week (0-6, where 0 is Sunday, 6 is Saturday)

    // Array of weekday names
    const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    // Get the start of the week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);  // Adjust to the previous Sunday

    // Array to hold the weekdays and their corresponding dates
    const weekWithDates = [];

    // Calculate the date for each weekday in the week
    for (let i = 0; i < 7; i++) {
        const dayOfWeek = new Date(startOfWeek);
        dayOfWeek.setDate(startOfWeek.getDate() + i);

        // Format the date as YY-MM-DD 
        const year = dayOfWeek.getFullYear().toString();
        const day = dayOfWeek.getDate().toString().padStart(2, '0');  // Ensure 2 digits for day
        const month = (dayOfWeek.getMonth() + 1).toString().padStart(2, '0');  // Ensure 2 digits for month (month is 0-indexed)

        const formattedDate = `${year}-${month}-${day}`;

        let obj = {};
        obj[weekdays[i]] = formattedDate;
        weekWithDates.push(obj);
    }

    return weekWithDates;
}

function restructDate(dateStr) {
    const part = dateStr.split('-');
    return `${part[2]}-${part[1]}`;
}

const thisWeek = getCurrentWeekWithDates();
//console.log(thisWeek);