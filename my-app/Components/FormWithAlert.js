import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';

const FormWithAlert = ({navigation}) => {
  const [itemName, setItemName] = useState('');
  const [count, setCount] = useState('');
  const [newItem, setNewItem] = useState({});

  const handleSubmit = () => {
    if (itemName === '' || count === '') {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      // Alert.alert('Success', 'Form submitted successfully');
      setNewItem({
        name: itemName,
        count: count
      });
      navigation.params(newItem);
      navigation.goBack();
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

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(50, 0, 0, 0.5)',
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
});

export default FormWithAlert;
