/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';

import database from '@react-native-firebase/database';
  
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import { Button } from 'native-base';

const Home: () => React$Node = ({navigation}) => {
  
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Gestantes')}>
              <Text style={styles.sectionTitle}>Gestantes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Consultas')}>
              <Text style={styles.sectionTitle}>Lançar Consultas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Vacinas')}>
              <Text style={styles.sectionTitle}>Vacinas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Exames')}>
              <Text style={styles.sectionTitle}>Exames</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FinalizarAcompanhamento')}>
              <Text style={styles.sectionTitle}>Finalizar Acompanhamento</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  button: {
    color: Colors.dark,
    marginTop: 32,
    paddingHorizontal: 24,
    paddingVertical: 25,
    borderColor: '#ddd',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#eee'
  }
});

export default Home;
