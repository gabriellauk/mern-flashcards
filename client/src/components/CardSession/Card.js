import React, { useRef } from "react";

import CardService from "../../services/card.service";

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

  // Set the card as inactive, then move on to the next one
  const hideCard = async () => {
    const id = props.displayedCard._id;

    const updatedCardStatus = { active: false };

    try {
      await CardService.updateCardStatus(id, updatedCardStatus);
    } catch (error) {
      console.log(error.message);
    }

    props.setCardFront(true);
    props.configureNextCard(props.activeCards);
  };

  const nodeRef = useRef(null);

  return (
    <React.Fragment>
      <SwitchTransition>
        {/* Fade transition effect, front / back status controlled by state */}
        <CSSTransition
          nodeRef={nodeRef}
          timeout={300}
          key={props.cardFront}
          classNames="fade"
        >
          <div ref={nodeRef} className="h-100">
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
                nodeRef={nodeRef}
              />
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </React.Fragment>
  );
};

export default Card;
