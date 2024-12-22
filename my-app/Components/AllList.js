import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ShopContext } from '../Context/ShopContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const AllList = ({ navigation }) => {
    const { lists, removeList } = useContext(ShopContext);

    return (
        // <TouchableOpacity onPress={() => navigation.navigate('TodoTask')}>
        //     <Text> Ngày 1-12-2024 </Text>
        // </TouchableOpacity>
        <View style={styles.container}>
            <FlatList
                data={lists.slice(0).reverse()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('TodoTask', { listName: item.name, listId: item.listId, famList: item.familyList })}>
                        <View style={styles.taskContainer}>
                            <Text style={styles.task}>{item.name}</Text>
                            <TouchableOpacity onPress={() => removeList(item.listId)}>
                                            {/*<Text style={styles.removeButtonText}>Bỏ</Text>*/}
                                            <Icon name="trash" size={35} color="purple" />
                                        </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.taskList}
            />
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddListForm')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AllList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        fontSize: 16,
    },
    taskList: {
        marginTop: 20,
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'seashell',
        marginVertical: 5,
        borderRadius: 5,
        borderColor: 'salmon',
        borderWidth: 2,
    },
    task: {
        fontSize: 18,
    },
    removeButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#6200ea', // Purple color for the button
        justifyContent: 'center',
        alignItems: 'center',
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
    fabText: {
        color: '#fff',
        fontSize: 24,
    },
});