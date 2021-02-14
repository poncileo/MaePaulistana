/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {database} from '../Setup';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Header, Container, Content, Right, Title, Left, Body, ListItem } from 'native-base';

const DetalhesGestante: () => React$Node = ({navigation, route}) => {

  const [Id, setId] = React.useState();
  const [isEditing, setIsEditing] = React.useState(false);
  const [Nome, setNome] = React.useState('');
  const [newNome, setNewNome] = React.useState('');
  const [DOB, setDOB] = React.useState();
  const [DUM, setDUM] = React.useState();
  const [DPP, setDPP] = React.useState();
  const [SisPreNatal, setSisPreNatal] = React.useState('');
  const [SUS, setSUS] = React.useState('');
  const [QntConsultas, setQntConsultas] = React.useState();

  //setId(route.params.Id);
  React.useEffect(() => {
    const gestantesRef = database().ref(`gestantes/${route.params.id}`);
    gestantesRef.on('value', (snapshot) => {
      const gestante = snapshot.val();
      setNome(gestante.Name);
      setDOB(gestante.DOB);
      setDUM(gestante.DUM);
      setDPP(gestante.DPP);
      setSisPreNatal(gestante.SisPreNatal);
      setSUS(gestante.SUS)
      setQntConsultas(gestante.QntConsultas);
    });
  }, [])

  const salvarCadastro = () => {
    alert('alo');
  }
  
  return (
    <>
      <Container>
        <Content>
          <View style={styles.EditarContainer}>
            <Button onPress={() => setIsEditing(true)} style={isEditing ? styles.ButtonEditarInativo : styles.ButtonEditar} disabled={isEditing}>
              <Icon name="edit" size={20} color="#FFF"/>
              <Text style={styles.ButtonText}>Editar</Text>
            </Button>
          </View>
          <View>
            <Text>Nome:</Text>
            <TextInput value={Nome} onChangeText={text => setNome(text)} editable={isEditing} />
          </View>
          <View>
            <Text>Data de Nascimento:</Text>
            <TextInputMask value={DOB} type={'datetime'} options={{format: 'DD/MM/YYYY'}} 
            onChangeText={text => setDOB(text)} editable={isEditing} />
          </View>
          <View>
            <Text>Data da Última Menstruação:</Text>
            <TextInputMask value={DUM} type={'datetime'} options={{format: 'DD/MM/YYYY'}} 
            onChangeText={text => setDUM(text)} editable={isEditing} />
          </View>
          <View>
            <Text>Data Prevista para o Parto:</Text>
            <TextInputMask value={DPP} type={'datetime'} options={{format: 'DD/MM/YYYY'}} 
            onChangeText={text => setDPP(text)} editable={isEditing} />
          </View>
          <View>
            <Text>Nº SIS Pré Natal:</Text>
            <TextInput value={SisPreNatal} onChangeText={text => setSisPreNatal(text)} editable={isEditing} />
          </View>
          <View>
            <Text>Nº SUS:</Text>
            <TextInput value={SUS} onChangeText={text => setSUS(text)} editable={isEditing} />
          </View>
          <View>
            <Text>Quantidade de consultas atendidas:</Text>
            <Text>{QntConsultas}</Text>
          </View>
          {isEditing && <View style={styles.ButtonContainer}>
              <Button style={[styles.Button, styles.ButtonCancelar]} onPress={() => setIsEditing(false)}>
                <Text style={styles.ButtonText}>Cancelar</Text>
              </Button>
              <Button style={[styles.Button, styles.ButtonCadastrar]} onPress={salvarCadastro}>
                <Text style={styles.ButtonText}>Salvar</Text>
              </Button>
          </View>}
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#fff',
  },
  EditarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  ButtonNovoRegistro: {
    width: '100%',
    margin: 'auto',
    backgroundColor: '#666',
    display: 'flex',
    justifyContent: 'center'
  },
  ButtonText: {
    textTransform: 'uppercase',
    color: '#fff'
  },
  ButtonContainer: {
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
  },
  ButtonEditar: {
    backgroundColor: '#666',
    padding: 10,
    margin: 5
  },
  ButtonEditarInativo: {
    backgroundColor: '#c1c1c1',
    padding: 10,
    margin: 5
  }
});

export default DetalhesGestante;
