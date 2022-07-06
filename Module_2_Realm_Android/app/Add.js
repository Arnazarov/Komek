import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useFonts } from 'expo-font';
import { useRealm } from './models/Project';
import { Patients } from './models/Patients';
import {
  addPatientDynamoDB,
  fetchAllPatientsDynamoDB,
} from '../controllers/dynamodb';

/*
 *  Author:   Ovezmyrat Arnazarov
 *  Class Description:  UI Add component that displays a form to add a new patient. This class is responsible
 *                      for adding a new patient to DynamoDB and Realm databases.
 *
 */
export default function Add() {
  const realm = useRealm();
  const navigation = useNavigation();
  const [cloudData, setCloudData] = useState('');

  const [fontLoaded] = useFonts({
    B: require('../assets/fonts/bold.ttf'),
    E: require('../assets/fonts/exbold.ttf'),
    H: require('../assets/fonts/heavy.ttf'),
  });

  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    birthdate: '',
    phone: '',
    patientID: '',
    bloodPressure: '96/60 mmHg',
    heartrate: '70 bpm',
    temperature: '96.8 degF',
    respiratoryRate: '16 bpm',
    pulseOximetry: '96%',
  });

  /*
   *  Description:   Fetch/Read Patients' data from DynamoDB and set it to cloudData variable
   *  Inputs:   No inputs required
   *  Output:   No output
   */
  useEffect(() => {
    fetchAllPatientsDynamoDB().then((data) => setCloudData(data));
  }, []);

  /*
   *  Description:   Creates/Adds a new Patient in DynamoDB and Realm databases when Add Button is clicked
   *  Inputs:   No inputs required
   *  Output:   No output
   */
  const handleAddPatient = async () => {
    try {
      if (cloudData) {
        const existsInDynamoDB = cloudData.filter(
          (patient) => patient.email === patientInfo.email
        );

        // If patient is not saved in the cloud, then create one
        if (!existsInDynamoDB.length) {
          // After saving in cloud, add this new patient to local Realm DB
          addPatientDynamoDB(patientInfo).then((patientID) =>
            addPatientRealmDB(patientID)
          );
        } else {
          Alert.alert('Patient Already Registered');
        }
      } else {
        Alert.alert('AWS Network Error: Patient cannot be created!');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /*
   *  Description:   Method fo adding a new Patient to Realm database
   *  Inputs:   Patient id of type String is required as parameter
   *  Output:   No output
   */
  const addPatientRealmDB = (id) => {
    const { name, email, birthdate, phone } = patientInfo;

    if (!name || !email || !birthdate || !phone) {
      Alert.alert('Please fill all required fields');
      return;
    }

    try {
      realm?.write(() => {
        const q = `email == '${email}'`;
        let patientResults = realm.objects('Patients').filtered(q);

        // If patient is not already present, create a new one
        if (!patientResults.length) {
          patientResults = [
            realm.create(
              'Patients',
              new Patients({ ...patientInfo, patientID: id })
            ),
          ];
        } else {
          Alert.alert('Patient Already Registered');
          return;
        }

        Alert.alert('Success Adding New Patient');
        navigation.navigate('Home');
      });
    } catch (e) {
      Alert.alert('Error Adding Patient', e.message);
    }
  };

  const inputHandler = (name, value) => {
    setPatientInfo({ ...patientInfo, [name]: value });
  };

  if (fontLoaded) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/bg.png')}
          style={{ height: '100%', width: '100%' }}
          imageStyle={{ resizeMode: 'cover', alignSelf: 'flex-end' }}
        >
          <ScrollView style={{ marginHorizontal: '7.5%', marginTop: '5%' }}>
            <View style={{ marginTop: '3%' }}></View>
            <Text
              style={{
                fontFamily: 'E',
                fontSize: 40,
                color: '#FFF',
                lineHeight: 45,
              }}
            >
              Personal Info & Metrics
            </Text>
            <View
              style={{ marginTop: '3%', justifyContent: 'space-evenly' }}
            ></View>

            {/* NAME */}
            <View style={styles.inputWrapper}>
              <View style={{ width: '95%' }}>
                <Text style={styles.text}>Fullname</Text>
                <TextInput
                  placeholder="John Doe"
                  style={styles.inputText}
                  placeholderTextColor="#FAD8D8"
                  onChangeText={(value) => {
                    inputHandler('name', value);
                  }}
                ></TextInput>
              </View>
            </View>

            {/* Birthdate */}
            <View style={styles.inputWrapper}>
              <View style={{ width: '95%' }}>
                <Text style={styles.text}>Birthdate</Text>
                <TextInput
                  placeholder="01-01-1970"
                  style={styles.inputText}
                  placeholderTextColor="#FAD8D8"
                  onChangeText={(value) => {
                    inputHandler('birthdate', value);
                  }}
                ></TextInput>
              </View>
              <Icon
                name="date"
                type="fontisto"
                color={`rgba(250, 216, 216, 0.5)`}
                size={35}
                style={{ textAlign: 'right' }}
              ></Icon>
            </View>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <View style={{ width: '95%' }}>
                <Text style={styles.text}>Email</Text>
                <TextInput
                  textContentType="emailAddress"
                  placeholder="johndoe@gmail.com"
                  style={styles.inputText}
                  placeholderTextColor="#FAD8D8"
                  onChangeText={(value) => {
                    inputHandler('email', value);
                  }}
                ></TextInput>
              </View>
              <Icon
                name="email"
                type="entypo"
                color={`rgba(250, 216, 216, 0.5)`}
                size={35}
                style={{ textAlign: 'right' }}
              ></Icon>
            </View>

            {/* Phone */}
            <View style={styles.inputWrapper}>
              <View style={{ width: '95%' }}>
                <Text style={styles.text}>Phone</Text>
                <TextInput
                  placeholder="111-111-1111"
                  style={styles.inputText}
                  placeholderTextColor="#FAD8D8"
                  onChangeText={(value) => {
                    inputHandler('phone', value);
                  }}
                ></TextInput>
              </View>
              <Icon
                name="phone"
                type="antdesign"
                color={`rgba(250, 216, 216, 0.5)`}
                size={30}
                style={{ textAlign: 'right', marginTop: '25%' }}
              ></Icon>
            </View>
            {/* Blood Pressure */}
            <View style={styles.inputWrapper}>
              <View style={{ width: '95%' }}>
                <Text style={styles.text}>Blood Pressure</Text>
                <TextInput
                  placeholder="96/60 mmHg"
                  style={styles.inputText}
                  placeholderTextColor="#FAD8D8"
                  onChangeText={(value) => {
                    inputHandler('bloodPressure', value);
                  }}
                ></TextInput>
              </View>
              <Icon
                name="blood-test"
                type="fontisto"
                color={`rgba(250, 216, 216, 0.5)`}
                size={30}
                style={{ textAlign: 'right', marginTop: '25%' }}
              ></Icon>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              {/* Heart rate */}
              <View style={styles.inputWrapperTwo}>
                <View style={{ width: '90%' }}>
                  <Text style={styles.text}>Heart Rate</Text>
                  <TextInput
                    placeholder="70 bpm"
                    style={styles.inputText}
                    placeholderTextColor="#FAD8D8"
                    onChangeText={(value) => {
                      inputHandler('heartrate', value);
                    }}
                  ></TextInput>
                </View>
                <Icon
                  name="heartbeat"
                  type="font-awesome"
                  color={`rgba(250, 216, 216, 0.5)`}
                  size={30}
                  style={{ textAlign: 'right', marginTop: '25%' }}
                ></Icon>
              </View>
              {/* Temperature */}
              <View style={styles.inputWrapperTwo}>
                <View style={{ width: '90%' }}>
                  <Text style={styles.text}>Temperature</Text>
                  <TextInput
                    placeholder="96.8 degf"
                    style={styles.inputText}
                    placeholderTextColor="#FAD8D8"
                    onChangeText={(value) => {
                      inputHandler('temperature', value);
                    }}
                  ></TextInput>
                </View>
                <Icon
                  name="temperature-low"
                  type="font-awesome-5"
                  color={`rgba(250, 216, 216, 0.5)`}
                  size={30}
                  style={{ marginTop: '25%' }}
                ></Icon>
              </View>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              {/* Respiratory */}
              <View style={styles.inputWrapperTwo}>
                <View style={{ width: '90%' }}>
                  <Text style={styles.text}>Respiratory</Text>
                  <TextInput
                    placeholder="16 bpm"
                    style={styles.inputText}
                    placeholderTextColor="#FAD8D8"
                    onChangeText={(value) => {
                      inputHandler('respiratoryRate', value);
                    }}
                  ></TextInput>
                </View>
                <Icon
                  name="lungs"
                  type="font-awesome-5"
                  color={`rgba(250, 216, 216, 0.5)`}
                  size={25}
                  style={{ marginTop: '25%' }}
                ></Icon>
              </View>

              {/* Oximetry */}
              <View style={styles.inputWrapperTwo}>
                <View style={{ width: '90%' }}>
                  <Text style={styles.text}>Oximetry</Text>
                  <TextInput
                    placeholder="96%"
                    style={styles.inputText}
                    placeholderTextColor="#FAD8D8"
                    onChangeText={(value) => {
                      inputHandler('pulseOximetry', value);
                    }}
                  ></TextInput>
                </View>
                <Icon
                  name="blood-drop"
                  type="fontisto"
                  color={`rgba(250, 216, 216, 0.5)`}
                  size={30}
                  style={{ marginTop: '25%' }}
                ></Icon>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleAddPatient}
              style={{ marginBottom: 20 }}
            >
              <Text style={styles.btn}>Add Patient</Text>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  } else {
    return <View></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',
    backgroundColor: '#F04D4E',
  },
  inputWrapper: {
    marginTop: '5%',
    backgroundColor: `rgba(252, 219, 220, 0.2)`,
    borderRadius: 15,
    paddingHorizontal: '5%',
    paddingVertical: '1.5%',
    flexDirection: 'row',
  },
  inputWrapperTwo: {
    marginTop: '5%',
    backgroundColor: `rgba(252, 219, 220, 0.2)`,
    borderRadius: 15,
    paddingHorizontal: '5%',
    paddingVertical: '1.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '47%',
  },
  text: { fontFamily: 'E', color: '#FAD8D8' },
  inputText: { fontFamily: 'B', color: '#FFF', fontSize: 20 },
  btn: {
    color: '#FCDBDC',
    fontFamily: 'E',
    fontSize: 25,
    marginTop: '5%',
    alignSelf: 'center',
    backgroundColor: '#C689C6',
    borderColor: '#E8A0BF',
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 35,
  },
});
