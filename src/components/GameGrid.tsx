import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const GameGrid = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useGames();
  const skeletons = Array.from({ length: 8 }, (_, i) => i + 1);

  if (error) return <Text>{error.message}</Text>;

  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  const loadingSkeletons = {
    skeletons: skeletons.map((skeleton) => (
      <GameCardContainer key={skeleton}>
        <GameCardSkeleton />
      </GameCardContainer>
    )),
  };

  const gridProps = {
    columns: { sm: 1, md: 2, lg: 3, xl: 4 },
    spacing: 6,
  };

  return (
    <Box padding="10px">
      <InfiniteScroll
        dataLength={fetchedGamesCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={
          <SimpleGrid {...gridProps} marginTop={6}>
            {loadingSkeletons.skeletons}
          </SimpleGrid>
        }
      >
        <SimpleGrid {...gridProps}>
          {isLoading && loadingSkeletons.skeletons}
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((game) => (
                <GameCardContainer key={game.id}>
                  <GameCard game={game} />
                </GameCardContainer>
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </Box>
  );
};

export default GameGrid;
