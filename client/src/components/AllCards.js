import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define table row for each Card
const Card = (props) => (
  <tr>
    <td>{props.card.frontText}</td>
    <td>{props.card.backText}</td>
    <td>{props.card["_id"]}</td>
    <td>
      <Link to={`/edit/${props.card["_id"]}`}>
        Edit
      </Link>{" "}
      |
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

const AllCards = () => {
  const [cards, setCards] = useState([]);

  // Get all Cards from the database
  useEffect(() => {
    async function getCards() {
      const response = await fetch(`http://localhost:5000/cards`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const cards = await response.json();
      setCards(cards);
    }

    getCards();

    return;
  }, [cards.length]);

  console.log(cards);

  // Define function to delete a Card
  async function deleteCard(id) {
    await fetch(`http://localhost:5000/cards/remove/${id}`, {
      method: "DELETE",
    });

    const newCards = cards.filter((el) => el._id !== id);
    setCards(newCards);
  }

  // Maps all Cards to a Card component
  function cardList() {
    return cards.map((card) => {
      return (
        <Card
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

export default AllCards;
