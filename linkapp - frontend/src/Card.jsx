import React, { Component } from "react";
import styled from "styled-components";

const Root = styled.div`
border: 1px solid black;
border-radius: 8px;
width: 300px;
padding: 10px;
font-family: Segoe UI;
margin: auto;`

const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;`

const HeadText = styled.div`
font-size: 20px;
font-family: Segoe UI;
align-self: center;`

const HeadImage = styled.img`
width: 50px;
height: 50px;
border-radius: 10px;`

const Desc = styled.div`
font-size: 12px;
`

const Buttons = styled.div`
display: flex;
flex-direction: row;
gap: 5px;
margin-top: 10px;
`

const LinkButton = styled.a`
background-color: lightgray;
flex: 8 1 0;
width: auto;
border: 1px solid gray;
border-radius: 6px;
padding: 3px;
color: black;
text-decoration: none;
display: flex;
align-items: center;
justify-content: center;

&:hover {
    background-color: gray;
}
`

const EditButton = styled.div`
background-color: lightgray;
flex: 1 1 0;
width: auto;
border: 1px solid gray;
border-radius: 6px;
padding: 3px;
color: black;
text-decoration: none;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
text-aling: center;

&:hover {
    background-color: gray;
}`

class Card extends Component {
    removeLink = async () => {
        const data = { id: this.props.id };
        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        try {
            const resp = await fetch("http://localhost:13532/link/remove", options);
            const ans = await resp.json();
            if (ans.success !== true) {
                this.props.addNewError("Ошибка удаления", "Сервер ответил ошибкой")
            }
            this.props.refresh();
        } catch {
            this.props.addNewError("Ошибка удаления", "Сервер не ответил")
        }
    }

    render() {
        return <Root>
            <Header> 
                <HeadText>{this.props.title}</HeadText>
                <HeadImage src={this.props.favicon} alt="no favicon"></HeadImage>
            </Header>
            <Desc>{this.props.desc}</Desc>
            <Buttons>
                <LinkButton href={this.props.button} target="_blank">button</LinkButton>
                <EditButton>e</EditButton>
                <EditButton onClick={this.removeLink}>r</EditButton>
            </Buttons>
        </Root>
    }
}

export default Card