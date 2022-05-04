import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

const register = async (username, email, password) => {
  return (
    await axios.post(API_URL + "signup", {
      username,
      email,
      password,
    })
  ).data;
};

const login = async (username, password) => {
  const result = (
    await axios.post(API_URL + "signin", {
      username,
      password,
    })
  ).data;

  if (result.accessToken) {
    localStorage.setItem("user", JSON.stringify(result));
  }
  return result;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
