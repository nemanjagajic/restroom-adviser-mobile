import * as Yup from 'yup';

export const signInValidationRules = Yup.object().shape({
  email: Yup.string()
    .required('Email is required.')
    .email('Email must be a valid email format.'),
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
});

export const signUpValidationRules = Yup.object().shape({
  first_name: Yup.string().required('First name is required.'),
  last_name: Yup.string().required('Last name is required.'),
  email: Yup.string()
    .required('Email is required.')
    .email('Email must be a valid email format.'),
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.'),
  confirm_password: Yup.string()
    .required('Confirm password is required.')
    .min(8, 'Password confirmation must be at least 8 characters.')
    .oneOf([Yup.ref('password'), null], 'Passwords must match.')
});

export const forgotPasswordValidationRules = Yup.object().shape({
  email: Yup.string()
    .required('Email is required.')
    .email('Email must be a valid email format.')
});

export const resetPasswordValidationRules = Yup.object().shape({
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.'),
  password_confirmation: Yup.string()
    .required('Confirm password is required.')
    .min(8, 'Password confirmation must be at least 8 characters.')
    .oneOf([Yup.ref('password'), null], 'Passwords must match.')
});
