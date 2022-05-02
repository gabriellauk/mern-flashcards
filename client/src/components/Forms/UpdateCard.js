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
        navigate("/manage-active-cards");
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
        navigate("/manage-active-cards");
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
    <React.Fragment>
      <div className="row gy-4">
        <div className="col-lg-6 col-md-12 row gy-4 mt-0 mx-auto">
          <section className="container pt-5">
            <h2 className="display-5 text-white text-center float-start">
              Edit flashcard
            </h2>
            <i
              className="bi bi-trash3-fill fs-1 float-end link-dark"
              title="Delete"
              onClick={deleteCard}
            ></i>
          </section>
        </div>

        <form onSubmit={onSubmit}>
          <div className="col-lg-6 col-md-12 row gy-4 mt-0 mx-auto">
            <div className="card rounded custom-form-card-height p-4">
              <div className="card-body text-center py-4">
                <label htmlFor="frontText" className="display-6 pb-2">
                  QUESTION
                </label>
                <textarea
                  type="text"
                  id="frontText"
                  maxLength="300"
                  autoFocus={true}
                  value={form.frontText}
                  className={(["h-100"], ["border-0"])}
                  onChange={(e) => updateForm({ frontText: e.target.value })}
                />
              </div>
            </div>

            <div className="card rounded custom-form-card-height p-4">
              <div className="card-body text-center py-4">
                <label htmlFor="backText" className="display-6 pb-2">
                  ANSWER
                </label>
                <textarea
                  type="text"
                  id="backText"
                  maxLength="300"
                  value={form.backText}
                  className={(["h-100"], ["border-0"])}
                  onChange={(e) => updateForm({ backText: e.target.value })}
                />
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col text-light fs-5">
                  <span className="me-2">Inactive</span>
                  <div className="form-check form-switch d-inline-block">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="active"
                      checked={form.active}
                      onChange={(e) => updateForm({ active: e.target.checked })}
                    />
                    <span className="ms-2">Active</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-dark px-3 fs-3"
              value="Save"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default UpdateCard;
