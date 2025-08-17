import { Text, TextField } from "@radix-ui/themes";
import type { ChangeEvent } from "react";
import type { LabelStyle } from "../../types/style.type";
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
  labelStyle: LabelStyle;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function LabelInput({
  label,
  id,
  type,
  value,
  placeholder,
  labelStyle,
  onChange,
}: Props) {
  return (
    <>
      <Text
        as='div'
        mb='2'
        size={labelStyle.textSize}
        weight={labelStyle.textWeight}>
        {label}
      </Text>
      <TextField.Root
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}
