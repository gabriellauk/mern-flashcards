import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const EditCard = (props) => {
  const [form, setForm] = useState({
    frontText: "",
    backText: "",
    active: "",
  });

  const params = useParams();
  const navigate = useNavigate();

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

      setForm(card);
    }

    getCard();

    return;
  }, [params.id, navigate]);

  // Define function to delete a Card
  async function deleteCard(id) {
    await fetch(`http://localhost:5000/cards/remove/${id}`, {
      method: "DELETE",
    });
    navigate("/");
  }

  // Update the state
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedCard = {
      frontText: form.frontText,
      backText: form.backText,
      active: form.active,
    };

    // Update the record in the database
    await fetch(`http://localhost:5000/cards/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedCard),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  return (
    <div>
      <h3>Edit Card</h3>

      <button
        onClick={() => {
          deleteCard(`${params.id}`);
        }}
      >
        Delete
      </button>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="frontText">Question: </label>
          <input
            type="text"
            id="frontText"
            value={form.frontText}
            onChange={(e) => updateForm({ frontText: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="position">Answer: </label>
          <input
            type="text"
            id="backText"
            value={form.backText}
            onChange={(e) => updateForm({ backText: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="active">
            Active?
            <input
              type="checkbox"
              id="active"
              checked={form.active}
              onChange={(e) => updateForm({ active: e.target.checked })}
            />
          </label>
        </div>

        <br />

        <div>
          <input type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
};

export default EditCard;
