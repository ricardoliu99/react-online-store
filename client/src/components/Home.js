import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function (event) {
    navigate(1);
  };
  return (
    <Grid
      container
      direction="column"
      align="center"
      spacing={10}
      sx={{
        marginTop: 8,
        height: "100%",
        width: "100%",
      }}
    >
      <Grid item>
        <Typography variant="h1">Welcome to E-Store</Typography>
      </Grid>
      <Grid item>
        <Grid item>
          <Grid container direction="column" align="center" spacing={7}>
            <Grid item>
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
                variant="contained"
                sx={{ fontSize: "24px", width: "12%" }}
              >
                SIGN UP
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                variant="contained"
                sx={{ fontSize: "24px", width: "12%" }}
              >
                LOG IN
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
