import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import UserService from "../../services/user.service";
import EventBus from "../common/EventBus";

const AddCard = (props) => {
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

  // Create Card in the database
  async function onSubmit(e) {
    e.preventDefault();

    const newCard = { ...form };

    UserService.addCard(newCard).then(
      (response) => {
        setForm({ frontText: "", backText: "" });
        navigate("/");
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

export default AddCard;
