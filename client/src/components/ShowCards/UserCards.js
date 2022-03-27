import React, { useEffect, useState } from "react";

import UserService from "../../services/user.service";
import EventBus from "../common/EventBus";
import CardTable from "./CardTable";
import Error from "./Error";

const UserCards = () => {
  const [errorContent, setErrorContent] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    UserService.getUserCards().then(
      (response) => {
        setCards(response.data);
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
  }, []);

  console.log(cards);

  return (
    <div>
      {!errorContent ? (
        <CardTable cards={cards} />
      ) : (
        <Error errorContent={errorContent} />
      )}
    </div>
  );
};

export default UserCards;
