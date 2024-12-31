import React, { useState, useLayoutEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ShopContext } from '../Context/ShopContext';

const GroupDetail = ({ navigation, route }) => {

  const { groupId, groupName, bossId } = route.params;
  const { removeGroup, tasks, removeTask } = useContext(ShopContext);

  //const [data, setData] = useState(tasks.filter(task => task.listId === groupId));
  const data = tasks.filter(task => task.listId === groupId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: groupName, // Dynamically set the title here
    });
  }, [groupName]);

  const groupByUserId = (tasks) => {
    return tasks.reduce((acc, task) => {
      if (!acc[task.userId]) {
        acc[task.userId] = [];
      }
      acc[task.userId].push(task);
      return acc;
    }, {});
  };

  const groupedTasks = Object.values(groupByUserId(data)).flat();

  const trashButtonHandler = (taskId, userId) => {
            if (bossId === userId) {
                removeTask(taskId);
            }
            else {
                Alert.alert('Bạn không thể xóa công việc nhóm', 
                    'Xin hay liên hệ với trưởng nhóm để thay đổi điều này');
            }
        };

  // Button press handlers
  const handleButton1Press = () => {
    navigation.navigate('MemberList', { groupId: groupId });
  };

  const handleButton2Press = () => {
    if (bossId === '0000') {
      Alert.alert('Bạn là người quản lý nhóm', 'Khi bạn rời bỏ nhóm, tất cả phân công sẽ bị xóa.\nXin hãy xác nhận lại việc rời bỏ nhóm.',
        [
        {
          text: 'Hủy', // Button label
          onPress: () => null, // Handler for cancel button
          style: 'cancel', // Optional: styling for the cancel button
        },
        {
          text: 'Rời bỏ', // Button label
          onPress: () => {removeGroup(groupId);
            navigation.goBack();}, // Handler for OK button
        },
      ]);
    } else {
      Alert.alert('Bạn là thành viên được thêm vào', 'Xin hãy liên hệ với người quản lý nhóm để rời khỏi nhóm này');
    }
  };

  return (
    <View style={styles.container}>
      {/* Row with two buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.memberButton} onPress={handleButton1Press}>
          <Text style={{ fontSize: 16, color: 'darkcoral' }}>Xem thành viên</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.CancelButton} onPress={handleButton2Press}>
          <Text style={styles.buttonText}>Rời đi</Text>
        </TouchableOpacity>
      </View>

      {/* FlatList displaying items */}
      <FlatList
              data={groupedTasks}
              renderItem={({ item, index }) => (
                  <View style={[styles.taskContainer, item.completed && styles.completedTaskContainer]}>
                    <Text style={[styles.taskText, item.completed && styles.completedTask]}>
                      {item.count + ' ' + item.unit + ' ' + item.text}
                    </Text>
                    <Text style={[ { color: 'blue', fontSize: 16, fontWeight: 'bold', fontStyle: 'italic' }]}>
                      {item.userId}
                    </Text>
                    <TouchableOpacity onPress={() => trashButtonHandler(item.id, item.userId)}>
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
        onPress={() => navigation.navigate('AddTaskToGroup', { groupId: groupId })}
      >
        <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#bbb',
  },
  buttonRow: {
    flexDirection: 'row', // Align buttons horizontally in the same row
    justifyContent: 'space-between', // Space out the buttons
    marginBottom: 20, // Add space between the buttons and FlatList
  },
  memberButton: {
    backgroundColor: 'lightgreen',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1, // Make the button take equal space
    marginHorizontal: 5, // Space between buttons
    alignItems: 'center',
    justifyContent: 'center',
  },
  CancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1, // Make the button take equal space
    marginHorizontal: 5, // Space between buttons
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
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

export default GroupDetail;
