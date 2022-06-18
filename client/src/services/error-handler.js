import EventBus from "../components/common/EventBus";

const handleError = (error) => {
  console.log(error);
  // If the request was unauthorised, log the user out
  if (error.response && error.response.status === 401) {
    EventBus.dispatch("logout");
  }
};

export default handleError;
