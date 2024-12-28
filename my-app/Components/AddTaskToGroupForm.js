import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { ShopContext } from '../Context/ShopContext';

const AddTaskToGroup = ({ navigation, route }) => {
    const { addTask, addList, addTaskToGroup, groups, tasks, lists } = useContext(ShopContext);

    const { groupId } = route.params;
    const group = groups.find(group => group.groupId === groupId);
    const userIDs = group.userIDs;
    const groupName = group.name;

    const [itemName, setItemName] = useState('');
    const [count, setCount] = useState(0);
    const [unit, setUnit] = useState(''); // Optional field, initialized with an empty string
    const [person, setPerson] = useState(''); // Optional field, initialized with an empty string
    const availableUnits = ['kg', 'gam', 'bó', 'mớ', 'khúc', 'củ', 'quả', 'con', 'chai', 'lit', 'cái', 'chiếc', 'c', 'd', 'e', 'f']; // List of allowed units

    const handleSubmit = () => {
        if (itemName === '' || count === '' || unit === '' || person === '') {
            Alert.alert('Error', 'Please fill in all fields');
        } else {
            // Alert.alert('Success', 'Form submitted successfully');
            itemName.trim();
            const list = { listId: groupId, name: groupName, userId: person, familyList: true };
            addList(list);

            const task = { id: Math.random().toString(), listId: groupId, userId: person, text: itemName, count: count, unit: unit, completed: false };
            addTask(task);

            addTaskToGroup(groupId, task.id);

            setPerson('');
            setItemName('');
            setCount('');

            console.log(tasks);
            console.log(lists);
            navigation.goBack();
            // setNewTask(itemName);
            // handleAddTask();
            // navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={itemName}
                onChangeText={setItemName}
                placeholder="Tên thực phẩm"
            />

            <TextInput
                style={styles.input}
                value={count}
                onChangeText={setCount}
                placeholder="Lượng"
                keyboardType="numeric"
            />

            <Picker
                selectedValue={unit}
                onValueChange={(itemValue) => setUnit(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Đơn vị" value="" />
                {availableUnits.map((unitOption, index) => (
                    <Picker.Item key={index} label={unitOption} value={unitOption} />
                ))}
            </Picker>

            <Picker
                selectedValue={person}
                onValueChange={(personStr) => setPerson(personStr)}
                style={styles.picker}
            >
                <Picker.Item label="Giao cho thành viên" value="" />
                {userIDs.map((personOption, index) => (
                    <Picker.Item key={index} label={personOption} value={personOption} />
                ))}
            </Picker>

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'rgba(200, 0, 0, 0.5)',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        paddingLeft: 10,
    },
    picker: {
        width: '90%',
        height: 55,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,

    }
});

export default AddTaskToGroup;
