import { useState } from "react";

export const useFormInput = (initValue: string) => {
  const [value, setValue] = useState(initValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, onChange: handleChange, setValue };
};
