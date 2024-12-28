import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import TodoTask from '../Components/TodoTask';
import FormWithAlert from '../Components/FormWithAlert';
import AllFoodList from '../Components/AllFoodList';
import AddListForm from '../Components/AddNewListForm';

const FoodItem = ({ name, quantity, unit, onQuantityChange, onRemove }) => {
    return (
      <View style={styles.foodItem}>
        <Text style={styles.foodName}>{name}</Text>
        <View style={styles.quantityContainer}>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={quantity.toString()}
            onChangeText={(text) => onQuantityChange(name, text)}
          />
          <Text style={styles.unitText}>{unit}</Text>
          <TouchableOpacity onPress={() => onRemove(name)}>
            <Icon name="trash" size={20} color="#d9534f" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
// const ListStack = createNativeStackNavigator();

const FoodListScreen = ({ navigation }) => {
//     return (
//             <ListStack.Navigator initialRouteName='AllFoodList'>
//                 <ListStack.Screen name='AllFoodList' component={AllFoodList} options={{ headerShown: false }} />
//                 <ListStack.Screen name='TodoTask' component={TodoTask} />
//                 <ListStack.Screen name='AddItemForm' component={FormWithAlert} options={{ headerTitle: "Thêm đồ" }} />
//                 <ListStack.Screen name='AddListForm' component={AddListForm} options={{ headerTitle: "Thêm danh sách mới" }} />
//             </ListStack.Navigator>
//     );
// };
const [foodItems, setFoodItems] = useState([
    { name: 'Trứng', quantity: 12, unit: 'quả' },
    { name: 'Gà', quantity: 0.5, unit: 'con' },
    { name: 'Cá', quantity: 2, unit: 'khúc' },
  ]);
  const handleRemoveItem = (name) => {
    setFoodItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };
  const handleQuantityChange = (name, newQuantity) => {
    setFoodItems(
      foodItems.map((item) =>
        item.name === name ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Quản Lý Thực Phẩm</Text>
      <FlatList
        data={foodItems}
        renderItem={({ item }) => (
          <FoodItem
            key={item.name}
            {...item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveItem}
          />
        )}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Thêm thực phẩm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  foodName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityInput: {
    width: 50,
    height: 35,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    marginRight: 8,
    backgroundColor: '#f9f9f9',
  },
  unitText: {
    fontSize: 14,
    color: '#555',
    marginRight: 8,
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default FoodListScreen;