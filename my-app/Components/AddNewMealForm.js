import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MealContext } from '../Context/MealContext';

const AddNewMealForm = ({ navigation, route }) => {
    const {avaiMealTypes} = route.params;
    const [selectedMealType, setSelectedMealType] = useState('Chọn loại bữa ăn');
    const [numberOfPeople, setNumberOfPeople] = useState('');

    const { addMeal } = useContext(MealContext);

    const handleSubmit = () => {
        if (numberOfPeople && selectedMealType) {
            const newMeal = {id: Math.random().toString(), type: selectedMealType, date: new Date().toISOString(), numOfPeople: parseInt(numberOfPeople), dishesIds: []};
            addMeal(newMeal);
            setNumberOfPeople('');
            navigation.goBack();
        }
        else {  
            alert('Xin vui lòng nhập đủ thông tin cần thiết!');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select Meal Type:</Text>
            <Picker
                selectedValue={selectedMealType}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedMealType(itemValue)}
            >
                {avaiMealTypes.map((mealType, index) => (
                    <Picker.Item key={index} label={mealType} value={mealType} />
                ))}
            </Picker>

            <Text style={styles.label}>Number of People:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={numberOfPeople}
                onChangeText={setNumberOfPeople}
            />

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default AddNewMealForm;