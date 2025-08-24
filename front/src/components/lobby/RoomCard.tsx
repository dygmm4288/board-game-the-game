import { Flex } from "@radix-ui/themes";

type Props = {
  gameId: string;
  slug: string | null;
};

export default function RoomCard({ gameId, slug }: Props) {
  return <Flex key={gameId}>RoomCard : {slug}</Flex>;
}
