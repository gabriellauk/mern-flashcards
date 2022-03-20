import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const ViewCard = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  const [card, setCard] = useState([]);

  // Get specific Card from the database
  useEffect(() => {
    async function getCard() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/cards/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const card = await response.json();

      if (!card) {
        window.alert(`Card with id ${id} not found`);
        navigate("/");
        return;
      }

      setCard(card);
    }

    getCard();

    return;
  }, [params.id, navigate]);

  return (
    <table>
      <tr>
        <td>{card.frontText}</td>
        <td>{card.backText}</td>
        <td>{card["_id"]}</td>
        <td>{card.active === true ? <p>active</p> : <p>inactive</p>}</td>
      </tr>
    </table>
  );
};

export default ViewCard;
