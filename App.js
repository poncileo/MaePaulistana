/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import database from '@react-native-firebase/database';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import {
  Home,
  Gestantes,
  CadastrarGestantes,
  DetalhesGestante,
  Consultas,
  Vacinas,
  Exames,
  Medicos,
  CadastrarMedicos,
  DetalhesMedico,
  FinalizarAcompanhamento,
  PessoasFisicas,
} from './screens';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App: () => React$Node = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerTitle: 'Mãe Paulistana'}}
        />
        <Stack.Screen
          name="Gestantes"
          component={Gestantes}
          options={({navigation}) => ({
            headerTitle: 'Gestantes',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('CadastrarGestantes')}>
                <Icon
                  name="person-add"
                  size={30}
                  color="#000"
                  style={{marginHorizontal: 10}}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="DetalhesGestante"
          component={DetalhesGestante}
          options={{
            headerTitle: 'Detalhes',
          }}
        />
        <Stack.Screen
          name="CadastrarGestantes"
          component={CadastrarGestantes}
          options={{
            headerTitle: 'Cadastro',
          }}
        />
        <Stack.Screen
          name="Medicos"
          component={Medicos}
          options={({navigation}) => ({
            headerTitle: 'Médicos',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('CadastrarMedicos')}>
                <Icon
                  name="person-add"
                  size={30}
                  color="#000"
                  style={{marginHorizontal: 10}}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="DetalhesMedico"
          component={DetalhesMedico}
          options={{
            headerTitle: 'Detalhes',
          }}
        />
        <Stack.Screen
          name="CadastrarMedicos"
          component={CadastrarMedicos}
          options={{
            headerTitle: 'Cadastro',
          }}
        />
        <Stack.Screen
          name="Consultas"
          component={Consultas}
          options={{
            headerTitle: 'Lançar Consultas',
          }}
        />
        <Stack.Screen name="Vacinas" component={Vacinas} />
        <Stack.Screen name="Exames" component={Exames} />
        <Stack.Screen
          name="FinalizarAcompanhamento"
          component={FinalizarAcompanhamento}
          options={{headerTitle: 'Finalizar Acompanhamento'}}
        />
        <Stack.Screen
          name="PessoasFisicas"
          component={PessoasFisicas}
          options={{headerTitle: 'Pessoas Físicas'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
