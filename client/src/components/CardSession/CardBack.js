import React from "react";

const CardBack = (props) => {
  return (
    <div className="row gy-4 justify-content-center py-5 h-100">
      <div className="col-lg-11 col-md-12 row gy-4 mt-0">
        <div className="card rounded p-4 h-100 align-self-center">
          <div className="card-body text-center py-4 d-flex flex-column">
            <span className="display-1 pb-2 text-primary">ANSWER</span>
            <div className="fs-1 d-flex  align-items-center align-self-center h-100">
              <span>{props.displayedCard.backText}</span>
            </div>
            <div className="mt-auto">
              <span>
                <i
                  className="bi bi-eye-slash fs-1 float-start link-dark"
                  onClick={props.hideCard}
                  title="Don't show again"
                ></i>

                <i
                  className="bi bi-chevron-double-right fs-1 float-end"
                  onClick={props.nextCard}
                  title="Next card"
                ></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBack;
