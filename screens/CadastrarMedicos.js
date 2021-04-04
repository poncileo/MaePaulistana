/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import database from '@react-native-firebase/database';
import {cadastrarMedicos} from '../src/services/apiService';
//import {medicos} from './Medicos.js';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import {Button} from 'native-base';

const CadastrarMedicos: () => React$Node = ({navigation}) => {
  const [Id, setId] = React.useState();
  const [Name, setName] = React.useState('');
  const [CRM, setCRM] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState('');

  const salvarCadastro = () => {
    if (Name === '' || CRM === '') {
      setErrorMessage('Todos os campos são obrigatórios!');
    } else {
      cadastrarMedicos(Id, Name, CRM)
        .then((result) => {
          setId(null);
          setName('');
          setCRM('');
          showSuccessAlert();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const showSuccessAlert = () => {
    setErrorMessage('');
    Alert.alert('', 'Cadastro efetuado com sucesso!');
    navigation.goBack();
  };

  return (
    <>
      <View style={{height: '100%', backgroundColor: '#fff'}}>
        <View style={styles.InputsContainer}>
          <TextInput
            style={styles.TextInput}
            placeholder="Nome"
            value={Name}
            onChangeText={(Name) => setName(Name)}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="CRM"
            value={CRM}
            onChangeText={(CRM) => setCRM(CRM)}
          />
          <Text style={{color: '#ff0000'}}>{errorMessage}</Text>
        </View>
        <View style={styles.ButtonContainer}>
          <Button
            style={[styles.Button, styles.ButtonCancelar]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.ButtonText}>Cancelar</Text>
          </Button>
          <Button
            style={[styles.Button, styles.ButtonCadastrar]}
            onPress={salvarCadastro}>
            <Text style={styles.ButtonText}>Cadastrar</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  InputsContainer: {
    height: '90%',
  },
  TextInput: {
    padding: 10,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#f1f1f1',
  },
  ButtonContainer: {
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    justifyContent: 'space-evenly',
  },
  Button: {
    padding: 10,
    width: '45%',
    display: 'flex',
    justifyContent: 'center',
  },
  ButtonCadastrar: {
    backgroundColor: '#666666',
  },
  ButtonCancelar: {
    backgroundColor: '#666666',
  },
  ButtonText: {
    textTransform: 'uppercase',
    color: '#fff',
  },
});

export default CadastrarMedicos;
