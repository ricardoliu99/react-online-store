import React from "react";
import { Route, Routes } from "react-router-dom";

import CreateProduct from "./components/createProduct";
import ListProducts from "./components/listProducts";

const App = () => {
  return (
    <div>
      <ListProducts />
    </div>
  );
};

export default App;
