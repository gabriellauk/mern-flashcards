import React, { useEffect, useState, useMemo } from "react";

import UserService from "../../services/user.service";
import EventBus from "../common/EventBus";
import ActiveCardsList from "./ActiveCardsList";
import Error from "./Error";
import NoActiveCards from "./NoActiveCards";

const UserCards = (props) => {
  const [errorContent, setErrorContent] = useState("");
  const [activeCards, setActiveCards] = useState([]);

  const hasActiveCards = useMemo(() => activeCards.length > 0, [activeCards]);

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

  if (!hasActiveCards) {
    return <NoActiveCards />;
  } else {
    return (
      <div>
        {!errorContent ? (
          <ActiveCardsList
            activeCards={activeCards}
            onDelete={getActiveCards}
            currentUser={props.currentUser}
          />
        ) : (
          <Error errorContent={errorContent} />
        )}
      </div>
    );
  }
};

export default UserCards;
