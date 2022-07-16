import styled from 'styled-components';

export default styled.input`
  width: 100%;
  height: 52px;
  border: 2px solid #FFF;
  outline: none;
  padding: 0 16px;
  border-radius: 4px;
  background: #FFF;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  font-size: 16px;
  transition: border-color 0.2s ease-in;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;
