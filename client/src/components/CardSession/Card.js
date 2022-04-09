import React, { useState, useEffect } from "react";

const Card = (props) => {
  const [cardFront, setCardFront] = useState(props.cardFront);

  const flipCard = () => {
    setCardFront(false);
  };

  const nextCard = () => {
    setCardFront(true);
    props.configureNextCard(props.activeCards);
  };

  return (
    <div className="row gy-4 justify-content-center py-5">
      <div className="col-lg-11 col-md-12 row gy-4 mt-0">
        <div className="card rounded custom-card-session-height p-4">
          <div className="card-body text-center py-4 d-flex flex-column">
            <span className="display-1 pb-2 text-primary">QUESTION</span>
            <div className="fs-1 d-flex  align-items-center align-self-center h-100">
              {cardFront ? (
                <span>{props.displayedCard.frontText}</span>
              ) : (
                <span>{props.displayedCard.backText}</span>
              )}
            </div>
            <div className="mt-auto">
              {cardFront ? (
                <i
                  className="bi bi-arrow-counterclockwise fs-1 float-end"
                  onClick={() => flipCard()}
                  title="Flip"
                ></i>
              ) : (
                <span>
                  <i
                    className="bi bi-eye-slash fs-1 float-start link-dark"
                    title="Don't show again"
                  ></i>

                  <i
                    className="bi bi-chevron-double-right fs-1 float-end"
                    onClick={nextCard}
                    title="Next card"
                  ></i>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
