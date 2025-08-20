import { useState } from "react";

type Props = {
  defaultValue?: string;
  onChange: (value: string) => void;
};

const useInput = ({ defaultValue, onChange }: Props) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: string) => {
    onChange(newValue);
    setValue(newValue);
  };

  return {
    value,
    handleChange,
  };
};

export default useInput;
