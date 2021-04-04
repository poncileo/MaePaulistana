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
  Modal,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Button,
  Header,
  Container,
  Content,
  ListItem,
  Label,
  Body,
} from 'native-base';

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
    };
    getGestantes();
  }, []);

  React.useEffect(() => {
    if (FilteredGestantes.length === 0) {
      setFilteredGestantes([...Gestantes]);
    }
  }, [Gestantes]);

  React.useEffect(() => {
    if (TextPesquisa === '') {
      setFilteredGestantes([...Gestantes]);
    } else {
      const filtrados = FilteredGestantes.filter((item) => {
        return item.Name.includes(TextPesquisa);
      });

      setFilteredGestantes([...filtrados]);
    }
  }, [TextPesquisa]);

  const showList = () => {
    setListIsActive(true);
  };

  const hideList = () => {
    setListIsActive(false);
  };

  const handleSelectedGestante = (itemName) => {
    setTextPesquisa(itemName);
    setListIsActive(false);
  };

  return (
    <>
      <View>
        <View>
          <TouchableOpacity onPress={showList}>
            <TextInput
              style={styles.SearchInput}
              placeholder="Gestante..."
              value={TextPesquisa}
              editable={false}
            />
          </TouchableOpacity>
          <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={ListIsActive}
              onRequestClose={() => {
                setListIsActive(!ListIsActive);
              }}>
              <View style={styles.buttonCloseContainer}>
                <Button
                  style={styles.buttonCloseModal}
                  onPress={() => setListIsActive(!ListIsActive)}>
                  <Icon name="close" size={25} color="#595959" />
                </Button>
              </View>
              <TextInput
                pointerEvents="none"
                style={styles.SearchInput}
                placeholder="Gestante..."
                value={TextPesquisa}
                onChangeText={(text) => setTextPesquisa(text)}
                onFocus={showList}
              />
              <ScrollView style={styles.ListContainer}>
                {FilteredGestantes.map((item, index) => (
                  <ListItem key={item.Id}>
                    <Body>
                      {/* <Text onPress={() => handleSelectedGestante(item.Name)}>{item.Name}</Text> */}
                      <Text onPress={() => handleSelectedGestante(item.Name)}>
                        {item.Name}
                      </Text>
                    </Body>
                  </ListItem>
                ))}
              </ScrollView>
            </Modal>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  SearchInput: {
    backgroundColor: '#ffff',
  },
  ListContainer: {
    backgroundColor: '#f1f1f1',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#ede3f2',
    padding: 100,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7021a',
    padding: 100,
  },
  buttonCloseContainer: {
    backgroundColor: '#f1f1f1',
  },
  buttonCloseModal: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-end',
    margin: 10,
    padding: 5,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
});

export default FinalizarAcompanhamento;
