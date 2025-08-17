import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import LabelInput from "../form/LabelInput";
import Select from "../form/Select";

const CreateRoomDialog = () => {
  const capacityOptions = ["1", "2", "3", "4", "5"];

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>방 만들기</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>방 만들기</Dialog.Title>
        <Dialog.Description size='2' mb='4'>
          방 정보를 입력하여 방을 만들 수 있습니다.
        </Dialog.Description>
        <form>
          <Flex direction='column' gap='2'>
            <LabelInput
              id=''
              value=''
              onChange={() => {}}
              label='방 이름'
              placeholder='방 이름을 입력하세요'
            />
            <label>
              <Text as='div' size='2' mb='1' weight='bold'>
                게임인원
              </Text>
              <Select options={capacityOptions} defaultValue='1' />
            </label>
          </Flex>
          <Flex gap='3' mt='4' justify='end'>
            <Dialog.Close>
              <Button variant='soft' color='gray'>
                취소
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>만들기</Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateRoomDialog;
