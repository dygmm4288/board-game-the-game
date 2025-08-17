import { Button, Flex } from "@radix-ui/themes";
import CreateRoomDialog from "./CreateRoomModal";

const RoomBtns = () => {
  return (
    <Flex gap='2' direction='row'>
      <CreateRoomDialog />
      <Button>코드로 참여</Button>
    </Flex>
  );
};

export default RoomBtns;
