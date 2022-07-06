import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useFonts } from 'expo-font';

/*
 *  Author:   Ovezmyrat Arnazarov
 *  Class Description:  UI Welcome component that displays a welcome page
 *
 */
export default function Welcome() {
  const navigation = useNavigation();
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
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontFamily: 'H', fontSize: 40, color: '#FFF' }}>
              <Text style={{ color: '#FBCACA' }}>Komek</Text>Health
            </Text>
            <Text style={styles.title}>
              Your best health analytics and monitoring tool
            </Text>
            <View style={{ marginTop: '10%' }}></View>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={styles.btn2}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.btnlabel2}>Login</Text>
                  <Icon
                    name="rightcircle"
                    type="ant-design"
                    color="#FFF"
                    style={{ textAlign: 'right' }}
                  ></Icon>
                </View>
              </View>
            </TouchableOpacity>
          </View>
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
  },
  title: {
    fontFamily: 'B',
    fontSize: 18,
    width: '70%',
    color: '#FFF',
    marginTop: 10,
  },
  btn2: {
    backgroundColor: `rgba(255, 255, 255, 0.1)`,
    paddingVertical: '5%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: '5%',
    paddingHorizontal: '10%',
    borderColor: `rgba(252, 219, 220, 0.5)`,
    borderWidth: 2,
  },
  btnlabel2: {
    fontFamily: 'H',
    fontSize: 20,
    textAlign: 'left',
    color: '#FFF',
  },
});
