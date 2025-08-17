import { Text } from "@radix-ui/themes";
import type { LabelStyle } from "../../types/style.type";
import type { SelectProps } from "./Select";
import Select from "./Select";

interface Props extends SelectProps {
  label: string;
  labelStyle: LabelStyle;
}
const LabelSelect = ({ label, labelStyle, options, defaultValue }: Props) => {
  return (
    <>
      <Text
        as='div'
        size={labelStyle.textSize}
        mb='2'
        weight={labelStyle.textWeight}>
        {label}
      </Text>
      <Select options={options} defaultValue={defaultValue} />
    </>
  );
};

export default LabelSelect;
