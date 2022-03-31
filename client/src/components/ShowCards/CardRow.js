import React from "react";
import { Link } from "react-router-dom";

// Define table row for each Card
const CardRow = (props) => (
  <React.Fragment>
    <div className="col-lg-4 col-md-6">
      <div className="card rounded h-100 p-4">
        <div className="pull-right">
          <Link to={`/edit/${props.card["_id"]}`}>
            <i className="bi bi-pencil-fill fs-4 float-end link-dark"></i>
          </Link>
        </div>
        <div className="card-body text-center py-4">{props.card.frontText}</div>
      </div>
    </div>
  </React.Fragment>
);

export default CardRow;
