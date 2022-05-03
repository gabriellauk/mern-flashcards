import EventBus from "../components/common/EventBus";

const handleError = (error) => {
  console.log(error);
  if (error.response && error.response.status === 401) {
    EventBus.dispatch("logout");
  }
};

export default handleError;
