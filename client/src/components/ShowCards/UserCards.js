import React, { useEffect, useState } from "react";

import UserService from "../../services/user.service";
import EventBus from "../common/EventBus";
import CardTable from "./CardTable";
import Error from "./Error";

const UserCards = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [errorContent, setErrorContent] = useState("");
  const [cards, setCards] = useState([]);

  // Get all Cards from the database
  // useEffect(() => {
  //   async function getCards() {
  //     const response = await fetch(`http://localhost:5000/cards`);

  //     if (!response.ok) {
  //       const message = `An error occurred: ${response.statusText}`;
  //       window.alert(message);
  //       return;
  //     }

  //     const cards = await response.json();
  //     setCards(cards);
  //   }

  //   getCards();

  //   return;
  // }, [cards.length]);

  useEffect(() => {
    UserService.getUserCards().then(
      (response) => {
        setCards(response.data);
        setIsLoggedIn(true);
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
        setIsLoggedIn(false);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <CardTable cards={cards} />
      ) : (
        <Error errorContent={errorContent} />
      )}
    </div>
  );
};

export default UserCards;
