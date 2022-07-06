import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import Nav from './components/Nav';

/*
 *  Author:   Ovezmyrat Arnazarov
 *  Class Description:  UI Profile component that displays a dashboard with patient data.
 *
 */
export default function Profile({ route }) {
  const navigation = useNavigation();

  const patient = route.params?.patient;

  const [fontLoaded] = useFonts({
    B: require('../assets/fonts/bold.ttf'),
    E: require('../assets/fonts/exbold.ttf'),
    H: require('../assets/fonts/heavy.ttf'),
  });

  if (fontLoaded) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/bg.png')}
          style={{ height: '100%', width: '100%' }}
          imageStyle={{ resizeMode: 'cover', alignSelf: 'flex-end' }}
        >
          <View
            style={{
              marginHorizontal: '7.5%',
              marginTop: '5%',
              marginBottom: 0,
              height: '60%',
            }}
          >
            <Image
              source={require('../assets/patient2.png')}
              style={styles.avatar}
            ></Image>

            <View style={{ marginTop: '5%' }}></View>

            {/* TITLE TEXT */}
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.mainTitle}>Hey, {patient?.name}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Edit', { patient: patient })
                }
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontFamily: 'E',
                      fontSize: 25,
                      color: '#e2e2e2',
                      lineHeight: 50,
                    }}
                  >
                    Update{' '}
                  </Text>
                  <Icon
                    name="chevron-circle-right"
                    type="font-awesome"
                    color="#e2e2e2"
                    size={20}
                    style={{ marginTop: '100%' }}
                  ></Icon>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: '5%' }}></View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                height: '45%',
              }}
            >
              {/* HEART RATE */}
              <LinearGradient
                colors={['#eaafc8', '#654ea3']}
                start={[1, 1]}
                end={[1, -0.3]}
                style={styles.heartRate}
              >
                <View style={styles.text}>
                  <Text style={styles.title}>Heart Rate</Text>
                </View>
                <Icon
                  name="heartbeat-alt"
                  type="fontisto"
                  color="#fff"
                  size={70}
                  style={{ marginVertical: '5%' }}
                ></Icon>
                <View
                  style={[styles.value, { justifyContent: 'space-around' }]}
                >
                  <Text
                    style={{ fontFamily: 'H', fontSize: 22, color: '#FFF' }}
                  >
                    {patient?.heartrate}
                  </Text>

                  <Icon
                    name="pulse"
                    type="fontisto"
                    color="#fff"
                    size={25}
                  ></Icon>
                </View>
              </LinearGradient>

              {/* TEMPERATURE */}

              <LinearGradient
                colors={['#d3cce3', '#e9e4f0']}
                start={[0, -0.6]}
                end={[0, 1.4]}
                style={styles.gradient}
              >
                <View style={styles.text}>
                  <Text style={styles.subtitle2}>Temperature</Text>
                </View>
                <Icon
                  name="thermometer-3"
                  type="font-awesome"
                  color="#937DC2"
                  size={50}
                  style={{ marginVertical: '5%' }}
                ></Icon>
                <View style={styles.value}>
                  <Text
                    style={{ fontFamily: 'H', fontSize: 22, color: '#937DC2' }}
                  >
                    {patient?.temperature}
                  </Text>
                </View>
              </LinearGradient>

              {/* BLOOD PRESSURE */}
              <LinearGradient
                colors={['#d3cce3', '#e9e4f0']}
                start={[0, -0.6]}
                end={[0, 1.4]}
                style={styles.gradient}
              >
                <View style={styles.text}>
                  <Text style={styles.subtitle2}>Blood Pressure</Text>
                </View>
                <Icon
                  name="blood-drop"
                  type="fontisto"
                  color="#937DC2"
                  size={40}
                  style={{ marginVertical: '5%' }}
                ></Icon>
                <View style={styles.value}>
                  <Text
                    style={{ fontFamily: 'H', fontSize: 22, color: '#937DC2' }}
                  >
                    {patient?.bloodPressure}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Respiratory */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: '7.5%',
              paddingVertical: 0,
              marginTop: 0,
              height: '20%',
            }}
          >
            <LinearGradient
              // View Linear Gradient
              colors={['#d3cce3', '#e9e4f0']}
              start={[0, -0.6]}
              end={[0, 1.4]}
              style={styles.gradientTwo}
            >
              <ImageBackground
                source={require('../assets/respiratory.png')}
                style={styles.imgBg}
                imageStyle={{ resizeMode: 'contain', opacity: 0.1 }}
              >
                <Text style={styles.textTwo}>Respiratory Rate</Text>
                <Text style={styles.valueTwo}>{patient?.respiratoryRate}</Text>
              </ImageBackground>
            </LinearGradient>

            {/* Pulse Oximetry */}
            <LinearGradient
              // View Linear Gradient
              colors={['#d3cce3', '#e9e4f0']}
              start={[0, -0.6]}
              end={[0, 1.4]}
              style={styles.gradientTwo}
            >
              <ImageBackground
                source={require('../assets/O2.png')}
                style={styles.imgBg}
                imageStyle={{ resizeMode: 'contain', opacity: 0.08 }}
              >
                <Text style={styles.textTwo}>Pulse Oximetry</Text>
                <Text style={styles.valueTwo}>{patient?.pulseOximetry}</Text>
              </ImageBackground>
            </LinearGradient>
          </View>
        </ImageBackground>

        {/* NAV PANEL */}
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
  mainTitle: {
    fontFamily: 'H',
    fontSize: 35,
    color: '#e2e2e2',
    lineHeight: 45,
  },
  heartRate: {
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 1,
    width: '30%',
    paddingVertical: '3%',
    justifyContent: 'space-around',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: 'cover',
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: '#efefef',
  },
  title: {
    fontFamily: 'H',
    fontSize: 18,
    textAlign: 'left',
    color: '#FFD6D6',
  },
  subtitle2: {
    fontFamily: 'E',
    color: '#937DC2',
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    paddingTop: '5%',
  },
  textTwo: {
    fontFamily: 'H',
    fontSize: 20,
    textAlign: 'center',
    color: '#937DC2',
  },
  value: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  valueTwo: {
    fontFamily: 'H',
    fontSize: 30,
    textAlign: 'center',
    color: '#937DC2',
  },
  gradient: {
    paddingVertical: '5%',
    width: '30%',
    marginLeft: '3%',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    justifyContent: 'space-between',
    elevation: 10,
    borderRadius: 15,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  gradientTwo: {
    paddingVertical: '5%',
    width: '45%',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 15,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  imgBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
});
