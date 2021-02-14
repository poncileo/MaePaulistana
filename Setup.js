/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyAhuvKT-S7DsWjC7nhipZynAR3IF7Yj9uw",
  authDomain: "maepaulistana-8c207.firebaseapp.com",
  databaseURL: "https://maepaulistana-8c207-default-rtdb.firebaseio.com",
  projectId: "maepaulistana-8c207",
  storageBucket: "maepaulistana-8c207.appspot.com",
  messagingSenderId: "408115008073",
  appId: "1:408115008073:web:8977e133a65f0822672598",
  measurementId: "G-F38GM5DNEN"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {database}

const Setup: () => React$Node = () => {
  
  return <App/>;
};

export default Setup;
