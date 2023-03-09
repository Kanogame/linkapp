import React, { Component } from "react"
import styled from "styled-components";
import ErrorStack from "./ErrorStack";
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
    constructor(props) {
        super(props);
        this.state = {
            modalOpened: false,
        }
    }

    openModal = () => {
        this.setState({
            modalOpened: true,
        });
    }

    closeModal = () => {
        this.setState({
            modalOpened: false,
        });
    }

    render() {
        const {modalOpened } = this.state;
        return <Root>
            <ButtonAdd onClick={this.openModal}>+</ButtonAdd>
            <LinkCardList />
            {modalOpened && <AddLinkModal closeModal={this.closeModal}/>}
            <ErrorStack errors={[{ errorName: "hello", errorText: "world"}]}/>
            </Root>;
    }
}

export default App