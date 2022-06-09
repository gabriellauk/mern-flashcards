import axios from "axios";

const API_URL = process.env.REACT_APP_AUTH_API_URL;

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

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser
}

export default AuthService;
