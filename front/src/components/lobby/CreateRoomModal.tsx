import { Button, Dialog, Flex } from "@radix-ui/themes";
import { find, identity, isNil, map, negate } from "lodash-es";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useForm from "../../hooks/useForm";
import { CreateRoomSchema } from "../../models/room";
import { useCreateRoom } from "../../queries/room";
import { label1 } from "../../styles/text.style";
import { fromZod } from "../../utils/zod";
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

  const [error, setError] = useState({
    slug: null as string | null,
    kind: null as string | null,
    capacity: null as string | null,
  });

  const createRoom = useCreateRoom();
  const navigate = useNavigate();

  useEffect(() => {
    setError({ slug: null, kind: null, capacity: null });
  }, [...map(form, identity)]);

  const handleForm = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = CreateRoomSchema.safeParse({
      ...form,
      capacity: Number(form.capacity),
    });

    if (!parsed.success) {
      setError((prev) => ({ ...prev, ...fromZod(parsed.error.issues) }));

      const error_msg = find(error, negate(isNil));
      toast.error(error_msg);

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
        <Dialog.Description size="2" mb="4">
          방 정보를 입력하여 방을 만들 수 있습니다.
        </Dialog.Description>
        <form onSubmit={handleForm}>
          <Flex direction="column" gap="2">
            <label>
              <LabelInput
                labelStyle={label1}
                id="slug"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                label="방 이름"
                placeholder="방 이름을 입력하세요"
              />
            </label>
            <label>
              <LabelSelect
                labelStyle={label1}
                label="게임 종류"
                options={gameKindOptions}
                defaultValue="the-game"
                value={form.kind}
                onChange={set("kind")}
              />
            </label>
            <label>
              <LabelSelect
                labelStyle={label1}
                label="게임 인원"
                options={capacityOptions}
                defaultValue="1"
                value={form.capacity}
                onChange={set("capacity")}
              />
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                취소
              </Button>
            </Dialog.Close>
            <Button type="submit">만들기</Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateRoomDialog;
