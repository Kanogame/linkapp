import React, { Component } from "react";
import styled from "styled-components";

const Root = styled.div`
position: absolute;
background: yellow;`

const Body = styled.div`
backgrond: gray;
border: 1px solid gray;`

const Name = styled.div`
font-size: 20px;`

const Text = styled.div`
font-size: 14px;`

class ErrorStack extends Component {
    render() {
        const errors = this.props.errors;
        const errorStack = errors.map(error => {
            <Body>
                <Name>{error.Name}</Name>
                <Text>{error.Text}</Text>
            </Body>
        });
        return
    }
}

export default ErrorStack