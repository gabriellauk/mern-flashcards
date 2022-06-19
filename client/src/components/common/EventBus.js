// Listen for event
const on = (event, callback) => {
  document.addEventListener(event, (e) => callback(e.detail));
};

// Raise/publish event
const dispatch = (event, data) => {
  document.dispatchEvent(new CustomEvent(event, { detail: data }));
};

// Stop listening for the event
const remove = (event, callback) => {
  document.removeEventListener(event, callback);
};

const eventBus = {
  on,
  dispatch,
  remove,
};

export default eventBus;
