import React from "react";
import { useNavigate } from "react-router-dom";

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

        <div className="row gy-2">
          <div className="col-md-auto">
            <button
              type="button"
              className="btn btn-dark px-3 fs-3 button-100"
              onClick={() => goTo("../../add-card")}
            >
              <i className="bi bi-plus-circle-fill" title="Add card"></i>
              <span> Add card</span>
            </button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default NoCards;
