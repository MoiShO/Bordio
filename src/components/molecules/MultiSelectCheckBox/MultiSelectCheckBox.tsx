import React from 'react';
import styled from 'styled-components/macro';
import { CheckboxAtom } from '../../atoms/CheckboxAtom';
import { ErrorMessageAtom } from '../../atoms/ErrorMessageAtom/ErrorMessageAtom';

interface ICheckboxItem {
  title?: string;
  index: number;
  handleCheckboxChange: (index: number) => void;
  checked: boolean;
  forwardRef?: any;
  errorMessage?: string;
  name?: string;
}

interface IMultiSelectCheckBox {
  checkBoxItems: MultiCheckBoxItem[];
  handleCheckboxChange: (el: MultiCheckBoxItem[], index: number) => void;
  forwardRef: any;
  name?: string;
  errorMessage?: string;
}

export interface MultiCheckBoxItem {
  title: string;
  checked: boolean;
}

const Label = styled.label``;

const Text = styled.label<{ mr: string }>`
  margin: 0 ${({ mr }) => mr} 0 8px;
`;

const CheckBoxItem: React.FC<ICheckboxItem> = ({
  handleCheckboxChange,
  index,
  checked,
  ...props
}) => {

  const handleCheckboxClick = (_: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckboxChange(index);
  };

  return (
    <CheckboxAtom
      {...props}
      onChange={handleCheckboxClick}
      checked={checked}
      rounded={true}
    />
  );
};

export const MultiSelectCheckBox: React.FC<IMultiSelectCheckBox> = ({
  checkBoxItems,
  handleCheckboxChange,
  errorMessage,
  ...props
}) => {

  const handleCheckboxClick = (index: number) => {
    handleCheckboxChange(checkBoxItems, index);
  };

  return (
    <>
      {
        Boolean(checkBoxItems.length) &&
        checkBoxItems.map((checkbox, index) =>
          <Label key={checkbox.title}>
            <CheckBoxItem
              {...props}
              index={index}
              handleCheckboxChange={handleCheckboxClick}
              checked={checkbox.checked}
            />
            <Text mr={index === checkBoxItems.length - 1 ? '0' : '25px'}>{checkbox.title}</Text>
          </Label>
        )
      }
      {errorMessage && <ErrorMessageAtom>{errorMessage}</ErrorMessageAtom>}
    </>
  );
};

MultiSelectCheckBox.displayName = 'InputBase';
