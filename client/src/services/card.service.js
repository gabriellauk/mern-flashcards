import axios from "axios";
import authHeader from "./auth-header";
import handleError from "./error-handler";

const API_URL = process.env.REACT_APP_CARD_API_URL;

// Fetch the active cards for the user
const getActiveCards = async () => {
  try {
    return (await axios.get(API_URL + "activeCards", { headers: authHeader() }))
      .data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Fetch the inactive cards for the user
const getInactiveCards = async () => {
  try {
    return (
      await axios.get(API_URL + "inactiveCards", { headers: authHeader() })
    ).data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Save a new card
const addCard = async (reqBody) => {
  const myAuthHeader = authHeader();

  const headers = {
    ...myAuthHeader,
    "Content-Type": "application/json",
  };
  try {
    return (await axios.post(API_URL + "addCard", reqBody, { headers })).data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Delete a card
const deleteCard = async (id) => {
  try {
    return (
      await axios.delete(API_URL + "deleteCard/" + id, {
        headers: authHeader(),
      })
    ).data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Fetch a specific card by ID
const getSpecificCard = async (idStringified) => {
  try {
    return (
      await axios.get(API_URL + "cards/" + idStringified, {
        headers: authHeader(),
      })
    ).data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Update a specific card by ID
const updateCard = async (idStringified, reqBody) => {
  const myAuthHeader = authHeader();

  const headers = {
    ...myAuthHeader,
    "Content-Type": "application/json",
  };
  try {
    return (
      await axios.post(API_URL + "cards/update/" + idStringified, reqBody, {
        headers,
      })
    ).data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Change the status of a card to inactive or active
const updateCardStatus = async (idStringified, reqBody) => {
  const myAuthHeader = authHeader();

  const headers = {
    ...myAuthHeader,
    "Content-Type": "application/json",
  };
  try {
    return (
      await axios.post(
        API_URL + "cards/updateCardStatus/" + idStringified,
        reqBody,
        {
          headers,
        }
      )
    ).data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const CardService = {
  getActiveCards,
  getInactiveCards,
  addCard,
  deleteCard,
  getSpecificCard,
  updateCard,
  updateCardStatus,
};

export default CardService;
