import React from "react";
import { Route, Routes } from "react-router-dom";

import CreateCard from "./components/CreateCard";
import AllCards from "./components/AllCards";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/add" element={<CreateCard />} />
        <Route path="/" element={<AllCards />} />
      </Routes>
    </div>
  );
};

export default App;
