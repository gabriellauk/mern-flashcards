import axios from "axios";
import authHeader from "./auth-header";
import handleError from "./error-handler";

const API_URL = process.env.REACT_APP_CARD_API_URL;

const getActiveCards = async () => {
  try {
    return (await axios.get(API_URL + "activeCards", { headers: authHeader() }))
      .data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

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
