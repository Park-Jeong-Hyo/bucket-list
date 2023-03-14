import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import styled, {ThemeProvider} from 'styled-components/native'
import theme from './theme'
import Input from './components/Input'
import ListFormat from './components/ListFormat';
import { useState } from 'react';

const Container = styled.SafeAreaView`
    flex:1;
    justify-content: flex-start;
    align-items:center;
    background-color:${({theme}) => theme.mainBackground}
    gap: 30px;
`
const TitleText = styled.Text`
    font-size: 40px;
    font-weight:bold;
    letter-spacing: 10px;
    background-color:${({theme}) => theme.textBackground}
    margin: 0px 20px;
    border-radius:20px;
    text-align: center;
    width:${({width}) => width - 40}px;
`

function App() {
    const width = Dimensions.get('window').width;
    const [newInput, setNewInput] = useState('');
    const [row, setRow] = useState({});

    const addList = () => {
        const ID = Date.now().toString();
        const newInputObject = {
            [ID] : {id: ID, text: newInput, completed: false}
        }
        setRow({...row, ...newInputObject})
        setNewInput('');
        console.log(row);
    }

    const changeInput = text => {
        setNewInput(text)
        console.log(`현재 입력된 텍스트: ${newInput}`)
    }

    const _deleteList = id => {
        const copyList = {...row};
        delete copyList[id];
        setRow(copyList);
    }
    const _toggleList = id => {
        const copyList = {...row};
        copyList[id]["completed"] = !copyList[id]["completed"];
        setRow(copyList);
    }

  return (
    <ThemeProvider theme={theme}>
        <Container theme={theme}>
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
                .map( item => (
                <ListFormat 
                    key={item.id} 
                    text={item.text}
                    item={item}
                    deleteList={_deleteList}
                    toggleList={_toggleList}
                />
            ))}
        </Container>
    </ThemeProvider>
  );
}

export default App;
