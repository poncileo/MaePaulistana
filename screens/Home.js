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
import {Button} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialDesignIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home: () => React$Node = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={{backgroundColor: '#fff', height: '100%'}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('PessoasFisicas')}>
              <MaterialIcon
                name="people"
                size={30}
                color="#000"
                style={styles.buttonIcon}
              />
              <Text style={styles.sectionTitle}>Pessoas Físicas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Consultas')}>
              <MaterialIcon
                name="assignment"
                size={30}
                color="#000"
                style={styles.buttonIcon}
              />
              <Text style={styles.sectionTitle}>Lançar Consultas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Vacinas')}>
              <MaterialDesignIcon
                name="needle"
                size={30}
                color="#000"
                style={styles.buttonIcon}
              />
              <Text style={styles.sectionTitle}>Vacinas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Exames')}>
              <MaterialIcon
                name="description"
                size={30}
                color="#000"
                style={styles.buttonIcon}
              />
              <Text style={styles.sectionTitle}>Exames</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('FinalizarAcompanhamento')}>
              <MaterialIcon
                name="person-remove"
                size={30}
                color="#000"
                style={styles.buttonIcon}
              />
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
    backgroundColor: '#fff',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#fff',
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
    marginTop: 20,
    marginHorizontal: 0,
    paddingHorizontal: 5,
    paddingVertical: 25,
    borderColor: '#ddd',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    paddingHorizontal: 10,
  },
});

export default Home;
