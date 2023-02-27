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

    async componentDidMount() {
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
        }
    }
 
    render() {
        if (this.state.linksError) {
            return <div>Ошибка: {this.state.linksError}</div>
        }
        if (this.state.links === null) {
            return <div>Загрузка ссылок...</div>
        }
        const cards = [];
        for (let i =0; i < this.state.links.length; i++) {
            const link = this.state.links[i];
            console.log(link);
            const card = (
                <Card id={link.id}
                 title={link.title}
                  desc={link.description}
                   button={link.link}/>
            );
            cards.push(card);
        }
        return <Root>
            {cards}
            </Root>;
    }
}

export default LinkCardList