import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

/*
 *  Author:   Ovezmyrat Arnazarov
 *  Class Description:  Tags UI component that diplays status, birthdate, phone and email of a patients as tags
 *
 */

const Tags = ({ item }) => {
  return (
    <>
      <TouchableOpacity style={styles.btnColor}>
        <Text style={styles.text}>{item.status}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnColor}>
        <Text style={styles.text}>{item.birthdate}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnColor}>
        <Text style={styles.text}>{item.phone}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnColor}>
        <Text style={styles.text}>{item.email}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: '#eee',
    marginTop: 5,
  },
  text: {
    fontStyle: 'italic',
    color: '#610C63',
  },
});

export default Tags;
