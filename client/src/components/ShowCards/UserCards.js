import React, { useEffect, useState } from "react";

import UserService from "../../services/user.service";
import EventBus from "../common/EventBus";
import ActiveCardsList from "./ActiveCardsList";
import Error from "./Error";

const UserCards = (props) => {
  const [errorContent, setErrorContent] = useState("");
  const [activeCards, setActiveCards] = useState([]);

  const getActiveCards = () => {
    UserService.getActiveCards().then(
      (response) => {
        setActiveCards(response.data);
      },

      (error) => {
        const _errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setErrorContent(_errorMessage);
        console.log(_errorMessage);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  };

  useEffect(getActiveCards, []);

  return (
    <div>
      
      {!errorContent ? (
        <ActiveCardsList activeCards={activeCards} onDelete={getActiveCards} currentUser={props.currentUser} />
      ) : (
        <Error errorContent={errorContent} />
      )}
    </div>
  );
};

export default UserCards;
