import * as Yup from 'yup';

export const setRestroomInfoRules = Yup.object().shape({
  name: Yup.string().required('Name must be filled')
});
