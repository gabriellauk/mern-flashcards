import React from "react";
import { useParams } from "react-router-dom";

const EditCard = (props) => {
  const { id } = useParams();
  console.log(id);

  return <div>Edit Card {id}</div>;
};

export default EditCard;
