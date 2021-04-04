/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {database} from '../Setup';
import {cadastrarMedicos} from '../src/services/apiService';
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
  const [CRM, setCRM] = React.useState('');

  React.useEffect(() => {
    const medicosRef = database().ref(`medicos/${route.params.id}`);
    medicosRef.on('value', (snapshot) => {
      const medico = snapshot.val();
      setId(medico.Id);
      setName(medico.Name);
      setCRM(medico.CRM);
    });
  }, []);

  const salvarCadastro = () => {
    cadastrarMedicos(Id, Name, CRM)
      .then((result) => {
        setId(Id);
        setName(Name);
        setCRM(CRM);
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
            <Text>CRM:</Text>
            <TextInput
              style={styles.InputField}
              value={CRM}
              onChangeText={(text) => setCRM(text)}
              editable={isEditing}
            />
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
