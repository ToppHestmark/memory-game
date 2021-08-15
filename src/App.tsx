import React, { useEffect, useState } from "react";
import Card from "./components/Card";

import { createBoard, CardType } from "./setup";
import { shuffleArray } from "./utils";

import { Grid } from "./App.styles";

const App = () => {
  const TIMEOUT_CARD = 1000;

  const [cards, setCards] = useState<CardType[]>(shuffleArray(createBoard()));
  const [gameWon, setGameWon] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [clickedCard, setClickedCard] = useState<undefined | CardType>(
    undefined
  );

  useEffect(() => {
    if (matchedPairs === cards.length / 2) {
      console.log("You WIN!");
      setGameWon(true);
    }
  }, [matchedPairs]);

  const handleCardClick = (currentlySelectedCard: CardType) => {
    // Flip the card
    setCards((prev) =>
      prev.map((card) =>
        card.id === currentlySelectedCard.id
          ? { ...card, flipped: true, clickable: false }
          : card
      )
    );

    // If this first card is flipped, keep it flipped
    if (!clickedCard) {
      setClickedCard({ ...currentlySelectedCard });
      return;
    }

    // Checked the second selected card for match
    if (clickedCard.matchingCardId === currentlySelectedCard.id) {
      setMatchedPairs((prev) => prev + 1);
      setCards((prev) =>
        prev.map((card) =>
          card.id === clickedCard.id || card.id === currentlySelectedCard.id
            ? { ...card, clickable: false }
            : card
        )
      );
      setClickedCard(undefined);
      return;
    }

    // If not matched pairs, wait one sec and flip the card back
    setTimeout(() => {
      setCards((prev) =>
        prev.map((card) =>
          card.id === clickedCard.id || card.id === currentlySelectedCard.id
            ? { ...card, flipped: false, clickable: true }
            : card
        )
      );
    }, TIMEOUT_CARD);

    setClickedCard(undefined);
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
