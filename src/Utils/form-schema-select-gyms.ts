import * as Yup from 'yup';

export const schema = Yup.object().shape({
  customer: Yup.string()
    .required("Você deve selecionar uma academia."),
});
