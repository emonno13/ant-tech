import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import {SearchBar, Slider} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import dataApi from '../servers';

const Todo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({type: 'DATA_REQUESTED'});
  }, []);

  //const [data, setData] = useState(dataApi);
  const [search, setSearch] = useState('');
  const [slider, setSlider] = useState(1);
  const [openDeteteButton, setDeleteButton] = useState(false);
  const [idDelete, setIdDelete] = useState(1);

  const filterName = (text) => {
    const newData = dataApi.filter(function (item) {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setSearch(text);
    dispatch({type: 'FETCH_DATA_API', value: newData});
    //setData(newData);
  };

  const filterAge = (value) => {
    const newData = [''];
    for (var i = 0; i < dataApi.length; i++) {
      if (dataApi[i].age > value) {
        newData.push({
          id: dataApi[i].id,
          name: dataApi[i].name,
          age: dataApi[i].age,
        });
      }
    }
    dispatch({type: 'FETCH_DATA_API', value: newData});
    //setData(newData);
    setSlider(value);
  };

  const saveCurrentData = () => {
    dispatch({type: 'FETCH_DATA_API', value: user});
  };

  const openDelete = (id) => {
    setIdDelete(id);
    setDeleteButton(true);
  };
  const closeDelete = (id) => {
    setIdDelete(id);
    setDeleteButton(false);
  };

  const removeUser = (item) => {
    const index = user.findIndex((x) => x.id === item.id);
    if (index < 0) return;
    const newDatas = [...user];
    newDatas.splice(index, 1);
    dispatch({type: 'FETCH_DATA_API', value: newDatas});
    //setData(newDatas);
  };

  return (
    <View style={{flex: 1}}>
      <Text style={{alignSelf: 'center', marginVertical: 5}}>LOGO</Text>
      <Text style={{alignSelf: 'center'}}>{search}</Text>
      <SearchBar
        onChangeText={(text) => filterName(text)}
        onClear={() => filterName('')}
        placeholder="Search by Name"
        value={search}
      />
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Slider
          value={slider}
          maximumValue={120}
          minimumValue={1}
          style={{width: '80%'}}
          step={1}
          onValueChange={(value) => filterAge(value)}
        />
        <Text>Age: > {slider}</Text>
      </View>

      <Button onPress={() => saveCurrentData()} title="Save" />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={user}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              onLongPress={() => openDelete(item.id)}
              onPress={() => closeDelete(item.id)}>
              <Text>{item.name}</Text>
              <Text>{item.age}</Text>
              {openDeteteButton && idDelete === item.id && (
                <TouchableOpacity>
                  <Text
                    style={{color: 'white', backgroundColor: 'black'}}
                    onPress={() => removeUser(item)}>
                    Delete
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
export default Todo;
