import { useState } from 'react';
import Modal from 'react-modal';
import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

export function Header() {
    // modal //
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false); // modal fechado // 
    
    // handle - usuario vai clicar em alguma coisa ou executar algum comando //
    function handleOpenNewTransactionModal () {
        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal () {
        setIsNewTransactionModalOpen(false);
    }

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={handleOpenNewTransactionModal} >
                    Nova transação
                </button>
            </Content>
            <Modal 
            isOpen={isNewTransactionModalOpen}
            onRequestClose={handleCloseNewTransactionModal}
            >
                <h2>Cadastrar transação</h2>
            </Modal>
        </Container>
    )
}