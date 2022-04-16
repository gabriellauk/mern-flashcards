import React, { useState, useEffect, Fragment } from "react";

import UserService from "../../services/user.service";
import EventBus from "../common/EventBus";

import CardFront from "./CardFront";
import CardBack from "./CardBack";

const Card = (props) => {
  const [nextPressed, setNextPressed] = useState(false);

  const flipCard = () => {
    props.setCardFront(false);
  };

  const nextCard = () => {
    props.setCardFront(true);
    setNextPressed(true);
    props.configureNextCard(props.activeCards);
  };

  // Update Card in the database
  async function hideCard() {
    const id = props.displayedCard._id;

    const updatedCardStatus = { active: false };

    UserService.updateCardStatus(id, updatedCardStatus).then(
      (response) => {
        props.setCardFront(true);
        props.configureNextCard(props.activeCards);
      },

      (error) => {
        const _errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        // setErrorContent(_errorMessage);
        console.log(_errorMessage);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  return (
    <React.Fragment>
      {props.cardFront ? (
        <CardFront displayedCard={props.displayedCard} flipCard={flipCard} />
      ) : (
        <CardBack
          displayedCard={props.displayedCard}
          hideCard={hideCard}
          nextCard={nextCard}
        />
      )}
    </React.Fragment>
  );
};

export default Card;
