import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string()
    .test(
      "name",
      "O nome deve conter pelo menos duas palavras com três letras cada",
      function (value) {
        if (!value) return false;
        const words = value.trim().split(/\s+/);
        return words.length >= 2 && words.every(word => word.length >= 3);
      }
    )
    .required("Nome é obrigatório"),

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
    .required("A senha é obrigatória"),

  newPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
    .required("Confirme a senha, por favor!"),

  // birthday: Yup.date()
  //   .required('Data de aniversário é obrigatória')
  //   .max(new Date(), 'A data de nascimento não pode ser no futuro'),

  // gender: Yup.string()
  //   .oneOf(['masculino', 'feminino'], 'O gênero deve ser "masculino" ou "feminino"')
  //   .required("Gênero é obrigatório"),

});
