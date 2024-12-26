import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ShopContext } from '../Context/ShopContext';

const TodoTask = ({ navigation, route }) => {
  const { tasks, removeTask, toggleTaskCompletion } = useContext(ShopContext);
  const { listName, listId, familyList } = route.params;

  //console.log(listId);
  // Automatically set the title when the screen is navigated to
  useLayoutEffect(() => {
    navigation.setOptions({
      title: listName, // Dynamically set the title here
    });
  }, [listName]); // This will run when navigation or screenTitle changes

  const handleFabPress = () => {
    navigation.navigate('AddItemForm', { listId });
  };

   const trashButtonHandler = (taskId) => {
          if (!familyList) {
              removeTask(taskId);
          }
          else {
              Alert.alert('Bạn không thể xóa công việc nhóm', 
                  'Xin hay liên hệ với trưởng nhóm để thay đổi điều này');
          }
      };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks.filter(item => item.listId === listId)}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
            <View style={[styles.taskContainer, item.completed && styles.completedTaskContainer]}>
              <Text style={[styles.taskText, item.completed && styles.completedTask]}>
                {item.count + ' ' + item.unit + ' ' + item.text}
              </Text>
              <TouchableOpacity onPress={() => trashButtonHandler(item.id)}>
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
  completedTaskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'gray',
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  task: {
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#bbb',
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