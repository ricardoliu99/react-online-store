import React, { createContext, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ListProducts from "./ListProducts";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import NavLayout from "./NavLayout";
import Profile from "./Profile";
import UserHome from "./UserHome";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

const NavContext = createContext();
export { NavContext };

export function UserRoute() {
  const location = useLocation();
  console.log("UserRoute");
  console.log(location.state);
  const [navState, setNavState] = useState(location.state);
  return navState.customer ? (
    <NavContext.Provider value={{ navState, setNavState }}>
      <Routes>
        <Route path="/" element={<NavLayout />}>
          <Route path="/home" element={<UserHome />} />
          <Route path="/products" element={<ListProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/shopping-cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </NavContext.Provider>
  ) : (
    <div>
      <Typography variant="h3" align="center" marginTop={20}>
        Log in before accessing this site&nbsp;
        <Link to="/">here</Link>
      </Typography>
    </div>
  );
}
