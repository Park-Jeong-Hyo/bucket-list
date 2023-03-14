import React from "react";
import styled from "styled-components/native";
import { View, TextInput, Text, Dimensions } from "react-native";

const StyledInput = styled.TextInput`
    margin: 0 20px;
    font-size: 40px;
    background-color: ${({theme}) => theme.textBackground}
    width: ${({width}) => width - 40}px;
    border-radius: 10px;
`

const Input = ({theme, placeholder, onSubmitEditing, onChangeText, value}) => {
    const width = Dimensions.get('window').width;
    return (
        <StyledInput 
            placeholder={placeholder}
            maxLength={50}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            value={value}
            color = {theme}
            width={width}
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            r
        />
    );
}

export default Input;
