import React, { useState, useContext } from "react";
import { View, TextInput, StyleSheet, Alert, Button } from 'react-native';

import { ShopContext } from "../Context/ShopContext";

const AddMemberForm = ({ navigation, route }) => {
    const { addUserToGroup } = useContext(ShopContext);
    const { groupId } = route.params;
    const [ newUserId, setNewUserId ] = useState('');

    const handleSubmit = () => {
        if (!newUserId.trim()) {
            Alert.alert('Có vẻ không tồn tại người dùng.\nBạn cần nhập lại số điện thoại');
        }
        else {
            addUserToGroup(groupId, newUserId);
            setNewUserId('');
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            value={newUserId}
            onChangeText={setNewUserId}
            placeholder="Nhập số điện thoại người dùng" 
            keyboardType='phone-pad'
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

  export default AddMemberForm;