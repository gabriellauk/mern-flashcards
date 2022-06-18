const on = (event, callback) => {
  document.addEventListener(event, (e) => callback(e.detail));
};

const dispatch = (event, data) => {
  document.dispatchEvent(new CustomEvent(event, { detail: data }));
};

const remove = (event, callback) => {
  document.removeEventListener(event, callback);
};

const eventBus = {
  on,
  dispatch,
  remove,
};

export default eventBus;
