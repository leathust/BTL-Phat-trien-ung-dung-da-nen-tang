import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { ShopContext } from '../Context/ShopContext';

const AllGroup = ({ navigation }) => {
  // Constant list of groups and their items
  const { groups } = useContext(ShopContext);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.row}>
          {/* Render each group dynamically using map */}
          {groups.map((group, index) => (
            <TouchableOpacity key={index} style={styles.group} onPress={() => { navigation.navigate('GroupDetail', { groupId: group.groupId, groupName: group.name, bossId: group.bossID }); }}>
              <Text style={styles.groupText}>{group.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddGroupForm')}
      >
        <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
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

export default AllGroup;
