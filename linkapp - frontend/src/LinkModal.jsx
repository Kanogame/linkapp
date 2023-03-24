import React, {Component} from "react";
import styled from "styled-components";

const Back = styled.div`
position: fixed;
left: 0;
top: 0;
right: 0;
bottom: 0;
background: #00000055;`

const Modal = styled.div`
position: absolute;
top: 40px;
left: 50%;
transform: translateX(-50%);
width: 400px;
max-width: calc(100% - 30px);
background: #fff;
font-family: Segoe UI;`

const Head = styled.div`
display: flex;
padding: 5px 8px;
background-color: lightgray;
border-bottom: 1px solid gray;
justify-content: space-between;
`

const Title = styled.div`
font-size: 18px;
`

const CloseButton = styled.div`
background-color: lightgray;
width: 15px;
border: 1px solid gray;
border-radius: 6px;
padding: 3px;
color: black;
text-decoration: none;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;

&:hover {
    background-color: gray;
}`

const Label = styled.div`
padding: 5px;
`

const Span = styled.span`
padding-right: 10px;
`

const Input = styled.input`
`

const AddButton = styled.a`
background-color: lightgray;
margin: 5px;
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
}
`

class LinkModal extends Component {
    constructor(props) {
        super(props);
        if (this.props.new) {
            this.state = {
                inputNameVal: "",
                inputDescVal: "",
                inputLinkVal: "",
            }
        } else {
            this.state = {
                inputNameVal: this.props.name,
                inputDescVal: this.props.desc,
                inputLinkVal: this.props.link,
            }
        }
    }
    closeModal = () => {
        this.props.closeModal();
    }

    setName = e => {
        const name = e.target.value;
        this.setState({
            inputNameVal: name,
        });
    }

    setDesc = e => {
        const desc = e.target.value;
        this.setState({
            inputDescVal: desc,
        });
    }

    setLink = e => {
        const link = e.target.value;
        this.setState({
            inputLinkVal: link,
        });
    }

    addLink = async () => {
        if (this.props.new) {
            const data = {
                name: this.state.inputNameVal,
                desc: this.state.inputDescVal,
                link: this.state.inputLinkVal,
            }
            const options = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            };
            try {
                const resp = await fetch("http://localhost:13532/link/add", options);
                const ans = await resp.json();
                if (ans.success !== true) {
                this.props.addNewError("Сервер не доступен", "перезвоните позже");
                }
                this.closeModal();
                this.props.componentDidMount();
            } catch (e) { this.props.addNewError("Сервер не доступен", e);}
        } else {
            const data = {
                id: this.props.id,
                name: this.state.inputNameVal,
                desc: this.state.inputDescVal,
                link: this.state.inputLinkVal
            }
            const options = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            };
            try {
                const resp = await fetch("http://localhost:13532/link/edit", options);
                const ans = await resp.json();
                if (ans.success !== true) {
                this.props.addNewError("Сервер не доступен", "перезвоните позже");
                }
                this.closeModal();
                this.props.componentDidMount();
            } catch (e) { this.props.addNewError("Сервер не доступен", e);}
        }
    }

    render() {
        const {inputNameVal, inputDescVal, inputLinkVal} = this.state;
        return (
            <>
                <Back />
                <Modal>
                    <Head>
                        {this.props.new && <Title>Добавление ссылки</Title>}
                        {!this.props.new && <Title>Редактрование ссылки</Title>}
                        <CloseButton onClick={this.closeModal}>X</CloseButton>
                    </Head>
                    <Label>
                        <Span>Название ссылки</Span>
                        <Input placeholder="название" value={inputNameVal} onChange={this.setName}></Input>
                    </Label>
                    <Label>
                        <Span>Описание ссылки</Span>
                        <Input placeholder="описание" value={inputDescVal} onChange={this.setDesc}></Input>
                    </Label>
                    <Label>
                        <Span>Ссылка</Span>
                        <Input placeholder="ссылка" value={inputLinkVal} onChange={this.setLink}></Input>
                    </Label>
                    <AddButton onClick={this.addLink}>Добавить ссылку</AddButton>
                </Modal>
            </>
        );
    }
}

export default LinkModal;