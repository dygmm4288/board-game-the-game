import { useState } from "react";

type Obj = Record<string, unknown>;
type Keyof<T extends Obj> = Extract<keyof T, string>;

const UNSET: unique symbol = Symbol("UNSET");

type useFormReturn<T extends Obj> = {
  value: Readonly<T>;
  set: {
    <K extends Keyof<T>>(key: K, next: T[K] | ((prev: T[K]) => T[K])): void;
    <K extends Keyof<T>>(key: K): (next: T[K] | ((prev: T[K]) => T[K])) => void;
  };
};

const useForm = <T extends Obj>(defaultValue: T): useFormReturn<T> => {
  const [value, setValue] = useState(defaultValue);

  const setImpl = <K extends Keyof<T>>(
    key: K,
    next: T[K] | ((prev: T[K]) => T[K]),
  ) => {
    setValue((prev) => {
      const prevField = prev[key];
      const nextField = next instanceof Function ? next(prevField) : next;

      return Object.is(prevField, nextField)
        ? prev
        : { ...prev, [key]: nextField };
    });
  };

  const set = <K extends Keyof<T>>(
    key: K,
    next: T[K] | ((prev: T[K]) => T[K]) | typeof UNSET = UNSET,
  ) => {
    if (next === UNSET) {
      return (n: T[K] | ((prev: T[K]) => T[K])) => setImpl(key, n);
    }
    return setImpl(key, next);
  };

  return {
    value,
    set: set as useFormReturn<T>["set"],
  };
};

export default useForm;
