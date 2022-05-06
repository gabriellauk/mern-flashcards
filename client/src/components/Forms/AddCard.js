import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import UserService from "../../services/user.service";

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

  // Create Card in the database
  const onSubmit = async (e) => {
    e.preventDefault();

    const newCard = { ...form };

    try {
      await UserService.addCard(newCard);
      setForm({ frontText: "", backText: "" });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <div className="row gy-4 justify-content-center">
          <section className="container pt-5">
            <h2 className="display-5 text-white text-center">
              Add new flashcard
            </h2>
          </section>

          <div className="col-lg-6 col-md-12 row gy-4 mt-0">
            <div className="card rounded custom-form-card-height p-4">
              <div className="card-body text-center py-4">
                <label htmlFor="frontText" className="display-6 pb-2">
                  QUESTION
                </label>
                <textarea
                  type="text"
                  id="frontText"
                  placeholder="Type here..."
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
                  placeholder="Type here..."
                  maxLength="300"
                  value={form.backText}
                  className={(["h-100"], ["border-0"])}
                  onChange={(e) => updateForm({ backText: e.target.value })}
                />
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
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddCard;
