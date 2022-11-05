import {
  Container,
} from './styles';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

import useHome from './useHome';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import EmptySearch from './components/EmptySearch';
import ContactsList from './components/ContactsList';

export default function Home() {
  const {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />}

      <Header
        hasError={hasError}
        contactsLength={contacts.length}
        filteredContactsLength={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <EmptySearch searchTerm={searchTerm} />}

      {hasContacts
        && (
          <>
            <ContactsList
              filteredContacts={filteredContacts}
              orderBy={orderBy}
              onToggleOrderBy={handleToggleOrderBy}
              onDeleteContact={handleDeleteContact}
            />

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
          </>
        )}
    </Container>
  );
}
