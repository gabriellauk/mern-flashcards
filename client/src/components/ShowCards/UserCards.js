import React, { useEffect, useState, useMemo } from "react";

import CardService from "../../services/card.service";
import ActiveCardsList from "./ActiveCardsList";
import Error from "./Error";
import NoActiveCards from "./NoActiveCards";

const UserCards = (props) => {
  const [errorContent, setErrorContent] = useState("");
  const [activeCards, setActiveCards] = useState([]);

  const hasActiveCards = useMemo(() => activeCards.length > 0, [activeCards]);

  const loadActiveCards = async () => {
    try {
      const cards = await CardService.getActiveCards();
      setActiveCards(cards);
    } catch (error) {
      const errorMessage = error.message || error.toString();
      setErrorContent(errorMessage);
    }
  };

  useEffect(() => {
    loadActiveCards();
  }, []);

  if (!hasActiveCards) {
    return <NoActiveCards />;
  } else {
    return (
      <div>
        {!errorContent ? (
          <ActiveCardsList
            activeCards={activeCards}
            onDelete={loadActiveCards}
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
