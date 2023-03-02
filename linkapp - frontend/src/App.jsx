import React, { Component } from "react"
import styled from "styled-components";
import AddLinkModal from "./addLinkModal";
import LinkCardList from "./LinkCardList";

const Root = styled.div`
display: flex;
flex-direction: column;`

const ButtonAdd = styled.button`
flex: 0 0 40px;
width: 40px;
font-size: 25px;
background: transparent;
border: 2px solid darkblue;
border-radius: 999px;
outline: 0;
color: darkblue;
align-self: flex-start;
text-aling: center;
`

class App extends Component {
    render() {
        return <Root>
            <ButtonAdd>+</ButtonAdd>
            <LinkCardList />
            
            </Root>;
    }
}

export default App