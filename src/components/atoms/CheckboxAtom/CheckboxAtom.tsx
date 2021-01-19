import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../styles/common';
import { ErrorMessageAtom } from '../ErrorMessageAtom/ErrorMessageAtom';

export interface ICheckboxAtom {
  checked: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rounded?: boolean;
  name?: string;
  forwardRef?: any;
  errorMessage?: string;
}

const CheckboxContainer = styled.div<{ rounded: boolean | undefined }>`
  display: inline-block;
  vertical-align: middle;
  border: 1px solid ${COLORS.blue};
  border-radius: ${({ rounded }) => (rounded ? '50%' : '3px')};
  height: 16px;
  width: 16px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: ${COLORS.blue};
  stroke-width: 2px;
`;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  border-color: ${COLORS.blue}
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${({ checked }) => (checked ? COLORS.blue : 'transparent')}
  border-radius: 3px;
  transition: all 150ms;
  border-color: ${COLORS.blue}

  ${HiddenCheckbox}:focus + & {}

  ${Icon} {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')}
  }
`;

export const CheckboxAtom: React.FC<ICheckboxAtom> = ({ className, checked, rounded, forwardRef, errorMessage, name, ...props }) => (
  <>
    <CheckboxContainer className={className} rounded={rounded}>
      <HiddenCheckbox checked={checked} {...props} ref={forwardRef} name={name}/>
      <StyledCheckbox checked={checked}>
        {
          rounded
            ? (
              <Icon>
                <circle cx="8" cy="8" r="4" fill={COLORS.blue} />
              </Icon>
            )
            : (
              <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </Icon>
            )
        }
      </StyledCheckbox>
    </CheckboxContainer>
    {errorMessage && <ErrorMessageAtom>{errorMessage}</ErrorMessageAtom>}
  </>
);

CheckboxAtom.displayName = 'CheckboxAtom';
