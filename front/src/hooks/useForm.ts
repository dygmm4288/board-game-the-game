import { useState } from "react";

type Obj = Record<string, unknown>;
type Keyof<T extends Obj> = Extract<keyof T, string>;

type useFormReturn<T extends Obj> = {
  value: Readonly<T>;
  get: <K extends Keyof<T>>(key: K) => T[K];
  set: <K extends Keyof<T>>(key: K, newValue: T[K]) => void;
};

const useForm = <T extends Obj>(defaultValue: T): useFormReturn<T> => {
  const [value, setValue] = useState(defaultValue);

  const get = <K extends Keyof<T>>(key: K) => value[key];
  const set = <K extends Keyof<T>>(key: K, newValue: T[K]) => {
    setValue((prev) =>
      prev[key] === newValue ? prev : { ...prev, [key]: newValue },
    );
  };

  return {
    value,
    get,
    set,
  };
};

export default useForm;
