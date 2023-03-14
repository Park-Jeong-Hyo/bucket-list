import React from "react";
import Icons from "./Icons"
import {Dimensions, Text} from "react-native";
import styled from "styled-components/native";
import images from "../images";

const Container = styled.View`
    display:flex;
    flex-direction: row;
    background-color: ${({theme})=> theme.textBackground}
    width: ${({width}) => width - 40}px;
    gap: 10px;
`
const Content = styled.Text`
    flex: 1;
    font-size:40px;
    color: ${({completed, theme}) => completed ? theme.textDone : theme.textColor}
    text-decoration: ${({completed}) => completed ? 'line-through' : 'none'}
`

const ListFormat = ({text, item, deleteList, toggleList}) => {
    const width = Dimensions.get('window').width
    return (
        <Container width={width}>
            <Icons type={item.completed ? images.CheckBox : images.CheckBoxOutline} id={item.id} onPressOut={toggleList} completed={item.completed}/>
            <Content completed={item.completed}>{text}</Content>
            {item.completed || <Icons type={images.Edit}/>}
            <Icons type={images.Delete} id={item.id} onPressOut={deleteList} completed={item.completed}/>
        </Container>
    );
}

export default ListFormat;