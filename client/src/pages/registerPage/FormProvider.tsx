import React from "react";
import { useForm } from "../../hooks/useForm";

interface Form {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  email: string;
  username: string;
}

interface Context {
  form: Form;
  registerFormValue: (name: keyof Form) => any;
}

const defaultState = {
  form: {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
    username: "",
  },
  registerFormValue: () => undefined,
};

export const FormContext = React.createContext<Context>(defaultState);

const FormProvider: React.FC = ({ children }) => {
  const { registerFormValue, form } = useForm<Form>(defaultState.form);
  return (
    <FormContext.Provider value={{ registerFormValue, form }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
