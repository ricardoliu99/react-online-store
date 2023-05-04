import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Home from "./Home";
import EntryLayout from "./EntryLayout";

export default function EntryRoute() {
  return (
    <Routes>
      <Route path="/" element={<EntryLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}
