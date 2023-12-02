import * as yup from "yup";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

export const schemasYupLoginisation = yup.object({
  email: yup
    .string()
    .required("Електронна пошта обов'язкова")
    .matches(emailRegex, "Ведіть корректну пошту")
    .max(50, "Максимум 50 символів"),
  password: yup
    .string()
    .max(50, "Максимум 50 символів")
    .required("Пароль обов'зковий")
    .min(6, "Мінімум 6 символів "),
});

export const schemasYupRegisteration = yup.object({
  email: yup
    .string()
    .required("Електронна пошта обов'язкова")
    .matches(emailRegex, "Ведіть корректну пошту")
    .max(50, "Максимум 50 символів"),
  login: yup.string().max(30, "Максимум 30 символів"),
  password: yup
    .string()
    .required("Пароль обов'зковий")
    .max(50, "Максимум 50 символів")
    .min(6, "Мінімум 6 символів "),
});
