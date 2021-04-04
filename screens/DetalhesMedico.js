/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {database} from '../Setup';
import {cadastrarGestante} from '../src/services/apiService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {
  Button,
  Header,
  Container,
  Content,
  Right,
  Title,
  Left,
  Body,
  ListItem,
} from 'native-base';

const DetalhesMedico: () => React$Node = ({navigation, route}) => {
  const [Id, setId] = React.useState();
  const [isEditing, setIsEditing] = React.useState(false);
  const [Name, setName] = React.useState('');
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
      setId(gestante.Id);
      setName(gestante.Name);
      setDOB(gestante.DOB);
      setDUM(gestante.DUM);
      setDPP(gestante.DPP);
      setSisPreNatal(gestante.SisPreNatal);
      setSUS(gestante.SUS);
      setQntConsultas(gestante.QntConsultas);
    });
  }, []);

  const salvarCadastro = () => {
    cadastrarGestante(Id, Name, DOB, DUM, DPP, SisPreNatal, SUS)
      .then((result) => {
        setId(gestante.Id);
        setName(gestante.Name);
        setDOB(gestante.DOB);
        setDUM(gestante.DUM);
        setDPP(gestante.DPP);
        setSisPreNatal(gestante.SisPreNatal);
        setSUS(gestante.SUS);
        setQntConsultas(gestante.QntConsultas);
        setIsEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container>
        <Content style={{backgroundColor: '#fff'}}>
          <View style={styles.EditarContainer}>
            <Button
              onPress={() => setIsEditing(true)}
              style={
                isEditing ? styles.ButtonEditarInativo : styles.ButtonEditar
              }
              disabled={isEditing}>
              <Icon name="edit" size={20} color="#FFF" />
              <Text style={styles.ButtonText}>Editar</Text>
            </Button>
          </View>
          <View style={styles.FieldsContainer}>
            <Text>Nome:</Text>
            <TextInput
              style={styles.InputField}
              value={Name}
              onChangeText={(text) => setName(text)}
              editable={isEditing}
            />
          </View>
          <View style={styles.FieldsContainer}>
            <Text>Data de Nascimento:</Text>
            <TextInputMask
              style={styles.InputField}
              value={DOB}
              type={'datetime'}
              options={{format: 'DD/MM/YYYY'}}
              onChangeText={(text) => setDOB(text)}
              editable={isEditing}
            />
          </View>
          <View style={styles.FieldsContainer}>
            <Text>Data da Última Menstruação:</Text>
            <TextInputMask
              style={styles.InputField}
              value={DUM}
              type={'datetime'}
              options={{format: 'DD/MM/YYYY'}}
              onChangeText={(text) => setDUM(text)}
              editable={isEditing}
            />
          </View>
          <View style={styles.FieldsContainer}>
            <Text>Data Prevista para o Parto:</Text>
            <TextInputMask
              style={styles.InputField}
              value={DPP}
              type={'datetime'}
              options={{format: 'DD/MM/YYYY'}}
              onChangeText={(text) => setDPP(text)}
              editable={isEditing}
            />
          </View>
          <View style={styles.FieldsContainer}>
            <Text>Nº SIS Pré Natal:</Text>
            <TextInput
              style={styles.InputField}
              value={SisPreNatal}
              onChangeText={(text) => setSisPreNatal(text)}
              editable={isEditing}
            />
          </View>
          <View style={styles.FieldsContainer}>
            <Text>Nº SUS:</Text>
            <TextInput
              style={styles.InputField}
              value={SUS}
              onChangeText={(text) => setSUS(text)}
              editable={isEditing}
            />
          </View>
          <View style={styles.FieldsContainer}>
            <Text>Quantidade de consultas atendidas:</Text>
            <Text>{QntConsultas}</Text>
          </View>
          {isEditing && (
            <View style={styles.ButtonContainer}>
              <Button
                style={[styles.Button, styles.ButtonCancelar]}
                onPress={() => setIsEditing(false)}>
                <Text style={styles.ButtonText}>Cancelar</Text>
              </Button>
              <Button
                style={[styles.Button, styles.ButtonCadastrar]}
                onPress={salvarCadastro}>
                <Text style={styles.ButtonText}>Salvar</Text>
              </Button>
            </View>
          )}
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#fff',
  },
  FieldsContainer: {
    padding: 5,
    marginBottom: 5,
  },
  InputField: {
    backgroundColor: '#f1f1f1',
  },
  EditarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  ButtonText: {
    textTransform: 'uppercase',
    color: '#fff',
  },
  ButtonContainer: {
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
  ButtonEditar: {
    backgroundColor: '#666',
    padding: 10,
    margin: 5,
  },
  ButtonEditarInativo: {
    backgroundColor: '#c1c1c1',
    padding: 10,
    margin: 5,
  },
});

export default DetalhesMedico;
