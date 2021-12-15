import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";

import { GlobalStyle } from "./styles/global";

// acessibilidade - modal dentro do elemento root // 
Modal.setAppElement('#root');

export function App() {
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
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <Modal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      >
        <h2>Cadastrar transação</h2>
      </Modal>
      <GlobalStyle />
    </>
  );
}