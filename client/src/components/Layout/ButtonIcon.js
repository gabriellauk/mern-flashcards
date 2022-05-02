import React from "react";

const ButtonIcon = (props) => {
  return (
    <button
      type="button"
      className="btn btn-dark px-3 fs-3 button-100"
      onClick={props.action}
    >
      <i className={"bi " + props.icon} title={props.content}></i>
      <span> {props.content}</span>
    </button>
  );
};

export default ButtonIcon;
