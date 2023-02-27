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

&:hover {
    background-color: gray;
}`

class Card extends Component {
    render() {
        return <Root>
            <Header> 
                <HeadText>{this.props.title}</HeadText>
                <HeadImage src={this.props.button + "favicon.ico"} alt=""></HeadImage>
            </Header>
            <Desc>{this.props.desc}</Desc>
            <Buttons>
                <LinkButton href={this.props.button} target="_blank">button</LinkButton>
                <EditButton>e</EditButton>
                <EditButton>r</EditButton>
            </Buttons>
        </Root>
    }
}

export default Card