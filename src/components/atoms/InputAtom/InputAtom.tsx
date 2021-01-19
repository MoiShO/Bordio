import React from 'react';
import styled from 'styled-components/macro';
import { COLORS, FONT_FAMILY } from '../../../styles/common';

interface IInputAtom {
  placeholder?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => string;
  value?: string;
  hasError?: boolean;
  bgColor?: string;
  padding?: string;
  forwardRef?: any;
  name?: string;
}

const InputBase = styled.input<IInputAtom>`
  width: 100%;
  height: 100%;
  border: 0 solid transparent;
  outline: none;
  padding: ${({ padding = '0' }): string => padding};
  background-color: ${({ bgColor = 'transparent' }): string => bgColor};
  color: ${({ hasError = false }): string => hasError ? COLORS.grey : COLORS.black};
  font-family: ${FONT_FAMILY.primary};
  &:focus {
    border: 0 solid transparent;
  }
`;

export const InputAtom: React.FC<IInputAtom> = ({
  placeholder,
  handleChange,
  value,
  forwardRef,
  name,
  ...props
}) => (
  <InputBase
    {...props}
    ref={forwardRef}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={value}
  />
);

InputAtom.displayName = 'InputAtom';
