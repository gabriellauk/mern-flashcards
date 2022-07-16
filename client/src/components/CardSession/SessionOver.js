import React from "react";

import ButtonIcon from "../Layout/ButtonIcon";

// Tells the user they have no active cards left
// And prompts them to start a new session

const SessionOver = (props) => {
  return (
    <React.Fragment>
      <section className="container py-5 h-100">
        <h2 className="display-5 text-white py-2">
          You've gone through all your cards.
        </h2>

        <div className="row gy-2">
          <div className="col-md-auto">
            <ButtonIcon
              action={props.newSession}
              content="Start another session"
              icon="bi-play-circle-fill"
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default SessionOver;
