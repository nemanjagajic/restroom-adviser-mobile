import * as Yup from 'yup';

export const changePasswordValidationRules = Yup.object().shape({
  current_password: Yup.string()
    .required('Current password is required.')
    .min(8, 'Current password must be at least 8 characters.'),
  new_password: Yup.string()
    .required('New password is required.')
    .min(8, 'New password must be at least 8 characters.'),
  new_password_confirmation: Yup.string()
    .required('New password confirmation is required')
    .min(8, 'New password confirmation must be at least 8 characters.')
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match.')
});

export const updateProfileValidationRules = Yup.object().shape({
  first_name: Yup.string().required('First name is required.'),
  last_name: Yup.string().required('Last name is required.')
});
