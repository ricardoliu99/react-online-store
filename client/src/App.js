import React, { useEffect, useState } from "react";
import RouteSwitch from "./components/RouteSwitch";
import Cart from "./components/Cart";
import {
  ShoppingCart as ShoppingCartIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { IconButton, Drawer, AppBar, Toolbar, Typography } from "@mui/material";

export default function App() {
  return <RouteSwitch />;
}
