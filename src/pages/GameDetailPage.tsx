import { useParams } from "react-router-dom";
import useGame from "../hooks/useGame";
import { Heading, Spinner } from "@chakra-ui/react";
import Expandable from "../components/Expandable";
import GameAttributes from "../components/GameAttributes";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);

  if (isLoading) return <Spinner />;

  if (error || !game) return <div>Error loading game details</div>;

  return (
    <>
      <Heading>{game.name}</Heading>
      <Expandable>{game.description_raw}</Expandable>
      <GameAttributes game={game} />
    </>
  );
};

export default GameDetailPage;
