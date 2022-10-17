import styled, { css } from 'styled-components';

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

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;
