import { createGlobalStyle } from 'styled-components';
import { FONT_SIZE, FONT_FAMILY, COLORS } from './common';

export const GlobalStyles = createGlobalStyle`
  body {
    font-size: ${FONT_SIZE.s};
    font-family: ${FONT_FAMILY.primary};
    color: ${COLORS.black};
  }
`;