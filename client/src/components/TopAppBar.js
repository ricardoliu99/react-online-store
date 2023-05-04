import React, { useState, useContext, useEffect } from "react";
import { IconButton, AppBar, Toolbar, Menu, MenuItem } from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
  Apps as ProductIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { NavContext } from "./UserRoute";
import axios from "axios";

export default function TopAppBar() {
  const { navState, setNavState } = useContext(NavContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = (destination) => {
    navigate(`/user/${destination}`, {
      state: navState,
    });
  };

  const logOut = () => {
    axios
      .post(`http://localhost:5000/logout`)
      .then((res) => {
        setNavState((prev) => {
          return { ...prev, customer: null };
        });
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={() => {
              navigateTo("home");
            }}
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              navigateTo("products");
            }}
          >
            <ProductIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              navigateTo("shopping-cart");
            }}
          >
            <ShoppingCartIcon />
          </IconButton>
          <IconButton onClick={handleClick}>
            <AccountCircleIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                navigateTo("profile");
                handleClose();
              }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={logOut}>Log out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
