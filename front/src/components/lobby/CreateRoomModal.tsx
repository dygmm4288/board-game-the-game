import { Button, Dialog, Flex } from "@radix-ui/themes";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { CreateRoomSchema } from "../../models/room";
import { useCreateRoom } from "../../queries/room";
import { label1 } from "../../styles/text.style";
import LabelInput from "../form/LabelInput";
import LabelSelect from "../form/LabelSelect";

const CreateRoomDialog = () => {
  const capacityOptions = ["1", "2", "3", "4", "5"];
  const gameKindOptions = [{ label: "더 게임", value: "the-game" }];

  const { value: form, set } = useForm({
    slug: "",
    kind: "the-game",
    capacity: "0",
  });
  const createRoom = useCreateRoom();
  const navigate = useNavigate();

  const handleForm = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = CreateRoomSchema.safeParse(form);

    if (!parsed.success) {
      return;
    }

    const { data: room } = await createRoom.mutateAsync(parsed.data);

    navigate(`/room/${room.id}`, { replace: true, state: { room } });
  };

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
        <form onSubmit={handleForm}>
          <Flex direction='column' gap='2'>
            <label>
              <LabelInput
                labelStyle={label1}
                id='slug'
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                label='방 이름'
                placeholder='방 이름을 입력하세요'
              />
            </label>
            <label>
              <LabelSelect
                labelStyle={label1}
                label='게임 종류'
                options={gameKindOptions}
                defaultValue='the-game'
                value={form.kind}
                onChange={set("kind")}
              />
            </label>
            <label>
              <LabelSelect
                labelStyle={label1}
                label='게임 인원'
                options={capacityOptions}
                defaultValue='1'
                value={form.capacity}
                onChange={set("capacity")}
              />
            </label>
          </Flex>
          <Flex gap='3' mt='4' justify='end'>
            <Dialog.Close>
              <Button variant='soft' color='gray'>
                취소
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type='submit'>만들기</Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateRoomDialog;
