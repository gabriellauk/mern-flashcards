import React from "react";
import { useNavigate } from "react-router-dom";

import ButtonIcon from "./Layout/ButtonIcon";

const Welcome = () => {
  let navigate = useNavigate();

  const goTo = (page) => {
    navigate(page);
  };

  return (
    <React.Fragment>
      <section className="container py-5 h-100">
        <h2 className="display-5 text-white py-2">
          Hi there, what would you like to do right now?
        </h2>

        <div className="row gy-2">
          <div className="col-md-auto">
            <ButtonIcon
              action={() => goTo("../../card-session")}
              content="Start session"
              icon="bi-play-circle-fill"
            />
          </div>
          <div className="col-md-auto">
            <ButtonIcon
              action={() => goTo("../../manage-active-cards")}
              content="Manage cards"
              icon="bi-pencil-square"
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default Welcome;
