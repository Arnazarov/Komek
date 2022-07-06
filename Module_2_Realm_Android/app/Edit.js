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
import axios from 'axios';
import { AWS_ENDPOINT } from '@env';
import {
  deletePatientDynamoDB,
  fetchAllPatientsDynamoDB,
  updatePatientDynamoDB,
} from '../controllers/dynamodb';

/*
 *  Author:   Ovezmyrat Arnazarov
 *  Class Description:  UI Edit component that displays a form to update an exisitng patient. This class is responsible
 *                      for updating and deleting a patient from DynamoDB and Realm databases.
 *
 */
export default function Edit({ route }) {
  const realm = useRealm();
  const { patient } = route.params;
  const navigation = useNavigation();
  const [cloudData, setCloudData] = useState('');
  const [fontLoaded] = useFonts({
    B: require('../assets/fonts/bold.ttf'),
    E: require('../assets/fonts/exbold.ttf'),
    H: require('../assets/fonts/heavy.ttf'),
  });

  const {
    name,
    email,
    phone,
    birthdate,
    heartrate,
    respiratoryRate,
    pulseOximetry,
    bloodPressure,
    temperature,
  } = patient;

  const [patientName, setPatientName] = useState(name);
  const [patientEmail, setPatientEmail] = useState(email);
  const [patientPhone, setPatientPhone] = useState(phone);
  const [patientBirthdate, setPatientBirthdate] = useState(birthdate);
  const [patientHeartRate, setPatientHeartRate] = useState(heartrate);
  const [patientRespiratoryrate, setPatientRespiratoryrate] =
    useState(respiratoryRate);
  const [patientPulseOximetry, setPatientPulseOximetry] =
    useState(pulseOximetry);
  const [patientBloodPressure, setPatientBloodPressure] =
    useState(bloodPressure);
  const [patientTemperature, setPatientTemperature] = useState(temperature);

  /*
   *  Description:   Fetch/Read Patients' data from DynamoDB and set it to cloudData variable
   *  Inputs:   No inputs required
   *  Output:   No output
   */
  useEffect(() => {
    fetchAllPatientsDynamoDB().then((data) => setCloudData(data));
  }, []);

  /*
   *  Description:   Updates an existing Patient in DynamoDB and Realm databases when Update Button is clicked
   *  Inputs:   No inputs required
   *  Output:   No output
   */
  const handleEditPatient = async () => {
    try {
      if (cloudData) {
        const existsInDynamoDB = cloudData?.filter(
          (patient) => patient.email === patientEmail
        );

        // If patient is saved in the cloud, then update it
        if (existsInDynamoDB) {
          const editedPatient = {
            patientID: patient.patientID,
            patientName,
            patientBirthdate,
            patientEmail,
            patientPhone,
            patientTemperature,
            patientHeartRate,
            patientBloodPressure,
          };
          // After updating in cloud, update this patient in local Realm DB
          updatePatientDynamoDB(editedPatient).then((data) =>
            updatePatientRealmDB()
          );
        } else {
          Alert.alert('Patient Is Not Registered');
        }
      } else {
        Alert.alert('AWS Network Error: Patient cannot be updated!');
      }
    } catch (e) {
      console.log(e);
    }
  };

  /*
   *  Description:   Method for updating an existing Patient in Realm database
   *  Inputs:   No input parameters
   *  Output:   No output
   */
  const updatePatientRealmDB = () => {
    if (!patientName || !patientEmail || !patientPhone || !patientBirthdate) {
      Alert.alert('Please fill all required fields');
      return;
    }
    try {
      realm.write(() => {
        const existsInRealm = realm?.objectForPrimaryKey(
          'Patients',
          Realm.BSON.ObjectId(patient._id)
        );

        // If patient exists, update it
        if (existsInRealm) {
          existsInRealm.name = patientName;
          existsInRealm.birthdate = patientBirthdate;
          existsInRealm.phone = patientPhone;
          existsInRealm.email = patientEmail;
          existsInRealm.bloodPressure = patientBloodPressure;
          existsInRealm.heartrate = patientHeartRate;
          existsInRealm.temperature = patientTemperature;
          existsInRealm.respiratoryRate = patientRespiratoryrate;
          existsInRealm.pulseOximetry = patientPulseOximetry;

          Alert.alert('Success Updating New Patient');
          navigation.navigate('Home');
        } else {
          Alert.alert('Patient Not Found');
          return;
        }
      });
    } catch (e) {
      Alert.alert('Error Adding Patient', e.message);
    }
  };

  /*
   *  Description:   Deletes an existing Patient in DynamoDB and Realm databases when Delete Button is clicked
   *  Inputs:   No inputs required
   *  Output:   No output
   */
  const handleDeletePatient = async () => {
    try {
      if (cloudData) {
        const existisInCloud = cloudData.find(
          (item) => item.patientID === patient?.patientID
        );

        const existsInRealm = realm?.objectForPrimaryKey(
          'Patients',
          Realm.BSON.ObjectId(patient._id)
        );

        if (existisInCloud && existsInRealm) {
          // Delete from DynamoDB
          await axios
            .delete(`http://${AWS_ENDPOINT}/patient/${patient?.patientID}`)
            .then(() => {
              // Delete from Realm DB
              realm.write(() => {
                realm?.delete(
                  realm?.objectForPrimaryKey(
                    'Patients',
                    Realm.BSON.ObjectId(patient._id)
                  )
                );
              });
            });

          Alert.alert('Success Deleting Patient');
          navigation.navigate('Home');
        } else {
          Alert.alert('Patient Not Registered in the System');
        }
      } else {
        Alert.alert('AWS Network Error: Patient cannot be deleted!');
      }
    } catch (e) {
      Alert.alert('Error Deleting Patient', e.message);
    }
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
                  value={patientName}
                  placeholder="John Doe"
                  style={styles.inputText}
                  placeholderTextColor="#FAD8D8"
                  onChangeText={(value) => setPatientName(value)}
                ></TextInput>
              </View>
            </View>

            {/* Birthdate */}
            <View style={styles.inputWrapper}>
              <View style={{ width: '95%' }}>
                <Text style={styles.text}>Birthdate</Text>
                <TextInput
                  value={patientBirthdate}
                  placeholder="01-01-1970"
                  style={styles.inputText}
                  placeholderTextColor="#FAD8D8"
                  onChangeText={(value) => setPatientBirthdate(value)}
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
                  value={patientEmail}
                  textContentType="emailAddress"
                  placeholder="johndoe@gmail.com"
                  style={styles.inputText}
                  placeholderTextColor="#FAD8D8"
                  onChangeText={(value) => setPatientEmail(value)}
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
                  value={patientPhone}
                  placeholder="111-111-1111"
                  style={styles.inputText}
                  placeholderTextColor="#FAD8D8"
                  onChangeText={(value) => setPatientPhone(value)}
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
                  value={patientBloodPressure}
                  placeholder="96/60 mmHg"
                  style={styles.inputText}
                  placeholderTextColor="#FAD8D8"
                  onChangeText={(value) => setPatientBloodPressure(value)}
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
                    value={patientHeartRate}
                    placeholder="70 bpm"
                    style={styles.inputText}
                    placeholderTextColor="#FAD8D8"
                    onChangeText={(value) => setPatientHeartRate(value)}
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
                    value={patientTemperature}
                    placeholder="96.8 degf"
                    style={styles.inputText}
                    placeholderTextColor="#FAD8D8"
                    onChangeText={(value) => setPatientTemperature(value)}
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
                    value={patientRespiratoryrate}
                    placeholder="16 bpm"
                    style={styles.inputText}
                    placeholderTextColor="#FAD8D8"
                    onChangeText={(value) => setPatientRespiratoryrate(value)}
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
                    value={patientPulseOximetry}
                    placeholder="96%"
                    style={styles.inputText}
                    placeholderTextColor="#FAD8D8"
                    onChangeText={(value) => setPatientPulseOximetry(value)}
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

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 25,
              }}
            >
              <TouchableOpacity onPress={handleEditPatient}>
                <Text
                  style={[
                    styles.btn,
                    { backgroundColor: '#ABC9FF', borderColor: '#F0EBE3' },
                  ]}
                >
                  Update Patient
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeletePatient}>
                <Text
                  style={[
                    styles.btn,
                    { backgroundColor: '#FF8B8B', borderColor: '#FBA1A1' },
                  ]}
                >
                  Delete Patient
                </Text>
              </TouchableOpacity>
            </View>
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
  btn: {
    color: '#fff',
    fontFamily: 'E',
    fontSize: 25,
    marginTop: '5%',
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 35,
  },
  text: { fontFamily: 'E', color: '#FAD8D8' },
  inputText: { fontFamily: 'B', color: '#FFF', fontSize: 20 },
});
