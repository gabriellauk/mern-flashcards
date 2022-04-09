import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getActiveCards = () => {
  return axios.get(API_URL + "activeCards", { headers: authHeader() });
};

const getInactiveCards = () => {
  return axios.get(API_URL + "inactiveCards", { headers: authHeader() });
};

const addCard = (reqBody) => {
  const myAuthHeader = authHeader();

  const headers = {
    ...myAuthHeader,
    "Content-Type": "application/json",
  };

  return axios.post(API_URL + "addCard", reqBody, { headers });
};

const deleteCard = (id) => {
  return axios.delete(API_URL + "deleteCard/" + id, {
    headers: authHeader(),
  });
};

const getSpecificCard = (idStringified) => {
  return axios.get(API_URL + "cards/" + idStringified, {
    headers: authHeader(),
  });
};

const updateCard = (idStringified, reqBody) => {
  const myAuthHeader = authHeader();

  const headers = {
    ...myAuthHeader,
    "Content-Type": "application/json",
  };

  return axios.post(API_URL + "cards/update/" + idStringified, reqBody, {
    headers,
  });
};

const updateCardStatus = (idStringified, reqBody) => {
  const myAuthHeader = authHeader();

  const headers = {
    ...myAuthHeader,
    "Content-Type": "application/json",
  };

  return axios.post(API_URL + "cards/updatecardstatus/" + idStringified, reqBody, {
    headers,
  });
};

const getWelcome = () => {
  return axios.get(API_URL + "welcome", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getActiveCards,
  getInactiveCards,
  addCard,
  deleteCard,
  getSpecificCard,
  updateCard,
  updateCardStatus,
  getWelcome
};
