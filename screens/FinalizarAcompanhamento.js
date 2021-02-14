/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import database from '@react-native-firebase/database';
  
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Button, Header, Container, Content, Icon } from 'native-base';

const FinalizarAcompanhamento: () => React$Node = ({navigation}) => {
  
  return (
    <>
      <Container>
        <Header>
          <Button transparent icon>
            <Icon name="arrow-back"/>
          </Button>
        </Header>
        <Content>
          <Text>Consultas</Text>
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
});

export default FinalizarAcompanhamento;
