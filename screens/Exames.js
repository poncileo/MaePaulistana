/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import database from '@react-native-firebase/database';
import {listarExames} from '../src/services/apiService';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {
  Button,
  Header,
  Container,
  Content,
  Icon,
  Label,
  ListItem,
  Body,
} from 'native-base';

const Exames: () => React$Node = ({navigation}) => {
  const [Exames, setExames] = React.useState([]);

  React.useEffect(() => {
    const getExames = async () => {
      const exames = await listarExames();
      setExames(exames);
    };
    getExames();
  }, []);

  return (
    <>
      <View>
        <View style={styles.scrollContainer}>
          <Label style={styles.label}>Exames 1º Trimestre</Label>
          <ScrollView style={styles.scroll}>
            {Exames.map((item, index) => {
              if (item.trimestre == '1')
                return (
                  <ListItem key={item.Id}>
                    <Body>
                      <Text>{item.nome}</Text>
                      <Text>{item.categoria}</Text>
                    </Body>
                  </ListItem>
                );
            })}
          </ScrollView>
        </View>
        <View style={styles.scrollContainer}>
          <Label style={styles.label}>Exames 2º Trimestre</Label>
          <ScrollView style={styles.scroll}>
            {Exames.map((item, index) => {
              if (item.trimestre == '2')
                return (
                  <ListItem key={item.Id}>
                    <Body>
                      <Text>{item.nome}</Text>
                      <Text>{item.categoria}</Text>
                    </Body>
                  </ListItem>
                );
            })}
          </ScrollView>
        </View>
        <View style={styles.scrollContainer}>
          <Label style={styles.label}>Exames 3º Trimestre</Label>
          <ScrollView style={styles.scroll}>
            {Exames.map((item, index) => {
              if (item.trimestre == '3')
                return (
                  <ListItem key={item.Id}>
                    <Body>
                      <Text>{item.nome}</Text>
                      <Text>{item.categoria}</Text>
                    </Body>
                  </ListItem>
                );
            })}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: '32%',
    borderBottomWidth: 1,
    borderColor: '#cecece',
  },
  label: {
    margin: 10,
  },
  scroll: {
    backgroundColor: '#fff',
  },
});

export default Exames;
