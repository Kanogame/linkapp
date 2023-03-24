import React, { Component } from "react"
import styled from "styled-components";
import Card from "./Card";

const Root = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 20px;
margin: 0 auto;
max-width: 100000px;
@media (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }`

class LinkCardList extends Component {
    constructor(props){
        super(props);
        this.state={
            links: null,
            linksError: null,
        };
    }
 
    render() {
        const {links, linksError} = this.props;
        if (linksError) {
            return
        }
        if (links === null) {
            return <div>Загрузка ссылок...</div>
        }
        const cards = links.map(link => {
            return <Card key={link.id} 
            id={link.id}
            title={link.title}
            desc={link.description}
           button={link.link}
           favicon={link.favicon}
           refresh={this.props.componentDidMount}
           addNewError={this.props.addNewError}
           openModal={this.props.openModal}/>
        });
        return <Root>
            {cards}
            </Root>;
    }
}

export default LinkCardList