import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import theme from './theme';
import Input from './components/Input';
import ListFormat from './components/ListFormat';
import React, { useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

const Container = styled.SafeAreaView`
    flex:1;
    justify-content: flex-start;
    align-items:center;
    background-color:${({ theme }) => theme.mainBackground}
    gap: 30px;
`;
const TitleText = styled.Text`
    font-size: 40px;
    font-weight:bold;
    letter-spacing: 10px;
    background-color:${({ theme }) => theme.textBackground}
    margin: 0px 20px;
    border-radius:20px;
    text-align: center;
    width:${({ width }) => width - 40}px;
`;

SplashScreen.preventAutoHideAsync();

function App() {
  const width = Dimensions.get('window').width;
  const [isReady, setIsReady] = useState(false);
  const [newInput, setNewInput] = useState('');
  const [row, setRow] = useState({});

  const _saveList = async row => {
    try {
      await AsyncStorage.setItem('row', JSON.stringify(row));
      setRow(row);
    } catch (e) {
      console.error(e);
    }
  };
  const _loadList = async () => {
    try {
      const loadedList = await AsyncStorage.getItem('row');
      setRow(JSON.parse(loadedList || {}));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        await _loadList();
      } catch (e) {
        console.error(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  const addList = () => {
    const ID = Date.now().toString();
    const newInputObject = {
      [ID]: { id: ID, text: newInput, completed: false },
    };
    _saveList({ ...row, ...newInputObject });
    setNewInput('');
    console.log(row);
  };
  const changeInput = text => {
    setNewInput(text);
    console.log(`현재 입력된 텍스트: ${newInput}`);
  };

  const _deleteList = id => {
    const copyList = { ...row };
    delete copyList[id];
    _saveList(copyList);
  };
  const _toggleList = id => {
    const copyList = { ...row };
    copyList[id]['completed'] = !copyList[id]['completed'];
    _saveList(copyList);
  };
  const _updateList = item => {
    const copyList = Object.assign({}, row);
    copyList[item.id] = item;
    _saveList(copyList);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container theme={theme} onLayout={onLayoutRootView}>
        <TitleText width={width}>버킷리스트</TitleText>
        <Input
          value={newInput}
          placeholder="+ add here"
          theme={theme}
          onSubmitEditing={addList}
          onChangeText={changeInput}
        />
        {Object.values(row)
          .reverse()
          .map(item => (
            <ListFormat
              key={item.id}
              text={item.text}
              item={item}
              deleteList={_deleteList}
              toggleList={_toggleList}
              updateList={_updateList}
            />
          ))}
      </Container>
    </ThemeProvider>
  );
}

export default App;
