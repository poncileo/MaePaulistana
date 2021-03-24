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
  
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';
import { Button, Header, Container, Content, Icon, ListItem, Label, Body } from 'native-base';

const FinalizarAcompanhamento: () => React$Node = ({navigation}) => {

  const [SelectedGestante, setSelectedGestante] = React.useState('');
  const [Gestantes, setGestantes] = React.useState([]);
  const [FilteredGestantes, setFilteredGestantes] = React.useState([]);
  const [TextPesquisa, setTextPesquisa] = React.useState('');
  const [ListIsActive, setListIsActive] = React.useState(false);

  React.useEffect(() => {
    const getGestantes = async () => {
      const gestantes = await listarGestantes();
      setGestantes(gestantes);
    }
    getGestantes();
  }, []);
  
  React.useEffect(() => {
    if(FilteredGestantes.length === 0){
      setFilteredGestantes([...Gestantes]);
    }
  },[Gestantes])

  React.useEffect(() => {
    if(TextPesquisa === '') {
      setFilteredGestantes([...Gestantes]);
    } else {
      const filtrados = FilteredGestantes.filter((item) => {
        return item.Name.includes(TextPesquisa);
      });
  
      setFilteredGestantes([...filtrados]);

    }
  }, [TextPesquisa])

  const handleListIsActive = () => {
    ListIsActive === false ? setListIsActive(true) : setListIsActive(false);
  }
  const handleSelectedGestante = (itemName) => {
    setTextPesquisa(itemName);
    setListIsActive(false);
  }
  
  return (
    <>
      <Container>
        <Content>
        <TextInput placeholder="Gestante..." value={TextPesquisa} onChangeText={text => setTextPesquisa(text)} onFocus={handleListIsActive} />
        {ListIsActive && 
          <ScrollView>
          {FilteredGestantes.map((item, index) => (
            <ListItem key={item.Id}> 
              <Body>
                <Text onPress={() => handleSelectedGestante(item.Name)}>{item.Name}</Text>
              </Body>
            </ListItem>
          ))}
          </ScrollView>
        }
        <Label>Motivo:</Label>
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
});

export default FinalizarAcompanhamento;
