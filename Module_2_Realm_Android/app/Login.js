import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useFonts } from 'expo-font';
import adminCredentials from '../config/env';

/*
 *  Author:   Ovezmyrat Arnazarov
 *  Class Description:  UI Login component that displays Login screen and checks for authentication
 *
 */
export default function Login() {
  const navigation = useNavigation();
  const [fontLoaded] = useFonts({
    B: require('../assets/fonts/bold.ttf'),
    E: require('../assets/fonts/exbold.ttf'),
    H: require('../assets/fonts/heavy.ttf'),
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /*
   *  Description:   Authenticates an admin
   *  Inputs:   No inputs required
   *  Output:   No output
   */
  const handleLogin = () => {
    if (
      email === adminCredentials.ADMIN_USERNAME &&
      password === adminCredentials.ADMIN_PASSWORD
    ) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Please enter a valid email address or password');
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
          <View
            style={{
              marginHorizontal: '7.5%',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'H',
                fontSize: 50,
                color: '#FFF',
                lineHeight: 55,
              }}
            >
              Welcome Back
            </Text>
            <View
              style={{ marginTop: '5%', justifyContent: 'space-evenly' }}
            ></View>
            <View style={styles.inputWrapper}>
              <View style={{ width: '90%' }}>
                <Text style={{ fontFamily: 'E', color: '#FAD8D8' }}>
                  Email address
                </Text>
                <TextInput
                  onChangeText={(value) => setEmail(value)}
                  placeholder="admin@domain.com"
                  style={{ fontFamily: 'B', color: '#FFF', fontSize: 20 }}
                  placeholderTextColor="#FAD8D8"
                ></TextInput>
              </View>
              <Icon
                name="email"
                type="material"
                color="#FAD8D8"
                size={35}
                style={{ textAlign: 'right' }}
              ></Icon>
            </View>

            <View style={styles.inputWrapper}>
              <View style={{ width: '90%' }}>
                <Text style={{ fontFamily: 'E', color: '#FAD8D8' }}>
                  Password
                </Text>
                <TextInput
                  onChangeText={(value) => setPassword(value)}
                  secureTextEntry
                  placeholder="******"
                  style={{ fontFamily: 'B', color: '#FFF', fontSize: 20 }}
                  placeholderTextColor="#FAD8D8"
                ></TextInput>
              </View>
              <Icon
                name="eye"
                type="ant-design"
                color={`rgba(250, 216, 216, 0.5)`}
                size={35}
                style={{ textAlign: 'right' }}
              ></Icon>
            </View>

            <TouchableOpacity onPress={handleLogin}>
              <View style={styles.btn}>
                <Text style={styles.btnlabel}>Admin Login</Text>
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
    backgroundColor: '#F04D4E',
  },
  inputWrapper: {
    marginTop: '5%',
    backgroundColor: `rgba(252, 219, 220, 0.2)`,
    borderRadius: 15,
    marginHorizontal: '5%',
    paddingHorizontal: '5%',
    paddingVertical: '1.5%',
    flexDirection: 'row',
  },
  btnlabel: {
    fontFamily: 'H',
    fontSize: 27,
    textAlign: 'center',
    color: '#fff',
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: `rgba(255, 255, 255, 0.4)`,
    paddingVertical: '3%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: '5%',
    paddingHorizontal: '5%',
    borderColor: `rgba(252, 219, 220, 0.5)`,
    borderWidth: 2,
  },
});
