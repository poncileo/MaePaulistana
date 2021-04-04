/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {database} from '../Setup';
import {
  listarGestantes,
  listarExames,
  listarMedicos,
} from '../src/services/apiService';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {
  Button,
  Header,
  Container,
  Content,
  ListItem,
  Body,
  DatePicker,
  Label,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';

const Consultas: () => React$Node = ({navigation}) => {
  const [SelectedGestanteId, setSelectedGestanteId] = React.useState();
  const [SelectedGestanteName, setSelectedGestanteName] = React.useState('');
  const [Gestantes, setGestantes] = React.useState([]);
  const [FilteredGestantes, setFilteredGestantes] = React.useState([]);
  const [TextPesquisa, setTextPesquisa] = React.useState('');
  const [GestantesListIsActive, setGestantesListIsActive] = React.useState(
    false,
  );
  const [Exames, setExames] = React.useState([]);
  const [FilteredExames, setFilteredExames] = React.useState([]);
  const [CheckBoxList, setCheckBoxList] = React.useState([]);
  const [selectedExames, setSelectedExames] = React.useState([]);
  const [Checked, setChecked] = React.useState(false);
  const [selectedTrimestre, setSelectedTrimestre] = React.useState();

  const [SelectedMedicoId, setSelectedMedicoId] = React.useState();
  const [Medicos, setMedicos] = React.useState([]);
  const [FilteredMedicos, setFilteredMedicos] = React.useState([]);
  const [TextPesquisaMedicos, setTextPesquisaMedicos] = React.useState('');
  const [MedicosListIsActive, setMedicosListIsActive] = React.useState(false);
  const [dataConsulta, setDataConsulta] = React.useState(new Date());
  const [showDateConsulta, setShowDateConsulta] = React.useState(false);

  React.useEffect(() => {
    const getGestantes = async () => {
      const gestantes = await listarGestantes();
      setGestantes(gestantes);
    };

    const getExames = async () => {
      const exames = await listarExames();
      setExames(exames);
    };

    const getMedicos = async () => {
      const medicos = await listarMedicos();
      setMedicos(medicos);
    };
    getGestantes();
    getExames();
    getMedicos();
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
    setGestantesListIsActive(true);
  };

  const hideList = () => {
    setGestantesListIsActive(false);
  };

  const handleSelectedGestante = (itemId, itemName) => {
    setTextPesquisa(itemName);
    setSelectedGestanteId(itemId);
    setSelectedGestanteName(itemName);
    setGestantesListIsActive(false);
  };

  React.useEffect(() => {
    if (FilteredMedicos.length === 0) {
      setFilteredMedicos([...Medicos]);
    }
  }, [Medicos]);

  React.useEffect(() => {
    if (TextPesquisaMedicos === '') {
      setFilteredMedicos([...Medicos]);
    } else {
      const filtrados = FilteredMedicos.filter((item) => {
        return item.Name.toLowerCase().includes(
          TextPesquisaMedicos.toLowerCase(),
        );
      });

      setFilteredMedicos([...filtrados]);
      console.log(Medicos.length);
    }
  }, [TextPesquisaMedicos]);

  React.useEffect(() => {
    let filtered = Exames.filter((item) => item.trimestre == '1');

    setFilteredExames([...filtered]);
  }, [Exames]);

  React.useEffect(() => {
    let filtered = Exames.filter((item) => item.trimestre == selectedTrimestre);

    setFilteredExames([...filtered]);
  }, [selectedTrimestre]);

  React.useEffect(() => {
    const checkBoxList = FilteredExames.map((item) => ({
      Id: item.Id,
      nome: item.nome,
      categoria: item.categoria,
      trimestre: item.trimestre,
      checked: false,
    }));
    setCheckBoxList([...checkBoxList]);
  }, [FilteredExames]);

  React.useEffect(() => {
    console.log(selectedExames);
  }, [selectedExames]);

  const showMedicosList = () => {
    setMedicosListIsActive(true);
  };

  const hideMedicosList = () => {
    setMedicosListIsActive(false);
  };

  const handleSelectedMedico = (itemId, itemName) => {
    setTextPesquisaMedicos(itemName);
    setSelectedMedicoId(itemId);
    //setSelectedGestanteName(itemName);
    setMedicosListIsActive(false);
  };

  const onChangeDataConsulta = (event, selectedDate) => {
    const currentDate = selectedDate || dataConsulta;
    setDataConsulta(currentDate);
    setShowDateConsulta(false);
  };

  const showDatePicker = () => {
    setShowDateConsulta(true);
  };

  const onChangeValue = (selectedItem, index) => {
    const newData = FilteredExames.map((item) => {
      if (item.Id === selectedItem.Id) {
        return {...item, selected: !item.selected};
      }
      return {...item, selected: item.selected};
    });
    setFilteredExames(newData);
    console.log(FilteredExames);
  };

  const inserirConsulta = () => {
    const exames = FilteredExames.filter((item) => item.selected);
    const data = dataConsulta.toLocaleDateString('pt-BR');
    const dados = {
      idGestante: SelectedGestanteId,
      idMedico: SelectedMedicoId,
      dataConsulta: data,
    };
    console.log(dados);
  };

  return (
    <>
      <View>
        <View>
          <Label style={styles.label}>Gestante:</Label>
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
              visible={GestantesListIsActive}
              onRequestClose={() => {
                setGestantesListIsActive(!GestantesListIsActive);
              }}>
              <View style={styles.buttonCloseContainer}>
                <Button
                  style={styles.buttonCloseModal}
                  onPress={() =>
                    setGestantesListIsActive(!GestantesListIsActive)
                  }>
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
                      <Text
                        onPress={() =>
                          handleSelectedGestante(item.Id, item.Name)
                        }>
                        {item.Name}
                      </Text>
                    </Body>
                  </ListItem>
                ))}
              </ScrollView>
            </Modal>
          </View>
        </View>
        <View>
          <Label style={styles.label}>Médico:</Label>
          <TouchableOpacity onPress={showMedicosList}>
            <TextInput
              style={styles.SearchInput}
              placeholder="Médicos..."
              value={TextPesquisaMedicos}
              editable={false}
            />
          </TouchableOpacity>
          <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={MedicosListIsActive}
              onRequestClose={() => {
                setMedicosListIsActive(!MedicosListIsActive);
              }}>
              <View style={styles.buttonCloseContainer}>
                <Button
                  style={styles.buttonCloseModal}
                  onPress={() => setMedicosListIsActive(!MedicosListIsActive)}>
                  <Icon name="close" size={25} color="#595959" />
                </Button>
              </View>
              <TextInput
                pointerEvents="none"
                style={styles.SearchInput}
                placeholder="Médico..."
                value={TextPesquisaMedicos}
                onChangeText={(text) => setTextPesquisaMedicos(text)}
                onFocus={showMedicosList}
              />
              <ScrollView style={styles.ListContainer}>
                {FilteredMedicos.slice(-10).map((item, index) => (
                  <ListItem key={item.Id}>
                    <Body>
                      <Text
                        onPress={() =>
                          handleSelectedMedico(item.Id, item.Name)
                        }>
                        {item.Name}
                      </Text>
                    </Body>
                  </ListItem>
                ))}
              </ScrollView>
            </Modal>
          </View>
        </View>
        <View>
          <Label style={styles.label}>Data da consulta:</Label>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              style={styles.SearchInput}
              placeholder="Data da consulta"
              value={dataConsulta.toLocaleDateString('pt-BR')}
              editable={false}
            />
          </TouchableOpacity>
          {showDateConsulta && (
            <DateTimePicker
              value={dataConsulta}
              mode="date"
              display="default"
              onChange={onChangeDataConsulta}
            />
          )}
        </View>
        <View>
          <Label style={styles.label}>Exames Realizados:</Label>
          <Picker
            icker
            selectedValue={selectedTrimestre}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTrimestre(itemValue)
            }>
            <Picker.Item label="1º Trimestre" value="1" />
            <Picker.Item label="2º Trimestre" value="2" />
            <Picker.Item label="3º Trimestre" value="3" />
          </Picker>
          <View>
            <ScrollView style={styles.checkboxContainer}>
              {FilteredExames.map((item, index) => (
                <ListItem key={item.Id}>
                  <Body style={{flexDirection: 'row'}}>
                    <CheckBox
                      disabled={false}
                      value={item.selected}
                      // onPress={() => {
                      //   item.checked = !item.checked;
                      //   console.log(item);
                      // }}
                      onValueChange={() => onChangeValue(item, index)}
                    />
                    <Text style={{marginHorizontal: 20}}>{item.nome}</Text>
                  </Body>
                </ListItem>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={styles.ButtonAddContainer}>
          <Button style={styles.ButtonAdicionar} onPress={inserirConsulta}>
            <Text style={styles.ButtonText}>Adicionar</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  SearchInput: {
    backgroundColor: '#ffff',
    padding: 10,
    margin: 10,
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
  label: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  ButtonAddContainer: {
    alignItems: 'flex-end',
  },
  ButtonAdicionar: {
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
  checkboxContainer: {
    height: 200,
  },
});

export default Consultas;
