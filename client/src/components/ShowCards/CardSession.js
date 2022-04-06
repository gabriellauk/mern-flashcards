import React, { useEffect, useState } from "react";

import UserService from "../../services/user.service";
import EventBus from "../common/EventBus";

const CardSession = (props) => {
  const [errorContent, setErrorContent] = useState("");
  const [activeCards, setActiveCards] = useState([]);
  const [displayedCard, setDisplayedCard] = useState({});

  const loadActiveCards = () => {
    UserService.getActiveCards().then(
      (response) => {
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
      return;
    }

    const [card, ...otherCards] = cards;
    setActiveCards(otherCards);

    setDisplayedCard(card);
  };

  return (
    <table>
      <tbody>
        <tr>
          <td>{displayedCard.frontText}</td>
          <td>{displayedCard.backText}</td>
          <td>
            {displayedCard["_id"]}
            <button onClick={() => configureNextCard(activeCards)}>Next</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CardSession;
