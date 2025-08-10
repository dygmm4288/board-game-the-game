import { Flex } from "@radix-ui/themes";

type Props = {
  gameId: string;
};

export default function RoomCard({ gameId }: Props) {
  return <Flex>RoomCard : {gameId}</Flex>;
}
