import React, { useRef, useState, } from 'react';
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';
import styled from 'styled-components/macro';
import { COLORS } from '../../../styles/common';
import { ChevronDown } from '../../../assets';
import { IconAtom } from '../IconAtom/IconAtom';
import { DropdownAtomItem } from './components';
import { ErrorMessageAtom } from '../ErrorMessageAtom/ErrorMessageAtom';

interface IDropdownAtom {
  placeholder: string;
  itemList: string[];
  name: string;
  forwardRef?: any;
  errorMessage?: string;
  onChange?: (val: string) => void;
}

const Container = styled.div`
`;

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MenuTrigger = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  border-radius: 8px;
  background: ${COLORS.lightGrey};
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  border: none;
  vertical-align: middle;
`;

interface IText {
  color?: string;
  fontSize?: string;
}

const Text = styled.input<IText>`
  vertical-align: middle;
  margin-left: 18px;
  font-size: ${({ fontSize }) => fontSize || '14px'};
  color: ${({ color }) => color || COLORS.black};
  border-width:0px;
  border: none;
  outline: none;
`;

const Dropdown = styled.div`
  position: absolute;
  z-index: -1;
  background: ${COLORS.white};
  border-radius: 8px;
  top: 56px;
  box-shadow: 0px 3px 8px #00000026;;
  opacity: 0;
  width: 100%;
  -webkit-transform:
  visibility: hidden;
  transform: translateY(-6px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s, z-index 0.5s;

  &.active {
    z-index: 0;
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const DropdownList = styled.ul`
  list-style: none;
  padding: 6px 0;
  margin: 0;
`;

const DropdownIconContainer = styled.div`
  flex: 0 0;
  transition: transform 0.4s ease;

  &.openDropdown {
    transform: rotate(180deg);
  }
`;

export const DropdownAtom: React.FC<IDropdownAtom> = ({
  placeholder,
  itemList,
  forwardRef,
  errorMessage,
  name,
  onChange,
  ...props
}) => {
  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [selected, setSelected] = useState('');

  const onClick = () => setIsActive(!isActive);
  const select = (item: string) => {
    onClick();
    setSelected(item);
    if (onChange) {
      onChange(item);
    }
  };

  return (
    <>
      <Container>
        <MenuContainer>
          <MenuTrigger onClick={onClick}>
            <Text
              ref={forwardRef}
              name={name}
              color={selected ? COLORS.black : COLORS.grey}
              value={selected ? selected : placeholder}
              disabled
            />
            <DropdownIconContainer className={`${isActive ? 'openDropdown' : 'closeDropdown'}`}>
              <IconAtom src={ChevronDown} alt="chevron" margin={'0 21px'} />
            </DropdownIconContainer>
          </MenuTrigger>
          <Dropdown
            ref={dropdownRef}
            className={`menu ${isActive ? 'active' : 'inactive'}`}
            {...props}
          >
            <DropdownList>
              {
                itemList.map((item) =>
                  <DropdownAtomItem
                    key={item}
                    item={item}
                    onClick={select}
                  />
                )
              }
            </DropdownList>
          </Dropdown>
        </MenuContainer>
      </Container>
      {errorMessage && <ErrorMessageAtom>{errorMessage}</ErrorMessageAtom>}
    </>
  );
};

DropdownAtom.displayName = 'DropdownAtom';