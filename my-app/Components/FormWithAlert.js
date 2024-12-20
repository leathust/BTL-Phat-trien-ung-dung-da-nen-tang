import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';

const FormWithAlert = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (name === '' || email === '') {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      Alert.alert('Success', 'Form submitted successfully');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your Name"
      />

      <Text style={styles.label}>Enter Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Your Email"
        keyboardType="email-address"
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
    backgroundColor: '#fff',
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
