import React from "react";
import images from "../images";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

const StyledIcon = styled.Image`
    tint-color:${({theme, completed}) => completed ? theme.textDone : theme.textColor};
    width: 40px;
    height: 40px;
`

const Icons = ({type, onPressOut, id, completed}) => {
    const _onPressOut = () => {
        onPressOut(id);
    }
    return (
        <TouchableOpacity onPressOut={_onPressOut}>
            <StyledIcon source={type} completed={completed}/>
        </TouchableOpacity>
    );
}

Icons.defaultProps = {
    onPressOut: () => {},
}

export default Icons;