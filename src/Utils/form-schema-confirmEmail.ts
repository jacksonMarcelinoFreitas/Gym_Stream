import * as Yup from 'yup';

export const schema = Yup.object().shape({
  tokenEmail: Yup.string()
  .matches(
    /^[a-zA-Z0-9]{8}$/,
    "O token não está no formato correto"
    // "O token deve conter exatamente 8 caracteres, sendo letras e números"
  )
  .required("Token é obrigatório")
});
