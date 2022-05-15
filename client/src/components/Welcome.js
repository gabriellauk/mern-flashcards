import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";

import ButtonIcon from "./Layout/ButtonIcon";

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
    navigate(page);
  };

  return (
    <React.Fragment>
      <section className="container py-5 h-100">
        <h2 className="display-5 text-white py-2">
          Hi there, what would you like to do right now?
        </h2>

        <div className="row gy-2">
          <div className="col-md-auto">
            <ButtonIcon
              action={() => goTo("../../card-session")}
              content="Start session"
              icon="bi-play-circle-fill"
            />
          </div>
          <div className="col-md-auto">
            <ButtonIcon
              action={() => goTo("../../manage-active-cards")}
              content="Manage cards"
              icon="bi-pencil-square"
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default Welcome;
