import axios from "axios";

const API_URL = process.env.REACT_APP_AUTH_API_URL;

// Register new user
const register = async (username, email, password) => {
  return (
    await axios.post(API_URL + "signup", {
      username,
      email,
      password,
    })
  ).data;
};

// Attempt to log in
const login = async (username, password) => {
  const result = (
    await axios.post(API_URL + "signin", {
      username,
      password,
    })
  ).data;

  // If login succeeded, save the result to local storage
  if (result.accessToken) {
    localStorage.setItem("user", JSON.stringify(result));
  }
  return result;
};

// Log out and remove the user from local storage
const logout = () => {
  localStorage.removeItem("user");
};

// Identify the current user from local storage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
