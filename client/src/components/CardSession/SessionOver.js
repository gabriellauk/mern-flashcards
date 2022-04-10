import React from "react";

const SessionOver = (props) => {
  return (
    <React.Fragment>
      <section className="container py-5 h-100">
        <h2 className="display-5 text-white py-2">
          You've gone through all your cards.
        </h2>

        <div className="row gy-2">
          <div className="col-md-auto">
            <button
              type="button"
              className="btn btn-dark px-3 fs-3 button-100"
              onClick={props.newSession}
            >
              <i className="bi bi-play-circle-fill" title="Start session"></i>
              <span> Start another session</span>
            </button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default SessionOver;
