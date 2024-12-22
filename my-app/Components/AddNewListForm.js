import React, { useState, useContext } from "react";
import { View, TextInput, StyleSheet, Alert, Button } from 'react-native';

import { TaskContext } from "../Context/TaskContext";

const AddListForm = ({ navigation }) => {
    const { addList } = useContext(TaskContext);

    const [ listName, setListName ] = useState('');

    const handleSubmit = () => {
        if (!listName.trim()) {
            Alert.alert('Bạn cần nhập lại tên của danh sách');
        }
        else {
            const newList = {listId: Math.random().toString(), name: listName, familyList: false};
            addList(newList);
            setListName('');
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            value={listName}
            onChangeText={setListName}
            placeholder="Nhập tên của danh sách" 
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

  export default AddListForm;