import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const FoodDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { food } = route.params;

  // State để quản lý hiển thị modal và các thông tin thực phẩm đã chỉnh sửa
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedFood, setEditedFood] = useState(food);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState('');

  // Dùng useEffect để kiểm tra và khởi tạo ngày nếu chưa có
  useEffect(() => {
    if (!editedFood.addedDate) {
      setEditedFood((prev) => ({
        ...prev,
        addedDate: new Date(),
      }));
    }
    if (!editedFood.expirationDate) {
      setEditedFood((prev) => ({
        ...prev,
        expirationDate: new Date(),
      }));
    }
  }, [editedFood]);

  // Hàm lưu thay đổi thông tin thực phẩm vào AsyncStorage
  const handleSaveChanges = async () => {
    // Kiểm tra nếu các trường quan trọng còn thiếu
    if (!editedFood.name || !editedFood.quantity || !editedFood.unit || !editedFood.type || !editedFood.location) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      // Lấy danh sách thực phẩm từ AsyncStorage
      const storedFoods = await AsyncStorage.getItem('foodList');
      // Nếu có dữ liệu thì parse nó thành mảng, nếu không thì khởi tạo mảng rỗng
      const foodList = storedFoods ? JSON.parse(storedFoods) : [];

      // Cập nhật thực phẩm đã chỉnh sửa vào danh sách
      const updatedFoodList = foodList.map(item =>
        item.id === editedFood.id ? editedFood : item
      );

      // Lưu lại danh sách thực phẩm đã được cập nhật vào AsyncStorage
      await AsyncStorage.setItem('foodList', JSON.stringify(updatedFoodList));

      // Hiển thị thông báo thành công
      Alert.alert('Thành công', 'Thông tin đã được lưu.');
      setModalVisible(false); // Đóng modal
    //   navigation.goBack(); // Quay lại màn hình trước
    } catch (error) {
      // Hiển thị thông báo lỗi nếu có sự cố khi lưu
      Alert.alert('Lỗi', 'Không thể lưu thông tin.');
    }
  };

  // Hàm xử lý thay đổi ngày
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || editedFood.addedDate;
    if (selectedDateType === 'addedDate') {
      setEditedFood({ ...editedFood, addedDate: currentDate });
    } else if (selectedDateType === 'expirationDate') {
      setEditedFood({ ...editedFood, expirationDate: currentDate });
    }
    setShowDatePicker(false); // Đóng date picker khi chọn xong
  };

  // Hàm định dạng ngày hiển thị
  const formatDate = (date) => {
    if (date) {
      return new Date(date).toLocaleDateString(); // Định dạng ngày
    }
    return 'Chưa có thông tin'; // Nếu không có thông tin ngày
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Tên thực phẩm:</Text>
        <Text style={styles.value}>{editedFood.name}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Số lượng:</Text>
        <Text style={styles.value}>{editedFood.quantity} {editedFood.unit}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Loại:</Text>
        <Text style={styles.value}>{editedFood.type}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Vị trí:</Text>
        <Text style={styles.value}>{editedFood.location}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Ngày thêm:</Text>
        <Text style={styles.value}>{formatDate(editedFood.addedDate)}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Ngày hết hạn:</Text>
        <Text style={styles.value}>{formatDate(editedFood.expirationDate)}</Text>
      </View>

      {/* Nút chỉnh sửa thông tin */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => setModalVisible(true)} 
      >
        <Text style={styles.backButtonText}>Chỉnh sửa</Text>
      </TouchableOpacity>

      {/* Modal để chỉnh sửa thông tin thực phẩm */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>Chỉnh sửa thông tin thực phẩm</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Tên thực phẩm"
              value={editedFood.name}
              onChangeText={(text) => setEditedFood({ ...editedFood, name: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Số lượng"
              keyboardType="numeric"
              value={editedFood.quantity.toString()}
              onChangeText={(text) => setEditedFood({ ...editedFood, quantity: parseFloat(text) })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Đơn vị"
              value={editedFood.unit}
              onChangeText={(text) => setEditedFood({ ...editedFood, unit: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Loại"
              value={editedFood.type}
              onChangeText={(text) => setEditedFood({ ...editedFood, type: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Vị trí"
              value={editedFood.location}
              onChangeText={(text) => setEditedFood({ ...editedFood, location: text })}
            />

            {/* Hiển thị DatePicker cho Ngày thêm */}
            <TouchableOpacity onPress={() => { setSelectedDateType('addedDate'); setShowDatePicker(true); }}>
              <View style={styles.datePickerContainer}>
                <Text style={styles.label}>Ngày thêm:</Text>
                <Text style={styles.value}>{formatDate(editedFood.addedDate)}</Text>
              </View>
            </TouchableOpacity>

            {/* Hiển thị DatePicker cho Ngày hết hạn */}
            <TouchableOpacity onPress={() => { setSelectedDateType('expirationDate'); setShowDatePicker(true); }}>
              <View style={styles.datePickerContainer}>
                <Text style={styles.label}>Ngày hết hạn:</Text>
                <Text style={styles.value}>{formatDate(editedFood.expirationDate)}</Text>
              </View>
            </TouchableOpacity>

            {/* DatePicker component */}
            {showDatePicker && (
              <DateTimePicker
                value={new Date(editedFood[selectedDateType])}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleSaveChanges}>
                <Text style={styles.confirmButtonText}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  detailContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#5cb85c',
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  datePickerContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default FoodDetailsScreen;