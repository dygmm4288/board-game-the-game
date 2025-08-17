import { Text } from "@radix-ui/themes";
import type { SelectProps } from "./Select";
import Select from "./Select";

interface Props extends SelectProps {
  label: string;
}
const LabelSelect = ({ label, options, defaultValue }: Props) => {
  return (
    <>
      <Text as='div' size='2' mb='1' weight='bold'>
        {label}
      </Text>
      <Select options={options} defaultValue={defaultValue} />
    </>
  );
};

export default LabelSelect;
