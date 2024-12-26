import React, { useState, useLayoutEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { ShopContext } from '../Context/ShopContext';

const GroupDetail = ({ navigation, route }) => {
  // Sample data for the FlatList
  const [data, setData] = useState([
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
    { id: '4', name: 'Item 4' },
    { id: '5', name: 'Item 5' },
    { id: '6', name: 'Item 6' },
  ]);

  const { groupId, groupName, bossId } = route.params;
  const { removeGroup } = useContext(ShopContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: groupName, // Dynamically set the title here
    });
  }, [groupName]);

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
        data={data}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
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
