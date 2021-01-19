import React from 'react';
import styled from 'styled-components/macro';
import { InputAtom } from '../../atoms/InputAtom';
import { COLORS } from '../../../styles/common';
import { IconAtom } from '../../atoms/IconAtom/IconAtom';
import { ErrorMessageAtom } from '../../atoms/ErrorMessageAtom/ErrorMessageAtom';

interface InputBase {
  placeholder?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => string;
  value?: string;
  hasError?: boolean;
  bgColor?: string;
  padding?: string;
  type?: string;
  src?: string;
  alt?: string;
  name?: string;
  forwardRef?: any;
  errorMessage?: string;
}

// padding: 20px 18px;

const InputContainer = styled.div`
  display: flex;
  height: 50px;
  border-radius: 8px;
  padding: 0 18px;
  align-items: center;
  background-color: ${COLORS.lightGrey}
`;

const IconContainer = styled.div`
  flex: 0 0;
  margin-right: 18px;
`;

export const InputBase: React.FC<InputBase> = ({
  placeholder,
  handleChange,
  value,
  children,
  src,
  alt,
  errorMessage,
  ...props
}) => (
  <>
    <InputContainer>
      {
        src && alt &&
        <IconContainer>
          <IconAtom
            src={src}
            alt={alt}
          />
        </IconContainer>
      }
      <InputAtom
        {...props}
        placeholder={placeholder}
        handleChange={handleChange}
        value={value}
      />
    </InputContainer>
    {errorMessage && <ErrorMessageAtom>{errorMessage}</ErrorMessageAtom>}
  </>
);

InputBase.displayName = 'InputBase';
