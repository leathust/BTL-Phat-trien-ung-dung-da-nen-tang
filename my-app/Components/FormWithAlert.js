import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { TaskContext } from '../Context/TaskContext';

const FormWithAlert = ({ navigation, route }) => {
  const { addTask } = useContext(TaskContext);
  const { listId } = route.params;

  const [itemName, setItemName] = useState('');
  const [count, setCount] = useState(0);
  const [unit, setUnit] = useState(''); // Optional field, initialized with an empty string
  const availableUnits = ['kg', 'gam', 'bó', 'củ', 'quả', 'con', 'chai', 'lit', 'a', 'b', 'c', 'd', 'e', 'f']; // List of allowed units

  const handleSubmit = () => {
    if (itemName === '' || count === '' || unit === '') {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      // Alert.alert('Success', 'Form submitted successfully');
      itemName.trim();
      const task = { id: Math.random().toString(), listId: listId, text: itemName, count: count, unit: unit, completed: false };
      addTask(task);
      setItemName('');
      setCount('');
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

export default FormWithAlert;
