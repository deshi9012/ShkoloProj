import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Provider, useDispatch} from "react-redux";
import * as Facebook from "expo-facebook";
import {addUser} from "../store/actions/user";

export default function LoginScreen(props) {
  const dispatch = useDispatch();
  async function logIn() {
    try {
      await Facebook.initializeAsync('731061227544870');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const user = await response.json();
        console.log(user);

        dispatch(addUser(user));
        props.navigation.navigate('Timeline');

        // Alert.alert('Logged in!', `Hi ${user.name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({message}) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.loginBtn} onPress={logIn}>
        <Text style={{color: "#fff"}}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ebee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20
  },
  logoutBtn: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: "absolute",
    bottom: 0
  },
});