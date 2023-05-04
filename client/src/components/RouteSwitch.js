import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EntryRoute from "./EntryRoute";
import { UserRoute } from "./UserRoute";

export default function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<EntryRoute />} />
        <Route path="/user/*" element={<UserRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
