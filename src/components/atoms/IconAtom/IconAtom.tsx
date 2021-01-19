import React from 'react';
import styled from 'styled-components/macro';

export interface IIconAtom {
  src: string;
  alt: string;
  margin?: string;
}

const SVG = styled.img<IIconAtom>`
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  margin: ${({ margin }) => margin}
`;

export const IconAtom: React.FC<IIconAtom> = ({ src, alt, margin }) => {
  return (
    <SVG src={src} alt={alt} margin={margin} />
  );
};

IconAtom.displayName = 'IconAtom';