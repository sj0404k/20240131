import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

const WeightSetPage = ({ route }) => {
  const navigation = useNavigation();
  const [weightData, setWeightData] = useState([]);
  const [dateData, setDateData] = useState('');

  const handleWeightChange = (inputWeight) => {
    setWeightData(inputWeight);
  }

  const handleDateChange = (inputDate) => {
    setDateData(inputDate);
  }

  const saveWeightData = async () => {

  }

  return (
    <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
      <View style={{ width: '100%', alignItems: 'center', marginBottom: 10 }}>
        <Text style={styles.title}>체중 등록</Text>
      </View>
      <View style={{ alignSelf: 'center', width: '80%' }}>
        <View style={{ width: '100%' }}>

          <Text style={styles.title1}>체중</Text>
          <TextInput
            style={styles.inputcontainer}
            onChangeText={handleWeightChange}
            value={weightData}
            placeholder="체중을 입력하세요"
            placeholderTextColor="gray"
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={saveWeightData}      >
          <Text style={styles.addButtonText}>체중 설정</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'rgba(0,0,0,0.90)',
    fontSize: 35,
    fontFamily: 'Noto Sans',
    fontWeight: '700',
  },
  title1: {
    color: 'rgba(0,0,0,0.90)',
    fontSize: 25,
    fontFamily: 'Noto Sans',
    fontWeight: '700',
  },
  titleContainer: {
    alignItems: 'center',
    padding: 5,
  },
  inputcontainer: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
    width: '100%',
  },
  addButton: {
    alignSelf: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 38,
    width: '80%',
    marginTop: 'auto',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
})
export default WeightSetPage;