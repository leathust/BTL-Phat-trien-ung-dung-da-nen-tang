import React, { useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ShopContext } from '../Context/ShopContext';

const MemberList = ({ navigation, route }) => {

    const { groupId } = route.params;
    const { groups, removeMemberFromGroup } = useContext(ShopContext);
    const group = groups.find(group => group.groupId === groupId);
    const userIDs = group.userIDs;

    const trashButtonHandler = (userId) => {
        if (group.bossId != '0000') {
            Alert.alert('Bạn không thể xóa thành viên nhóm', 'Bạn không phải trưởng nhóm nên không có quyền này!');
        }
        else {
            if (userId === group.bossId) {
                Alert.alert('Bạn chính là trưởng nhóm', 'Trưởng nhóm không thể tự xóa mình khỏi nhóm! Hãy chắc chắn trước khi thực hiện rời bỏ nhóm.');
                return;
            }
            Alert.alert('Xác nhận xóa thành viên', 'Khi xóa thành viên này, mọi nhiệm vụ được giao cho thành viên này sẽ bị xóa.\nXin hãy xác nhận lại việc xóa thành viên.',
                [
                    {
                        text: 'Hủy', // Button label
                        onPress: () => null, // Handler for cancel button
                        style: 'cancel', // Optional: styling for the cancel button
                    },
                    {
                        text: 'Xóa', // Button label
                        onPress: () => { removeMemberFromGroup(groupId, userId); console.log(groups); }, // Handler for OK button
                        
                    },
                ]
            );
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={userIDs}
                renderItem={({ item }) => (
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={styles.item}>
                            <Text style={styles.name}>{item}</Text>
                            <Text style={styles.phoneNumber}>phoneNumber</Text>
                        </View>
                        <TouchableOpacity style={{marginRight: 20}} onPress={() => trashButtonHandler(item)}>
                            {/*<Text style={styles.removeButtonText}>Bỏ</Text>*/}
                            <Icon name="trash" size={35} color="purple" />
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddMemberForm', { groupId: groupId })}
            >
                <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    name: {
        fontSize: 18,
    },
    phoneNumber: {
        fontSize: 14,
        color: 'gray',
    },
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: 'lightcoral',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MemberList;