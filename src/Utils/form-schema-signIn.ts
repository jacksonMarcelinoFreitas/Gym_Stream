import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("E-mail é obrigatório"),

  password: Yup.string()
    .min(8, "Mínimo de caracteres aceitável é 8")
    .max(55, "Máximo de caracteres aceitável é 55")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9]).*$/,
      "A senha deve conter pelo menos uma letra maiúscula e um número"
    )
    .required("A senha é obrigatória")
});
