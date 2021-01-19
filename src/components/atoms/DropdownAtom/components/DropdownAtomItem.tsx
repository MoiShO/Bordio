import React from 'react';
import styled from 'styled-components/macro';
import { COLORS } from '../../../../styles/common';

interface IText {
  color?: string;
  fontSize?: string;
}

const Text = styled.span<IText>`
  vertical-align: middle;
  margin-left: 19px;
`;

const DropdownItem = styled.li`
  cursor: pointer;
  height: 36px;

  &:hover {
    background-color: ${COLORS.lightGrey}
  }
`;

interface IDropdownAtomItem {
  onClick: (selected: string) => void;
  item: string;
}

export const DropdownAtomItem: React.FC<IDropdownAtomItem> = ({ onClick, item }) => {
  const clickItem = () => {
    onClick(item);
  };

  return (
    <DropdownItem onClick={clickItem} key={item}>
      <Text>{item}</Text>
    </DropdownItem>
  );
};

DropdownAtomItem.displayName = 'DropdownAtomItem';