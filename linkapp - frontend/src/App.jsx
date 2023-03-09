import React, { Component } from "react"
import styled from "styled-components";
import AddLinkModal from "./addLinkModal";
import LinkCardList from "./LinkCardList";

const Root = styled.div`
display: flex;
flex-direction: column;`

const ErrorStack = styled.div`
position: absolute;
right: 0;
bottom: 0;
width: 300px;
height: auto;`

const Body = styled.div`
background-color: lightgray;
border: 1px solid gray;
margin-top: 20px;`

const Name = styled.div`
font-size: 20px;`

const Text = styled.div`
font-size: 14px;`

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
            errors: [],
            links: null,
            linksError: null,
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

    addNewError = (errorName, errorText) => {
        const errors = this.state.errors;
        const newError = (<Body>
            <Name>{errorName}</Name>
            <Text>{errorText}</Text>
        </Body>);
        const res = errors.push(newError);
        this.setState({
            errors: res
        })
    }

    componentDidMount = async () => {
        this.setState({
            links: null,
            linksError: null,
        });
        try {
            const resp = await fetch("http://localhost:13532/links/get");
            const links = await resp.json();
            this.setState({
                links: links,
            });
        console.log(links);
        } catch (er) {
           this.setState({
            linksError: er, 
           });
           this.addNewError("ошибка при загрузки сервера", er)
        }
    }

    render() {
        const {modalOpened, errors} = this.state;
        console.log(errors);
        const errorStack = errors.map(error => (
            <Body>
                <Name>{error.errorName}</Name>
                <Text>{error.errorText}</Text>
            </Body>
        ));
        return <Root>
            <ButtonAdd onClick={this.openModal}>+</ButtonAdd>
            <LinkCardList addNewError={this.addNewError} links={this.state.links} linksError={this.state.linksError}/>
            {modalOpened && <AddLinkModal closeModal={this.closeModal} addNewError={this.addNewError}/>}
            <ErrorStack>{errorStack}</ErrorStack>
            </Root>;
    }
}

export default App