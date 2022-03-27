import React, { useState } from "react";
import { useNavigate } from "react-router";

const CreateCard = () => {
  const [form, setForm] = useState({
    frontText: "",
    backText: "",
  });

  const navigate = useNavigate();

  // Update the state properties
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  console.log(form);

  async function onSubmit(e) {
    e.preventDefault();

    // Create Card in the database

    const newCard = { ...form };
    console.log("New Card:", newCard);

    await fetch("http://localhost:5000/cards/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ frontText: "", backText: "" });
    navigate("/");
  }

  return (
    <div>
      <h3>Add New Card</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="frontText">Question</label>
          <input
            type="text"
            className="form-control"
            id="frontText"
            value={form.frontText}
            onChange={(e) => updateForm({ frontText: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="backText">Answer</label>
          <input
            type="text"
            className="form-control"
            id="backText"
            value={form.backText}
            onChange={(e) => updateForm({ backText: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Add" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default CreateCard;
