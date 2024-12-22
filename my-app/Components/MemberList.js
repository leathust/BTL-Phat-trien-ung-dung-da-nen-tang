import React, {useState, useContext} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ShopContext } from '../Context/ShopContext';

const MemberList = ({ navigation, route }) => {

    const { groupId } = route.params;
    const { groups } = useContext(ShopContext);
    const group = groups.find(group => group.groupId === groupId);
    const userIDs = group.userIDs;
    
    return (
        <View style={styles.container}>
            <FlatList
                data={userIDs}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.name}>{item}</Text>
                        <Text style={styles.phoneNumber}>phoneNumber</Text>
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