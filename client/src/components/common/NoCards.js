import React from "react";
import { useNavigate } from "react-router-dom";

import ButtonIcon from "../Layout/ButtonIcon";

const NoCards = () => {
  let navigate = useNavigate();

  const goTo = (page) => {
    navigate(page);
  };

  return (
    <React.Fragment>
      <section className="container py-5 h-100">
        <h2 className="display-5 text-white py-2">
          You don't have any active cards at the moment.
        </h2>

        {/* Add card button */}
        <div className="row gy-2">
          <div className="col-md-auto">
            <ButtonIcon
              action={() => goTo("../../add-card")}
              content="Add card"
              icon="bi-plus-circle-fill"
            />
          </div>
          {/* Manage inactive cards button */}
          <div className="col-md-auto">
            <ButtonIcon
              action={() => goTo("../../manage-inactive-cards")}
              content="Manage inactive cards"
              icon="bi-pencil-square"
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default NoCards;
