import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TaskContext } from '../Context/TaskContext';

const TodoTask = ({navigation, route}) => {
  const { tasks, addTask, removeTask, toggleTaskCompletion } = useContext(TaskContext);
  const { listName, listId } = route.params;

  //console.log(listId);
  // Automatically set the title when the screen is navigated to
  useLayoutEffect(() => {
    navigation.setOptions({
      title: listName, // Dynamically set the title here
    });
  }, [listName]); // This will run when navigation or screenTitle changes

  const handleFabPress = () => {
    navigation.navigate('AddItemForm', {listId});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks.filter(item => item.listId === listId)}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.task}>{item.count + ' ' + item.unit + ' ' + item.text}</Text>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
                {/*<Text style={styles.removeButtonText}>Bỏ</Text>*/}
                <Icon name="trash" size={35} color="purple" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.taskList}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={handleFabPress}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    backgroundColor: 'moccasin',
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
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
    backgroundColor: 'mediumpurple', // Purple color for the button
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

export default TodoTask;