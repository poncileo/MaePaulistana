/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Header, Container, Content, Right, Title, Left, Body, Label } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import { format } from 'date-fns';
import { cadastrarGestante } from '../src/services/apiService';

const brLocale = require('date-fns/locale/pt-BR');

const CadastrarGestantes: () => React$Node = ({navigation}) => {

  const [Id, setId] = React.useState();
  const [Name, setName] = React.useState('');
  const [DOB, setDOB] = React.useState();
  const [ShowDOB, setShowDOB] = React.useState(false);
  const [DUM, setDUM] = React.useState();
  const [DPP, setDPP] = React.useState();
  const [SisPreNatal, setSisPreNatal] = React.useState('');
  const [SUS, setSUS] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const salvarCadastro = () => {
    if( Name === '' || DOB === '' || DUM === '' || DPP === '' || SisPreNatal === '' || SUS === '' ){
      setErrorMessage('Todos os campos são obrigatórios!');
    } else {
      cadastrarGestante(Id, Name, DOB, DUM, DPP, SisPreNatal, SUS )
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
  }

  const showSuccessAlert = () => {
    setErrorMessage('');
    Alert.alert('','Cadastro efetuado com sucesso!');
  }

  const onChangeDOB = (event, selectedDOB) => {
    const currentDate = selectedDOB || DOB;
    setShowDOB(Platform.OS === 'ios')
    setDOB(currentDate);
  }

  const showDOBPicker = () => {
    setShowDOB(true);
  }
  
  return (
    <>
      <View style={{height: '100%', backgroundColor: '#fff'}}>
        <View style={styles.InputsContainer}>
          <TextInput style={styles.TextInput} placeholder="Nome" value={Name} onChangeText={Name => setName(Name)} />
          <TextInputMask style={styles.TextInput} value={DOB} type={'datetime'} options={{format: 'DD/MM/YYYY'}} placeholder="Data de Nascimento" onChangeText={DOB => setDOB(DOB)} />
          <TextInputMask style={styles.TextInput} value={DUM} type={'datetime'} options={{format: 'DD/MM/YYYY'}} placeholder="Data da Última Menstruação" onChangeText={DUM => setDUM(DUM)} />
          <TextInputMask style={styles.TextInput} value={DPP} type={'datetime'} options={{format: 'DD/MM/YYYY'}} placeholder="Data prevista para o Parto" onChangeText={DPP => setDPP(DPP)} />
          <TextInput style={styles.TextInput} placeholder="Nº SIS Pré Natal" value={SisPreNatal} onChangeText={SisPreNatal => setSisPreNatal(SisPreNatal)} />
          <TextInput style={styles.TextInput} placeholder="Nº SUS" value={SUS} onChangeText={SUS => setSUS(SUS)} />
          <Text style={{color: '#ff0000'}}>{errorMessage}</Text>
        </View>
        <View style={styles.ButtonContainer}>
            <Button style={[styles.Button, styles.ButtonCancelar]} onPress={() => navigation.goBack()}>
              <Text style={styles.ButtonText}>Cancelar</Text>
            </Button>
            <Button style={[styles.Button, styles.ButtonCadastrar]} onPress={salvarCadastro}>
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
    backgroundColor: '#f1f1f1'
  },
  ButtonContainer: {
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    justifyContent: 'space-evenly'
  },
  Button: {
    padding: 10,
    width: '45%',
    display: 'flex',
    justifyContent: 'center'
  },
  ButtonCadastrar: {
    backgroundColor: '#666666',
  },
  ButtonCancelar: {
    backgroundColor: '#666666',
  },
  ButtonText: {
    textTransform: 'uppercase',
    color: '#fff'
  }
});

export default CadastrarGestantes;
