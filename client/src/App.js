import React from "react";
import { Route, Routes } from "react-router-dom";

import CreateCard from "./components/CreateCard";
import AllCards from "./components/AllCards";
import EditCard from "./components/EditCard";
import ViewCard from "./components/ViewCard.js";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/add" element={<CreateCard />} />
        <Route path="/" element={<AllCards />} />
        <Route path="/edit/:id" element={<EditCard />} />
        <Route path="/card/:id" element={<ViewCard />} />
      </Routes>
    </div>
  );
};

export default App;
