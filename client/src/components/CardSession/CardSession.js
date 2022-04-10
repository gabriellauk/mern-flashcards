import React, { useEffect, useState } from "react";

import UserService from "../../services/user.service";
import EventBus from "../common/EventBus";

import Card from "./Card";
import SessionOver from "./SessionOver";
import NoCards from "./NoCards";

const CardSession = (props) => {
  const [errorContent, setErrorContent] = useState("");
  const [activeCards, setActiveCards] = useState([]);
  const [displayedCard, setDisplayedCard] = useState(null);
  const [cardFront, setCardFront] = useState(true);
  const [noCards, setNoCards] = useState(false);
  const [sessionOver, setSessionOver] = useState(false);

  const loadActiveCards = () => {
    UserService.getActiveCards().then(
      (response) => {
        const myCards = response.data;

        if (myCards.length === 0) {
          setNoCards(true);
          return;
        }

        const randomOrder = randomiseActiveCards(response.data);
        configureNextCard(randomOrder);
      },

      (error) => {
        const _errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setErrorContent(_errorMessage);
        console.log(_errorMessage);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  };

  useEffect(loadActiveCards, []);

  const randomiseActiveCards = (cards) => {
    let currentIndex = cards.length,
      randomIndex;

    while (currentIndex != 0) {
      // Select a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap it with the current element
      [cards[currentIndex], cards[randomIndex]] = [
        cards[randomIndex],
        cards[currentIndex],
      ];
    }

    return cards;
  };

  const configureNextCard = (cards) => {
    if (cards.length === 0) {
      setSessionOver(true);
      return;
    }

    const [card, ...otherCards] = cards;

    setActiveCards(otherCards);

    setDisplayedCard(card);
  };

  const newSession = () => {
    setSessionOver(false);
    loadActiveCards();
  };

  if (noCards) {
    return <NoCards />;
  }
  if (sessionOver) {
    return <SessionOver newSession={newSession} />;
  }
  if (displayedCard !== null) {
    return (
      <Card
        displayedCard={displayedCard}
        configureNextCard={configureNextCard}
        activeCards={activeCards}
        cardFront={cardFront}
      ></Card>
    );
  }

  return <div></div>;
};

export default CardSession;
