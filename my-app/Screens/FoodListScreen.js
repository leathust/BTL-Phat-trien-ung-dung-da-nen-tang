import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Hook điều hướng
import AsyncStorage from '@react-native-async-storage/async-storage'; // Dùng AsyncStorage để lưu trữ dữ liệu
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Picker chọn ngày
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
// Component Item thực phẩm
const FoodItem = ({ name, quantity, unit, onQuantityChange, onRemove, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.foodItem}>
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
    </TouchableOpacity>
  );
};

const FoodListScreen = () => {
  const navigation = useNavigation();
  const [foodItems, setFoodItems] = useState([]); // Danh sách thực phẩm
  const [isModalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị Modal
  const [newFood, setNewFood] = useState({
    name: '',
    quantity: '',
    unit: '',
    type: '',
    location: '',
    addedDate: new Date(), // Ngày thêm
    expiryDate: new Date(), // Ngày hết hạn
  });
  const [showDatePicker, setShowDatePicker] = useState(false); // Trạng thái hiển thị DatePicker
  const [dateType, setDateType] = useState('addedDate'); // Xác định ngày được chọn (addedDate hoặc expiryDate)

  // Tải dữ liệu thực phẩm từ AsyncStorage khi component được render
  useEffect(() => {
    const loadFoodItems = async () => {
      const savedFoodItems = await AsyncStorage.getItem('foodItems');
      if (savedFoodItems) {
        setFoodItems(JSON.parse(savedFoodItems));
      }
    };
    loadFoodItems();
  }, []);

  // Lưu thực phẩm vào AsyncStorage khi danh sách thực phẩm thay đổi
  useEffect(() => {
    const saveFoodItems = async () => {
      await AsyncStorage.setItem('foodItems', JSON.stringify(foodItems));
    };
    saveFoodItems();
  }, [foodItems]);

  // Hàm xóa thực phẩm
  const handleRemoveItem = (name) => {
    setFoodItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };

  // Hàm thay đổi số lượng thực phẩm
  const handleQuantityChange = (name, newQuantity) => {
    setFoodItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, quantity: parseFloat(newQuantity) || 0 } : item
      )
    );
  };

  // Hàm thêm thực phẩm mới
  const handleAddFood = () => {
    if (
      newFood.name.trim() === '' ||
      newFood.quantity.trim() === '' ||
      newFood.unit.trim() === '' ||
      newFood.type.trim() === '' ||
      newFood.location.trim() === ''
    ) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin thực phẩm.');
      return;
    }

    if (isNaN(newFood.quantity) || parseFloat(newFood.quantity) <= 0) {
      Alert.alert('Lỗi', 'Số lượng phải là một số lớn hơn 0.');
      return;
    }

    // Thêm thực phẩm mới vào danh sách
    setFoodItems([...foodItems, { ...newFood, quantity: parseFloat(newFood.quantity) }]);
    // Reset thông tin thực phẩm
    setNewFood({
      name: '',
      quantity: '',
      unit: '',
      type: '',
      location: '',
      addedDate: new Date(),
      expiryDate: new Date(),
    });
    setModalVisible(false); // Đóng Modal sau khi thêm
  };

  // Hàm xử lý thay đổi ngày
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    if (dateType === 'addedDate') {
      setNewFood((prevFood) => ({ ...prevFood, addedDate: currentDate }));
    } else if (dateType === 'expiryDate') {
      setNewFood((prevFood) => ({ ...prevFood, expiryDate: currentDate }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Quản Lý Thực Phẩm</Text>

      {/* Danh sách thực phẩm */}
      <FlatList
        data={foodItems}
        renderItem={({ item }) => (
          <FoodItem
            name={item.name}
            quantity={item.quantity}
            unit={item.unit}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveItem}
            onPress={() => navigation.navigate('FoodDetails', { food: item })}
          />
        )}
        keyExtractor={(item) => item.name}
      />

      {/* Nút Thêm thực phẩm */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Thêm thực phẩm</Text>
      </TouchableOpacity>

      {/* Modal thêm thực phẩm */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>Thêm thực phẩm</Text>

            {/* Các input cho tên thực phẩm, số lượng, đơn vị, loại, vị trí */}
            <TextInput
              style={styles.modalInput}
              placeholder="Tên thực phẩm (vd: Bò)"
              value={newFood.name}
              onChangeText={(text) => setNewFood({ ...newFood, name: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Số lượng (vd: 1)"
              keyboardType="numeric"
              value={newFood.quantity}
              onChangeText={(text) => setNewFood({ ...newFood, quantity: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Đơn vị (vd: kg, bó, quả, ...)"
              value={newFood.unit}
              onChangeText={(text) => setNewFood({ ...newFood, unit: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Loại (vd: Thịt, Rau, ...)"
              value={newFood.type}
              onChangeText={(text) => setNewFood({ ...newFood, type: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Vị trí (vd: Ngăn đông, Ngăn mát)"
              value={newFood.location}
              onChangeText={(text) => setNewFood({ ...newFood, location: text })}
            />

            {/* Chọn ngày thêm và ngày hết hạn */}
            <TouchableOpacity onPress={() => { setShowDatePicker(true); setDateType('addedDate'); }}>
              <Text style={styles.unitText}>Ngày thêm: {new Date(newFood.addedDate).toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setShowDatePicker(true); setDateType('expiryDate'); }}>
              <Text style={styles.unitText}>Ngày hết hạn: {new Date(newFood.expiryDate).toLocaleDateString()}</Text>
            </TouchableOpacity>
            

            {/* Hiển thị DateTimePicker */}
            {showDatePicker && (
              <DateTimePicker
                value={dateType === 'addedDate' ? newFood.addedDate : newFood.expiryDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            {/* Nút Hủy và Xác nhận thêm thực phẩm */}
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleAddFood}>
                <Text style={styles.confirmButtonText}>Thêm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Style cho màn hình
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
  modalContainer: {
    flex: 1,
    top: height / 5,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#d9534f',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#28a745',
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FoodListScreen;