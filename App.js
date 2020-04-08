import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import Todo from './components/Todo';

import reducer from './reducers';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const App = () => {
  useEffect(() => {}, []);
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Todo />
      </View>
    </Provider>
  );
};
export default App;
