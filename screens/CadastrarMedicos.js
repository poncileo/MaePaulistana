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
} from 'react-native';

import {Button} from 'native-base';

const CadastrarMedicos: () => React$Node = ({navigation}) => {
  React.useEffect(() => {
    console.log(medicos.length);
    // medicos.forEach((item) => {
    //   cadastrarMedicos(item.Nome, item.CRM);
    // });
  }, []);

  const salvarCadastro = () => {
    if (Name === '' || CRM === '') {
      setErrorMessage('Todos os campos são obrigatórios!');
    } else {
      cadastrarMedicos(item.Nome, item.CRM)
        .then((result) => {
          setId(null);
          setName('');
          setDOB('');
          setDUM('');
          setDPP('');
          setSisPreNatal('');
          setSUS('');
          showSuccessAlert();
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

const styles = StyleSheet.create({});

export default CadastrarMedicos;
