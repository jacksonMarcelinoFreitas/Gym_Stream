import * as Yup from 'yup';

export const schema = Yup.object().shape({
  tokenEmail: Yup.string()
    .required("Token é obrigatório")
});
