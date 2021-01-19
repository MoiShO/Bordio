import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputBase } from '../../../components/molecules/InputBase';
import { Email, Password } from '../../../assets';
import { CheckboxAtom } from '../../atoms/CheckboxAtom';
import { DropdownAtom } from '../../atoms/DropdownAtom';
import { countries } from '../../../common/countries';
import { ButtonAtom } from '../../atoms/ButtonAtom/ButtonAtom';
import { MultiSelectCheckBox, MultiCheckBoxItem } from '../../molecules/MultiSelectCheckBox/MultiSelectCheckBox';
import { validationSchema } from './validate';
import { request } from '../../../utils/api';

const MultiCheckBoxData: MultiCheckBoxItem[] = [
  {
    title: 'Male',
    checked: false,
  },
  {
    title: 'Female',
    checked: false,
  }
];

interface IAuthForm {
  children?: any;
}

const Container = styled.div`
  width: 343px;
`;

const InputContainer = styled(Container)`
  margin-bottom: 21px;
`;

const DropdownContainer = styled(Container)`
  margin-bottom: 30px;
`;

const MultiCheckboxContainer = styled(Container)`
  margin-bottom: 28px;
`;

const CheckboxContainer = styled(Container)`
  margin-bottom: 38px;
`;

const ButtonContainer = styled(Container)`
  margin-bottom: 53px;
`;

export const AuthForm: React.FC<IAuthForm> = ({
  ...props
}) => {
  const [checked, setChecked] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [multiSelect, setMultiSelect] = useState(MultiCheckBoxData);
  const [gender, setGender] = useState('');
  const [dropdownVal, setDropdownVal] = useState('');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleCheckboxClick = (checkBoxItems: MultiCheckBoxItem[], index: number) => {
    checkBoxItems[index].checked = !checkBoxItems[index].checked;
    checkBoxItems.forEach((_, i) => {
      if (i !== index) {
        checkBoxItems[i].checked = false;
      }
    });

    setMultiSelect(checkBoxItems);

    const g = multiSelect.find((item) => item.checked)?.title || '';
    setGender(g);
  };

  // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data: any) => {
    const requestArg = {
      name: data.name,
      email: data.email,
      password: data.password,
      gender,
      acceptPolite: false,
      country: dropdownVal,
    };

    setIsBusy(true);
    await request(requestArg);
    setIsBusy(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <InputContainer>
        <InputBase
          forwardRef={register}
          name="name"
          placeholder="Enter your name"
          errorMessage={errors.name?.message}
        />
      </InputContainer>
      <InputContainer>
        <InputBase
          forwardRef={register}
          name="email"
          placeholder="Email"
          src={Email}
          alt="Email"
          errorMessage={errors.email?.message}
        />
      </InputContainer>
      <InputContainer>
        <InputBase
          forwardRef={register}
          name="password"
          placeholder="Password"
          type="password"
          src={Password}
          alt="password"
          errorMessage={errors.password?.message}
        />
      </InputContainer>

      <DropdownContainer>
        <DropdownAtom
          forwardRef={register}
          name="selectCountry"
          placeholder="Select country"
          itemList={countries}
          errorMessage={errors.selectCountry?.message}
          onChange={setDropdownVal}
        />
      </DropdownContainer>
      <MultiCheckboxContainer>
        <MultiSelectCheckBox
          forwardRef={register}
          name="selectGender"
          checkBoxItems={multiSelect}
          handleCheckboxChange={handleCheckboxClick}
          errorMessage={errors.selectGender?.message}
        />
      </MultiCheckboxContainer>
      <CheckboxContainer>
        <label>
          <CheckboxAtom
            forwardRef={register}
            name="acceptPolite"
            checked={checked}
            onChange={handleCheckboxChange}
            errorMessage={errors.acceptPolite?.message}
          />
          <span style={{ marginLeft: 8 }}>Label Text</span>
        </label>
      </CheckboxContainer>
      <ButtonContainer>
        <ButtonAtom type="submit" loading={isBusy}>
          Sign up
        </ButtonAtom>
      </ButtonContainer>
    </form>
  );
};

AuthForm.displayName = 'AuthForm';
