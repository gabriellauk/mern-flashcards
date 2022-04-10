import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";

const Welcome = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getWelcome().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  let navigate = useNavigate();
  
  const goTo = (page) => {
    navigate(page)
  }

  return (
    <React.Fragment>
      <section className="container py-5 h-100">
        <h2 className="display-5 text-white py-2">
          Welcome to Flashcards, an online learning tool to help you memorise
          new concepts.
        </h2>

        <div className="row gy-2">
          <div className="col-md-auto">
            <button type="button" className="btn btn-dark px-3 fs-3 button-100" onClick={() => goTo("../../card-session")}>
              <i className="bi bi-play-circle-fill" title="Start session"></i>
              <span> Start session</span>
            </button>
          </div>
          <div className="col-md-auto">
            <button type="button" className="btn btn-dark px-3 fs-3 button-100" onClick={() => goTo("../../manage-active-cards")}>
              <i className="bi bi-pencil-square" title="Manage cards"></i>
              <span> Manage cards</span>
            </button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default Welcome;
