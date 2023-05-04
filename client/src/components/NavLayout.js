import { Outlet } from "react-router-dom";
import TopAppBar from "./TopAppBar";

export default function NavLayout() {
  return (
    <div>
      <TopAppBar />
      <Outlet />
    </div>
  );
}
