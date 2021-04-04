/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {database} from '../Setup';
import {listarGestantes} from '../src/services/apiService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from 'react-native';
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

const Medicos: () => React$Node = ({navigation}) => {
  const [Gestantes, setGestantes] = React.useState([]);
  const [filteredGestantes, setFilteredGestantes] = React.useState([]);
  const [TextPesquisa, setTextPesquisa] = React.useState('');

  React.useEffect(() => {
    const getGestantes = async () => {
      const gestantes = await listarGestantes();
      setGestantes(gestantes);
    };
    getGestantes();
  }, []);

  React.useEffect(() => {
    if (filteredGestantes.length === 0) {
      setFilteredGestantes([...Gestantes]);
    }
  }, [Gestantes]);

  React.useEffect(() => {
    if (TextPesquisa === '') {
      setFilteredGestantes([...Gestantes]);
    } else {
      const filtrados = filteredGestantes.filter((item) => {
        return item.Name.includes(TextPesquisa);
      });

      setFilteredGestantes([...filtrados]);
    }
  }, [TextPesquisa]);

  return (
    <>
      <View style={styles.Content}>
        <View style={styles.searchContainer}>
          <Icon style={styles.searchIcon} name="search" size={25} />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar"
            value={TextPesquisa}
            onChangeText={(text) => setTextPesquisa(text)}
          />
        </View>
        <View style={styles.ListContainer}>
          <ScrollView>
            {filteredGestantes.length === 0 && (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
            {filteredGestantes.map((item, index) => (
              <ListItem
                bottomDivider={false}
                key={item.Id}
                onPress={() =>
                  navigation.navigate('DetalhesGestante', {id: item.Id})
                }>
                <Body style={styles.List}>
                  <Text>{item.Name}</Text>
                </Body>
              </ListItem>
            ))}
          </ScrollView>
        </View>
        <View style={styles.ButtonContainer}>
          <Button
            style={styles.ButtonNovoRegistro}
            onPress={() => navigation.navigate('CadastrarGestantes')}>
            <Text style={styles.ButtonText}>Novo Cadastro</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Content: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  searchContainer: {
    height: '20%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#f1f1f1',
    borderWidth: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 10,
    minHeight: 50,
    maxHeight: 50,
  },
  searchIcon: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: '#595959',
  },
  searchInput: {
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 0,
    margin: 5,
    fontSize: 16,
    height: '90%',
    width: '87%',
  },
  ListContainer: {
    height: '75%',
  },
  ButtonContainer: {
    justifyContent: 'flex-end',
    height: '10%',
  },
  ButtonNovoRegistro: {
    width: '100%',
    margin: 'auto',
    backgroundColor: '#666',
    display: 'flex',
    justifyContent: 'center',
  },
  ButtonText: {
    textTransform: 'uppercase',
    color: '#fff',
  },
});

export default Medicos;
