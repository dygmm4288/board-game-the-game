import { Box, Text, TextField } from "@radix-ui/themes";
import type { ChangeEvent } from "react";
type Props = {
  label: string;
  id: string;
  type?:
    | "number"
    | "search"
    | "time"
    | "text"
    | "hidden"
    | "tel"
    | "url"
    | "email"
    | "date"
    | "datetime-local"
    | "month"
    | "password"
    | "week"
    | undefined;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function LabelInput({
  label,
  id,
  type,
  value,
  placeholder,
  onChange,
}: Props) {
  return (
    <Box>
      <Text as='label' htmlFor={id}>
        {label}
      </Text>
      <TextField.Root
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Box>
  );
}
