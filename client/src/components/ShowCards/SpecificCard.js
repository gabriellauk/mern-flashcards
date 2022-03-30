import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import UserService from "../../services/user.service";
import EventBus from "../common/EventBus";

const SpecificCard = (props) => {
  const [errorContent, setErrorContent] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState({});

  const getCard = () => {
    const id = params.id;
    UserService.getSpecificCard(id).then(
      (response) => {
        setCard(response.data);
      },

      (error) => {
        const _errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setErrorContent(_errorMessage);
        console.log(_errorMessage);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  };

  useEffect(getCard, []);

  return (
    <table>
      <tbody>
        <tr>
          <td>{card.frontText}</td>
          <td>{card.backText}</td>
          <td>{card["_id"]}</td>
          <td>{card.active === true ? <p>active</p> : <p>inactive</p>}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SpecificCard;
