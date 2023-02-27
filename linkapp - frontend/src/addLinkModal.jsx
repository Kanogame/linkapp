import React, {Component} from "react";
import styled from "styled-components";

const Back = styled.diy`
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
max-width:  calc(100% - 30px);
border-radius: 7px;
background: #fff`

class AddLinkModal extends Component {
    render() {
        return (
            <>
                <Back />
                <Modal>
                    content
                </Modal>
            </>
        );
    }
}

export default AddLinkModal;