import * as Yup from 'yup';
import { countries } from '../../../common/countries';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Please enter a valid name')
    .matches(/^[a-z ,.'-]+$/, {
      message: 'Please enter a valid name',
      excludeEmptyString: true
  }),
  email: Yup.string()
    .required('Please enter a valid email address')
    .email('Please enter a valid email address'),
  password: Yup.string()
    .min(6, 'Password must contain at least 6 symbol')
    .required('Password is required'),
  selectCountry: Yup.string(),
    // .oneOf(countries, { message: 'You must select your country'})
    // .required('You must select your country'),
  selectGender: Yup.array(),
    // .min(1, { message: 'You must select the gender' }),
  acceptPolice: Yup.bool(),
    // .oneOf([true], { message: 'You must accept the polices' })
});