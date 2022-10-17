/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import {
  Container, Header, ListHeader, Card, InputSearchContainer,
  ErrorContainer, EmptyListContainer, EmptySearchContainer,
} from './styles';

import ContactsService from '../../services/ContactsService';

import formatPhone from '../../utils/formatPhone';

import arrow from '../../assets/images/icons/arrow.svg';
import trash from '../../assets/images/icons/trash.svg';
import edit from '../../assets/images/icons/edit.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import toast from '../../utils/toast';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy);
      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleToggleOrderBy = () => {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  };

  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTryAgain = () => {
    loadContacts();
  };

  const handleDeleteContact = (contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  };

  const handleConfirmDeleteContact = async () => {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);
      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
      handleCloseDeleteModal();
      setContacts(contacts.filter((contact) => contact.id !== contactBeingDeleted.id));
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Modal
        danger
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>
      {
        contacts.length > 0
        && (
          <InputSearchContainer>
            <input value={searchTerm} type="text" placeholder="Pesquisar contato" onChange={handleChangeSearchTerm} />
          </InputSearchContainer>
        )
      }

      <Header justifyContent={
        hasError
          ? 'flex-end'
          : (
            contacts.length > 0
              ? 'space-between'
              : 'center'
          )
      }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {' '}
            {filteredContacts.length === 1 ? 'contato' : 'contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os contatos!</strong>

            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError
        && (
          <>
            {contacts.length < 1 && !isLoading && (
              <EmptyListContainer>
                <img src={emptyBox} alt="Empty box" />
                <p>
                  Você ainda não tem nenhum contato cadastrado!
                  Clique no botão <strong>&quot;Novo contato&quot; </strong>
                  acima para cadastrar o seu primeiro!
                </p>
              </EmptyListContainer>
            )}

            {contacts.length > 0 && filteredContacts < 1 && (
              <EmptySearchContainer>
                <img src={magnifierQuestion} alt="Magnifier question" />
                <span>
                  Nenhum resultado foi encontrado para <strong>&quot;{searchTerm}&quot;</strong>.
                </span>
              </EmptySearchContainer>
            )}

            {filteredContacts.length > 0 && (
              <ListHeader orderBy={orderBy}>
                <button type="button" onClick={handleToggleOrderBy}>
                  <span>Nome</span>
                  <img src={arrow} alt="Ordenar por nome" />
                </button>
              </ListHeader>
            )}

            {filteredContacts.map((contact) => (
              <Card key={contact.id}>
                <div className="info">
                  <div className="contact-name">
                    <strong>{contact.name}</strong>
                    {contact.category_name && <small>{contact.category_name}</small>}
                  </div>
                  <span>{contact.email}</span>
                  <span>{formatPhone(contact.phone)}</span>
                </div>
                <div className="actions">
                  <Link to={`/edit/${contact.id}`}>
                    <img src={edit} alt="Editar" />
                  </Link>
                  <button
                    type="submit"
                    onClick={() => handleDeleteContact(contact)}
                  >
                    <img src={trash} alt="Remover" />
                  </button>
                </div>
              </Card>
            ))}
          </>
        )}
    </Container>
  );
}
