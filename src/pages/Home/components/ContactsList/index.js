/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ListHeader, Card } from './styles';

import formatPhone from '../../../../utils/formatPhone';

import arrow from '../../../../assets/images/icons/arrow.svg';
import trash from '../../../../assets/images/icons/trash.svg';
import edit from '../../../../assets/images/icons/edit.svg';

export default function ContactsList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact,
}) {
  return (
    <>
      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={onToggleOrderBy}>
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
              onClick={() => onDeleteContact(contact)}
            >
              <img src={trash} alt="Remover" />
            </button>
          </div>
        </Card>
      ))}

    </>
  );
}

ContactsList.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
