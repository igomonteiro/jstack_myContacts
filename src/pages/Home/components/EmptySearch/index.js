import PropTypes from 'prop-types';
import { Container } from './styles';
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

export default function EmptySearch({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="Magnifier question" />
      <span>
        Nenhum resultado foi encontrado para
        {' '}
        <strong>
          &quot;
          {searchTerm}
          &quot;
        </strong>
        .
      </span>
    </Container>
  );
}

EmptySearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
