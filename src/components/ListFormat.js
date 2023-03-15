import React, { useState } from 'react';
import Icons from './Icons';
import { Dimensions, Text } from 'react-native';
import styled from 'styled-components/native';
import images from '../images';
import Input from './Input';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.View`
    display:flex;
    flex-direction: row;
    background-color: ${({ theme }) => theme.textBackground}
    width: ${({ width }) => width - 40}px;
    gap: 10px;
`;
const Content = styled.Text`
    flex: 1;
    font-size:40px;
    color: ${({ completed, theme }) =>
      completed ? theme.textDone : theme.textColor}
    text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')}
`;

const ListFormat = ({ item, deleteList, toggleList, updateList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);
  const width = Dimensions.get('window').width;

  const _editIconPressed = () => {
    setIsEditing(true);
  };
  const _onSubmitEditing = () => {
    if (isEditing) {
      const editList = Object.assign({}, item, { text });
      setIsEditing(false);
      updateList(editList);
    }
  };
  return isEditing ? (
    <Input
      value={text}
      onChangeText={text => setText(text)}
      onSubmitEditing={_onSubmitEditing}
    />
  ) : (
    <Container width={width}>
      <Icons
        type={item.completed ? images.CheckBox : images.CheckBoxOutline}
        id={item.id}
        onPressOut={toggleList}
        completed={item.completed}
      />
      <Content completed={item.completed}>{item.text}</Content>
      {item.completed || (
        <Icons type={images.Edit} onPressOut={_editIconPressed} />
      )}
      <Icons
        type={images.Delete}
        id={item.id}
        onPressOut={deleteList}
        completed={item.completed}
      />
    </Container>
  );
};

export default ListFormat;
