import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useFonts } from 'expo-font';
import Nav from './components/Nav';
import { useQuery, useRealm } from './models/Project';
import Tags from './components/Tags';
import { Patients } from './models/Patients';
import { fetchAllPatientsDynamoDB } from '../controllers/dynamodb';

/*
 *  Author:   Ovezmyrat Arnazarov
 *  Class Description:  UI Home component that displays all patients' data. This class is responsible
 *                      for fetching and displaying all data from DynamoDB and Realm databases.
 *
 */
export default function Home() {
  const realm = useRealm();
  const realmPatients = useQuery('Patients');

  const patients = useMemo(
    () => realmPatients.sorted('createdAt', true),
    [realmPatients]
  );
  const navigation = useNavigation();
  const [fontLoaded] = useFonts({
    B: require('../assets/fonts/bold.ttf'),
    E: require('../assets/fonts/exbold.ttf'),
    H: require('../assets/fonts/heavy.ttf'),
  });

  const [refreshing, setRefreshing] = useState(true);
  const [search, setSearch] = useState('');
  const [masterData, setMasterData] = useState(patients);
  const [filteredData, setFilteredData] = useState(patients);
  const [cloudData, setCloudData] = useState('');

  useEffect(() => {
    getAllDataFromCloud();
  }, []);

  /*
   *  Description:   Populate Realm DB when cloudData variable changes 
                     which happens when we fetch data from DynamoDB
   *  Inputs:   No inputs required
   *  Output:   No output
   */
  useEffect(() => {
    populateRealmDB();
  }, [cloudData]);

  /*
   *  Description:   Fetch/Read Patients' data from DynamoDB and set it to cloudData variable
   *  Inputs:   No inputs required
   *  Output:   No output
   */
  const getAllDataFromCloud = () => {
    fetchAllPatientsDynamoDB().then((data) => setCloudData(data));
    setRefreshing(false);
  };
  /*
   *  Description:   This methods populates the local Realm database with DynamoDB data
   *  Inputs:   No inputs required
   *  Output:   No output
   */
  const populateRealmDB = () => {
    try {
      realm?.write(() => {
        if (cloudData) {
          cloudData?.forEach((patient) => {
            const q = `patientID == '${patient?.patientID}'`;
            const exists = realm?.objects('Patients').filtered(q);

            // If patients does not exist in Realm, create a new one
            if (!exists.length) {
              realm.create(
                'Patients',
                new Patients({
                  patientID: patient.patientID,
                  name: patient.name,
                  birthdate: patient.birthdate,
                  email: patient.email,
                  phone: patient.phone,
                  bloodPressure: patient.vitals.bloodPressure,
                  heartrate: patient.vitals.heartRate,
                  temperature: patient.vitals.temperature,
                })
              );
            }
          });
        }
      });
    } catch (e) {
      Alert.alert('Error Populating Realm', e.message);
    }
  };

  /*
   *  Description:   Method for finding data from keywords, i.e. names and emails
   *  Inputs:   Query paremeter of type String
   *  Output:   No output
   */
  const searchFilter = (query) => {
    if (query) {
      const newData = masterData.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(newData);
      setSearch(query);
    } else {
      setFilteredData(masterData);
      setSearch(query);
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
          <View style={styles.formContent}>
            <View style={styles.inputContainer}>
              <Icon name="search" type="feather" style={{ marginLeft: '3%' }} />
              <TextInput
                style={styles.inputs}
                value={search}
                placeholder="Search names"
                underlineColorAndroid="transparent"
                onChangeText={(value) => searchFilter(value)}
              />
            </View>
          </View>

          <FlatList
            style={styles.notificationList}
            data={filteredData}
            keyExtractor={(patient) => patient?._id?.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getAllDataFromCloud}
              />
            }
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={[styles.card, { borderColor: '#C689C6' }]}
                  onPress={() => {
                    navigation.navigate('Profile', {
                      patient: {
                        _id: item._id.toString(),
                        patientID: item.patientID,
                        name: item.name,
                        birthdate: item.birthdate,
                        email: item.email,
                        phone: item.phone,
                        status: item.status,
                        bloodPressure: item.bloodPressure,
                        heartrate: item.heartrate,
                        temperature: item.temperature,
                        respiratoryRate: item.respiratoryRate,
                        pulseOximetry: item.pulseOximetry,
                      },
                    });
                  }}
                >
                  <View style={styles.cardContent}>
                    <Text style={styles.id}>#{item?._id?.toString()}</Text>
                  </View>
                  <View style={styles.cardContent}>
                    <Image
                      style={[styles.image, styles.imageContent]}
                      source={require('../assets/patient2.png')}
                    />

                    <Text style={styles.name}>{item?.name}</Text>
                  </View>
                  <View style={[styles.cardContent, styles.tagsContent]}>
                    <Tags item={item} />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ImageBackground>
        <Nav />
      </View>
    );
  } else {
    return <View></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: '5%',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  notificationList: {
    marginVertical: 20,
    padding: 10,
    paddingHorizontal: '5%',
  },
  card: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth: 40,
    marginBottom: 20,
    borderRadius: 15,
  },
  cardContent: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  tagsContent: {
    marginTop: 20,
    flexWrap: 'wrap',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  id: {
    fontSize: 15,
    marginLeft: 80,
    alignSelf: 'center',
    marginTop: -60,
  },
});
