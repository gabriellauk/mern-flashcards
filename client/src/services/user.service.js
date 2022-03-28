import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getUserCards = () => {
  return axios.get(API_URL + "userCards", { headers: authHeader() });
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
  return axios.delete(API_URL + "deleteCard" + "/" + id, {
    headers: authHeader(),
  });
};

export default {
  getPublicContent,
  getUserBoard,
  getUserCards,
  addCard,
  deleteCard,
};
