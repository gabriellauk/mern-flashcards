import React from "react";

import UserService from "../../services/user.service";
import EventBus from "../common/EventBus";

import CardFront from "./CardFront";
import CardBack from "./CardBack";

import { CSSTransition, SwitchTransition } from "react-transition-group";

const Card = (props) => {
  const flipCard = () => {
    props.setCardFront(false);
  };

  const nextCard = () => {
    props.setCardFront(true);

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
      <SwitchTransition>
        <CSSTransition timeout={300} key={props.cardFront} classNames="fade">
          {props.cardFront ? (
            <CardFront
              displayedCard={props.displayedCard}
              flipCard={flipCard}
            />
          ) : (
            <CardBack
              displayedCard={props.displayedCard}
              hideCard={hideCard}
              nextCard={nextCard}
            />
          )}
        </CSSTransition>
      </SwitchTransition>
    </React.Fragment>
  );
};

export default Card;
