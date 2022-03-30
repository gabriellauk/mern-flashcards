import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import UserService from "../../services/user.service";
import EventBus from "../common/EventBus";

const UpdateCard = (props) => {
  const [form, setForm] = useState({
    frontText: "",
    backText: "",
    active: false,
  });

  const params = useParams();
  const navigate = useNavigate();

  async function getCard() {
    const id = params.id;
    UserService.getSpecificCard(id).then(
      (response) => {
        setForm(response.data);
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

  useEffect(getCard, []);

  // Update the state
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function deleteCard() {
    UserService.deleteCard(params.id).then(
      (response) => {
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

  // Update Card in the database
  async function onSubmit(e) {
    e.preventDefault();

    const id = params.id;

    const updatedCard = { ...form };

    UserService.updateCard(id, updatedCard).then(
      (response) => {
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
      <h3>Edit Card</h3>

      <button
        onClick={deleteCard}
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

export default UpdateCard;
