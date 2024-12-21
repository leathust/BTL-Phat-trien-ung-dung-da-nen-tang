import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

const TodoTask = ({navigation, route}) => {
  const [task, setTask] = useState(''); // Input field for new task
  const [tasks, setTasks] = useState([]); // List of tasks

  // Function to add a new task
  const addTask = (t) => {
    if (t) {
      setTask(t);
      setTasks([...tasks, task]);
      //setTask(''); // Clear the input field after adding the task
    }
  };

  // Function to remove a task
  const removeTask = (index) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  const handleFabPress = () => {
    navigation.navigate('AddItemForm', {addTask});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.task}>{item}</Text>
            <TouchableOpacity style={styles.button} onPress={() => removeTask(index)}>
                <Text style={styles.removeButtonText}>Loai</Text>
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
    backgroundColor: '#fff',
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
    backgroundColor: '#6200ea', // Purple color for the button
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#6200ee',
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