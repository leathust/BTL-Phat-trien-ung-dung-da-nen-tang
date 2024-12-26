import React, { useState, useContext } from "react";
import { View, TextInput, StyleSheet, Alert, Button } from 'react-native';

import { ShopContext } from "../Context/ShopContext";

const AddGroupForm = ({ navigation }) => {
    const { addGroup } = useContext(ShopContext);

    const [ groupName, setGroupName ] = useState('');

    const handleSubmit = () => {
        if (!groupName.trim()) {
            Alert.alert('Bạn cần nhập lại tên của nhóm');
        }
        else {
            const newGroup = {groupId: Math.random().toString(), name: groupName, bossId: '0000', userIDs: ['0000'], taskIDs: []};
            addGroup(newGroup);
            setGroupName('');
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Nhập tên của nhóm" 
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

  export default AddGroupForm;