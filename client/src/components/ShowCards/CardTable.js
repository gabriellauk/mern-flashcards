import React from "react";

import CardRow from "./CardRow";
import { useState } from "react";

const CardTable = (props) => {
  const [cards, setCards] = useState(props.cards);

  // Define function to delete a Card
  async function deleteCard(id) {
    await fetch(`http://localhost:5000/cards/remove/${id}`, {
      method: "DELETE",
    });

    const newCards = props.cards.filter((el) => el._id !== id);
    setCards(newCards);
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
