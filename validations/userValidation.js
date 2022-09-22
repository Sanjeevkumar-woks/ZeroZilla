import yup from "yup";

export const userSingInSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(12).required(),
});

export const userLogInSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(12).required(),
});
