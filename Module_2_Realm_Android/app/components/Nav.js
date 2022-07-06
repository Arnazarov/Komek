import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

/*
 *  Author:   Ovezmyrat Arnazarov
 *  Class Description:  Naviagtion UI component that naviagtes to Home, AddPatient and Logout screens
 *
 */

const Nav = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.nav}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Icon name="users" type="entypo" color="#937DC2"></Icon>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Add');
        }}
      >
        <Icon name="add-user" type="entypo" color="#937DC2"></Icon>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Welcome');
        }}
      >
        <Icon name="logout" type="ant-design" color="#937DC2"></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    width: '85%',
    borderRadius: 45,
    backgroundColor: '#FEF5F5',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    position: 'absolute',
    zIndex: 3,
    bottom: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '20%',
    paddingVertical: '3%',
  },
});

export default Nav;
