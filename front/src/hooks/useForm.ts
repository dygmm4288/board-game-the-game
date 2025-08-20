import { useState } from "react";

type Props<T extends object> = {
  defaultValue?: T;
};

type Change<T> = (key: keyof T, newValue: T[keyof T]) => void;

const useForm = <T extends object>({ defaultValue }: Props<T>) => {
  const [formValue, setValue] = useState(defaultValue || {});

  const handleChange: Change<T> = (key, newValue) => {
    setValue((prevValue) => ({ ...prevValue, [key]: newValue }));
  };

  return { formValue, handleChange };
};

export default useForm;
