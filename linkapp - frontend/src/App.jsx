import React, { Component } from "react"
import styled from "styled-components";
import LinkModal from "./LinkModal";
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
            id: null,
            name: null,
            desk: null,
            link: null,
            new: true,
        }
    }

    openModal = (data) => {
        console.log(data);
        if (data.new === undefined) {
            this.setState({
                modalOpened: true,
                new: true,
            });
        } else {
            this.setState({
                id: data.id,
                name: data.name,
                desc: data.desc,
                link: data.link,
                new: false,
                modalOpened: true
            })
        }
    }

    closeModal = () => {
        this.setState({
            modalOpened: false,
        });
    }

    addNewError = (errorName, errorText) => {
        console.log(errorName, errorText);
        const {errors} = this.state;
        console.log(errors);
        const newError = {errorName: errorName, errorText: errorText};
        errors.push(newError);
        this.setState({
            errors: errors
        });
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
        let errorStack = [];
        console.log(errors);
        if (errors) { 
            errorStack = errors.map((error) => {return (<Body>
                <Name>{error.errorName}</Name>
                <Text>{error.errorText}</Text>
            </Body>)});
        }
        return <Root>
            <ButtonAdd onClick={this.openModal}>+</ButtonAdd>
            <LinkCardList addNewError={this.addNewError} links={this.state.links} linksError={this.state.linksError} componentDidMount={this.componentDidMount} openModal={this.openModal}/>
            {modalOpened && <LinkModal 
            closeModal={this.closeModal} 
            addNewError={this.addNewError} 
            new={this.state.new}
            name={this.state.name}
            desc={this.state.desc} 
            link={this.state.link} 
            id={this.state.id}
            componentDidMount={this.componentDidMount}/>}
            <ErrorStack>{errorStack}</ErrorStack>
            </Root>;
    }
}

export default App