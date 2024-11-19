import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {  Platform } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Hello from HUST! </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontStyle: 'italic',
    fontSize: Platform.OS === 'android' ? 30 : 50,
    color: Platform.OS === 'android' ? 'yellow' : 'red',
    justifyContent: 'center'
  }
});
