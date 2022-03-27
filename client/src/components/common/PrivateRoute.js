import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = (props) => {
  // If authorised, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return props.currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
