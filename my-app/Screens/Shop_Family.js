import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const GroupScreen = () => {
  // Constant list of groups and their items
  const groups = [
    { id: 1, name: 'Ăn Tết nhà ngoại' },
    { id: 2, name: 'Group 2' },
    { id: 3, name: 'Group 3' },
    { id: 4, name: 'Group 4' },
    { id: 5, name: 'Group 5' },
    { id: 6, name: 'Ăn Tết nhà nội' },
    { id: 7, name: 'Group 6' },
    { id: 8, name: 'Group 7' },
    { id: 9, name: 'Group 8' },
    { id: 10, name: 'Group 9' },
  ];

  return (
    <View style={{flex: 1}}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        {/* Render each group dynamically using map */}
        {groups.map((group) => (
          <View key={group.id} style={styles.group}>
            <Text style={styles.groupText}>{group.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
    <TouchableOpacity
              style={styles.fab}
              onPress={() => null}
            >
              <Text style={{color: 'white', fontSize: 24}}>+</Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
  },
  row: {
    flexDirection: 'row', // Align groups horizontally in a row
    flexWrap: 'wrap', // Wrap items into multiple rows
    justifyContent: 'space-around', // Space groups evenly between rows
    alignItems: 'center', // Vertically center groups
    width: '100%',
  },
  group: {
    alignItems: 'center', // Center content within each group
    width: '45%', // Each group takes up 45% of the row width (two items per row)
    marginVertical: 20, // Space between rows
    borderWidth: 2,
    borderColor: 'limegreen',
    borderRadius: 20,
    backgroundColor: 'lemonchiffon',
  },
  groupText: {
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 40
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

export default GroupScreen;
