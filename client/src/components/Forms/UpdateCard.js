import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import UserService from "../../services/user.service";

const UpdateCard = () => {
  const [form, setForm] = useState({
    frontText: "",
    backText: "",
    active: false,
  });

  const params = useParams();
  const navigate = useNavigate();

  const getCard = async () => {
    const id = params.id;
    try {
      const result = await UserService.getSpecificCard(id);
      setForm(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(getCard, []);

  // Update the state
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const deleteCard = async () => {
    try {
      await UserService.deleteCard(params.id);
      navigate("/manage-active-cards");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Update Card in the database
  const onSubmit = async (e) => {
    e.preventDefault();

    const id = params.id;

    const updatedCard = { ...form };

    try {
      await UserService.updateCard(id, updatedCard);
    } catch (error) {
      console.log(error.message);
    }

    navigate("/manage-active-cards");
  };

  return (
    <React.Fragment>
      <div className="row gy-4">
        <div className="col-lg-6 col-md-12 row gy-4 mt-0 mx-auto">
          <section className="container">
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
