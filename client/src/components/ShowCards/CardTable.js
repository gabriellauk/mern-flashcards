import React from "react";

import CardRow from "./CardRow";
import { useState } from "react";

import UserService from "../../services/user.service";
import EventBus from "../common/EventBus";

const CardTable = (props) => {
  const [cards, setCards] = useState(props.cards);

  async function deleteCard(id) {
    UserService.deleteCard(id).then(
      (response) => {
        props.onDelete();
      },
      (error) => {
        const _errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        // setErrorContent(_errorMessage);
        console.log(_errorMessage);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  // Maps all Cards to a Card component
  function cardList() {
    return props.cards.map((card) => {
      return (
        <CardRow
          card={card}
          deleteCard={() => deleteCard(card["_id"])}
          key={card["_id"]}
        />
      );
    });
  }

  return (
    <div>
      <h3>Card List</h3>
      <table>
        <thead>
          <tr>
            <th>frontText</th>
            <th>backText</th>
            <th>ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{cardList()}</tbody>
      </table>
    </div>
  );
};

export default CardTable;
