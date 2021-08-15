import React, { useState } from "react";
import Card from "./components/Card";

import { createBoard, CardType } from "./setup";
import { shuffleArray } from "./utils";

import { Grid } from "./App.styles";

const App = () => {
  const [cards, setCards] = useState<CardType[]>(shuffleArray(createBoard()));
  const [gameWon, setGameWon] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [clickedCard, setClickedCard] = useState<undefined | CardType>(
    undefined
  );

  const handleCardClick = () => {
    console.log("Clicked");
  };

  return (
    <div>
      <Grid>
        {cards.map((card) => (
          <Card key={card.id} card={card} callback={handleCardClick} />
        ))}
      </Grid>
    </div>
  );
};

export default App;
