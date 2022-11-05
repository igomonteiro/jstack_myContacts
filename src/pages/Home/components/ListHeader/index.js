import PropTypes from 'prop-types';
import arrow from '../../../../assets/images/icons/arrow.svg';
import { Container } from './styles';

export default function ListHeader({ orderBy, onToggleOrderBy }) {
  return (
    <Container orderBy={orderBy}>
      <button type="button" onClick={onToggleOrderBy}>
        <span>Nome</span>
        <img src={arrow} alt="Ordenar por nome" />
      </button>
    </Container>
  );
}

ListHeader.propTypes = {
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
};
