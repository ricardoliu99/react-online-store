import { Outlet, useNavigate } from "react-router-dom";
import { IconButton, Toolbar, AppBar } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";

export default function EntryLayout() {
  const nagivate = useNavigate();
  const navigateToHome = () => {
    nagivate("/");
  };
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={navigateToHome}>
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet />
    </div>
  );
}
