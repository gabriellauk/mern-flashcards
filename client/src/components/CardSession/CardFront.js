import React from "react";

// Shows the question and flip card button

const CardFront = (props) => {
  return (
    <div className="row gy-4 justify-content-center py-5 h-100">
      <div className="col-lg-11 col-md-12 row gy-4 mt-0">
        <div className="card rounded p-4 h-100 align-self-center bg-white">
          <div className="card-body text-center py-4 d-flex flex-column">
            <span className="display-1 pb-2 text-primary">QUESTION</span>
            <div className="fs-1 d-flex  align-items-center align-self-center h-100">
              <span>{props.displayedCard.frontText}</span>
            </div>
            <div className="mt-auto">
              <i
                className="bi bi-arrow-counterclockwise fs-1 float-end"
                onClick={() => props.flipCard()}
                title="Flip"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFront;
