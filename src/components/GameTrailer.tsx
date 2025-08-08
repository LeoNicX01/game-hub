import useTrailers from "../hooks/useTrailers";
import { Spinner } from "@chakra-ui/react";

interface Props {
  gameId: number;
}

const GameTrailer = ({ gameId }: Props) => {
  const { data, isLoading, error } = useTrailers(gameId);

  const first = data?.results[0];
  if (!first) return null;

  if (isLoading) return <Spinner />;

  return first ? (
    <video src={first.data[480]} poster={first.preview[480]} controls />
  ) : null;
};

export default GameTrailer;
