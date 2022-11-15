import {StyleSheet, Text, View, Image, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Login';

const Profile = ({navigation}) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    const res = await fetch('https://www.melivecode.com/api/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    });
    const data = await res.json();
    if (data.status === 'forbidden') {
      navigation.navigate('Login');
    }
    setUser(data.user);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [isLoading]);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.profileContainer}>
          <Image style={styles.imgAvatar} source={{uri: user.avatar}} />
          <View style={{marginTop: 15}}>
            <Text style={styles.textStyle}>
              {user.fname} {user.lname}
            </Text>
            <Text style={styles.textStyle}>{user.email}</Text>
          </View>
        <View style={{marginTop: 15}}>
        <Button  onPress={fetchUser} title="Reload" />
        </View>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imgAvatar: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    marginTop: 20
  },
  textStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
