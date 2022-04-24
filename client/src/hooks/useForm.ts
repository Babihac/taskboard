import { useState } from "react";

export function useForm<Form>(values: Form) {
  const [form, setFormValue] = useState(values);
  function registerFormValue<Key extends keyof Form>(name: Key) {
    const value = form[name];
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValue((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
    return { value, onChange };
  }
  return { registerFormValue, form };
}
