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
import { Button, Header, Container, Content, Right, Title, Left, Body, ListItem } from 'native-base';

const Gestantes: () => React$Node = ({navigation}) => {

  const [Gestantes, setGestantes] = React.useState([]);
  const [filteredGestantes, setFilteredGestantes] = React.useState([]);
  const [TextPesquisa, setTextPesquisa] = React.useState('');

  React.useEffect(() => {
    const gestantesRef = database().ref('gestantes/');
    const OnLoadingListener = gestantesRef.on('value', (snapshot) => {
      setGestantes([]);
      snapshot.forEach(function (childSnapshot){
        setGestantes((Gestantes) => [...Gestantes, childSnapshot.val()]);
      });
    });
    
    setFilteredGestantes([...Gestantes]);

    return () => {
      gestantesRef.off('value', OnLoadingListener);
    }
  }, []);

  React.useEffect(() => {
    /*const filtrados = filteredGestantes.filter((item) => {
      return item.Name.includes(TextPesquisa);
    });
    console.log(filtrados);*/
    if(TextPesquisa !== '') {
      const filtrados = filteredGestantes.filter((item) => {
        return item.Name.includes(TextPesquisa);
      });
      setFilteredGestantes([...filtrados]);
    } else {
      setFilteredGestantes([...Gestantes]);
    }
  }, [TextPesquisa])

  /*const handlePesquisa = (event) => {
    setTextPesquisa(event);
    
    const filtrados = filteredGestantes.filter((item) => {
      return item.Name.includes(TextPesquisa);
    });
    setFilteredGestantes(filtrados);
  }*/
  
  return (
    <>
      <Container>
        <Content>
          <TextInput placeholder="Pesquisar" value={TextPesquisa} onChangeText={text => setTextPesquisa(text)} />
          <ScrollView>
          {filteredGestantes.map((item, index) => (
            <ListItem key={item.Id}  onPress={() => navigation.navigate('DetalhesGestante', {id: item.Id})}> 
              <Body>
                <Text>{'Nome: '}{item.Name}</Text>
                <Text>{'Dt. Nasc: '}{item.DOB}</Text>
              </Body>
            </ListItem>
          ))}
          </ScrollView>
          <Button style={styles.ButtonNovoRegistro} onPress={() => navigation.navigate('CadastrarGestantes')}>
            <Text style={styles.ButtonText}>Novo Cadastro</Text>
          </Button>
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#fff',
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
  }
});

export default Gestantes;
