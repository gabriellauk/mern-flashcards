import React from "react";
import { Link } from "react-router-dom";

const InactiveCardItem = (props) => (
  <React.Fragment>
    <div className="col-lg-4 col-md-6">
      <div className="card rounded custom-card-listings-height p-4">
        <div className="pull-right">
          <Link to={`/edit/${props.card["_id"]}`}>
            <i className="bi bi-pencil-fill fs-4 float-end link-dark" title="Edit"></i>
          </Link>
        </div>
        <div className="card-body text-center pb-1 px-0 pt-0">{props.card.frontText}</div>
      </div>
    </div>
  </React.Fragment>
);

export default InactiveCardItem;
