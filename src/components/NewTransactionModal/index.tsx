import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  // contexto //
  const { createTransaction } = useTransactions();

  // começa com informações de estado para cada input do formulario com valores vazios (value em cada input) // 
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  // informação dos botões income e outcome - estado muda quando for clicado (arrow function do useState lá no onClick do botão RadioBox mesmo //
  const [type, setType] = useState('deposit');

  // salvar o estado dos inputs no componente para inserção na api //
  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault(); // parar o carregamento padrão do html //

    await createTransaction({
      title,
      amount,
      category, 
      type,
    })

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');

    onRequestClose();
  } 
    
  return(
    <Modal 
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
    >

      <button 
      type="button" 
      onClick={onRequestClose} 
      className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar transação</h2>

        <input 
        placeholder="Título" 
        value={title}
        onChange={event => setTitle(event.target.value)} // função executada toda vez que o valor for alterado - acesso a info do input //
        />

        <input 
        type="number" 
        placeholder="Valor" 
        value={amount}
        onChange={event => setAmount(Number(event.target.value))} 
        />

        <TransactionTypeContainer>
          <RadioBox 
          type="button" 
          onClick={() => {setType('deposit'); }}
          isActive={type === 'deposit'} // estilização de um styled component por uma propriedade - no arquivo de styles tem uam interface RadioBoxProps //
          activeColor="green" // informar a cor do botão como uma propriedade //
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox 
          type="button" 
          onClick={() => {setType('withdraw'); }}
          isActive={type === 'withdraw'}
          activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
        placeholder="Categoria" 
        value={category}
        onChange={event => setCategory(event.target.value)} 
        />

        <button type="submit">Cadastrar</button>
      </Container>
        
    </Modal>
  );
}