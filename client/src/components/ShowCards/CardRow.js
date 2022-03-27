import React from "react";
import { Link } from "react-router-dom";

// Define table row for each Card
const CardRow = (props) => (
  <tr>
    <td>{props.card.frontText}</td>
    <td>{props.card.backText}</td>
    <td>{props.card["_id"]}</td>
    <td>
      <Link to={`/edit/${props.card["_id"]}`}>Edit</Link> |
      <button
        onClick={() => {
          props.deleteCard(props.card["_id"]);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default CardRow;
