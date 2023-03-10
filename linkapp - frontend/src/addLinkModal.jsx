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

class AddLinkModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputNameVal: "",
            inputDescVal: "",
            inputLinkVal: "",
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
            const ans = resp.json();
            if (ans.success !== true) {
            this.props.addNewError("???????????? ???? ????????????????", "?????????????????????? ??????????");
            }
        } catch (e) { this.props.addNewError("???????????? ???? ????????????????", e);}
    }

    render() {
        const {inputNameVal, inputDescVal, inputLinkVal} = this.state;
        return (
            <>
                <Back />
                <Modal>
                    <Head>
                        <Title>???????????????????? ????????????</Title>
                        <CloseButton onClick={this.closeModal}>X</CloseButton>
                    </Head>
                    <Label>
                        <Span>???????????????? ????????????</Span>
                        <Input placeholder="????????????????" value={inputNameVal} onChange={this.setName}></Input>
                    </Label>
                    <Label>
                        <Span>???????????????? ????????????</Span>
                        <Input placeholder="????????????????" value={inputDescVal} onChange={this.setDesc}></Input>
                    </Label>
                    <Label>
                        <Span>????????????</Span>
                        <Input placeholder="????????????" value={inputLinkVal} onChange={this.setLink}></Input>
                    </Label>
                    <AddButton onClick={this.addLink}>???????????????? ????????????</AddButton>
                </Modal>
            </>
        );
    }
}

export default AddLinkModal;