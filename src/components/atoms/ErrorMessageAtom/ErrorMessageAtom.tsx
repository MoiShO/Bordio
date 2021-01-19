import React from 'react';
import styled from 'styled-components/macro';
import { COLORS } from '../../../styles/common';

const Container = styled.div`
  position: absolute;
  margin-left: 18px;
  margin-top: 2px;
  color: ${COLORS.red};
  z-index: -2;
`;

export const ErrorMessageAtom: React.FC = ({ children }) => {
  return (
    <Container>{children}</Container>
  );
};

ErrorMessageAtom.displayName = 'ErrorMessageAtom';