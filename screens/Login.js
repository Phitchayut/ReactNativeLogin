import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch('https://www.melivecode.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresIn: 100000
      })
    })

    const data = await res.json()
    if(data.status === 'ok') {
      await AsyncStorage.setItem('@accessToken', data.accessToken)
      const accessToken = await AsyncStorage.getItem('@accessToken')
      navigation.navigate('Profile')
    } else {
      Alert.alert(
        "Login Fail",
        "Username หรือ Password ผิด",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.imgLogo}
          source={{
            uri: 'https://www.pngall.com/wp-content/uploads/2016/06/Superman-Logo-Free-Download-PNG.png',
          }}
        />
      </View>
      <View style={styles.inputStyle}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={{marginTop: 5}}
          label="Password"
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button mode="contained" onPress={handleLogin}>
          Login
        </Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  imgLogo: {
    width: 200,
    height: 187,
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    alignSelf: 'center',
  },
  inputStyle: {
    paddingBottom: 14,
  },
  buttonStyle: {
    width: '50%',
    alignSelf: 'center',
  },
});
