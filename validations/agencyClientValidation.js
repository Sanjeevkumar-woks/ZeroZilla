//Agency Client Validation Schema

import yup from "yup";

export const agencyValidation = yup.object({
  agencyId: yup.string().required(),
  agencyName: yup.string().required(),
  address1: yup.string().required(),
  address2: yup.string(),
  state: yup.string().required(),
  city: yup.string().required(),
  phoneNumber: yup.number().required(),
});

export const clientValidation = yup.object({
  clientId: yup.string().required(),
  agencyId: yup.string().required(),
  clientName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.number().required(),
  totalBill: yup.number().required(),
});
