import React, { useContext } from "react";
import { NavContext } from "./UserRoute";

export default function UserHome() {
  const { navState, setNavState } = useContext(NavContext);
  console.log(`UserHome ${navState.customer}`);
  return (
    <div>
      <h1>{navState.customer.name}</h1>
    </div>
  );
}
