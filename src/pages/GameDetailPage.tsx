import { useParams } from "react-router-dom";
import useGame from "../hooks/useGame";
import { Spinner } from "@chakra-ui/react";

const GameDetailPage = () => {
  const { slug } = useParams();
  const {data: game, isLoading, error} = useGame(slug!);

  if (isLoading) return <Spinner />;

  if (error || !game) return <div>Error loading game details</div>;

  return (
    <div>
      <h1>{game.name}</h1>
      <p>{game.description_raw}</p>
    </div>
  );
};

export default GameDetailPage;
