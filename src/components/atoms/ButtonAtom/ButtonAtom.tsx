import React from 'react';
import styled from 'styled-components/macro';
import { COLORS, FONT_SIZE } from '../../../styles/common';
import { Spinner } from '../Spinner/';

interface IButtonAtom {
  children?: any;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button = styled.button<IButtonAtom>`
  width: 100%;
  height: 62px;
  border-radius: 31px;
  font-size: ${FONT_SIZE.x};
  background-color: ${({ disabled }) => disabled ? COLORS.grey : COLORS.blue};
  outline: none;
  border-color: transparent;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  color: ${COLORS.white}
`;

export const ButtonAtom: React.FC<IButtonAtom> = ({ children, disabled, loading, type }) => (
  <Button disabled={disabled} type={type}>
    {
      loading
        ? <Spinner />
        : children
    }
  </Button>
);

ButtonAtom.displayName = 'ButtonAtom';