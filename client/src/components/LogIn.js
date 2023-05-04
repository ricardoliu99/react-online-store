import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  TextField,
  Button,
  Link,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [logInForm, setLogInForm] = useState({ username: "", password: "" });
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const navigate = useNavigate();

  const updateForm = (value) => {
    setLogInForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newLogIn = { ...logInForm };
    axios
      .post(`http://localhost:5000/login`, newLogIn)
      .then((res) => {
        setUsernameError(false);
        setPasswordError(false);
        const customer = res.data;
        console.log(customer);
        navigate(`/user/home`, {
          state: { customer },
          replace: true,
        });
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message === "Incorrect username") {
          setPasswordError(false);
          setUsernameError(true);
        }

        if (message === "Incorrect password") {
          setUsernameError(false);
          setPasswordError(true);
        }
      });
  };
  return (
    <Grid
      container
      direction="column"
      alignContent="center"
      spacing={5}
      align="center"
      component="form"
      onSubmit={onSubmit}
      sx={{
        marginTop: 8,
        backgroundColor: "lightcyan",
        margin: 0,
        height: "100vh",
        width: "100%",
      }}
    >
      <Grid item>
        <Typography variant="h2">Log In</Typography>
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            type="text"
            id="username"
            label="Username"
            value={logInForm.username}
            onChange={(e) => {
              updateForm({ username: e.target.value });
            }}
            required
            autoComplete="off"
            inputProps={{ minLength: 4 }}
            error={usernameError}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            type="password"
            id="password"
            label="Password"
            value={logInForm.password}
            onChange={(e) => {
              updateForm({ password: e.target.value });
            }}
            required
            autoComplete="off"
            inputProps={{ minLength: 8 }}
            error={passwordError}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <Button type="submit" variant="contained">
          Log in
        </Button>
      </Grid>
      {usernameError && (
        <Grid item>
          <Typography variant="p" color="red">
            Username not found.
          </Typography>
        </Grid>
      )}
      {passwordError && (
        <Grid item>
          <Typography variant="p" color="red">
            Password is incorrect
          </Typography>
        </Grid>
      )}
      <Grid item></Grid>
      <Grid item>
        <Link href="/signup">
          Don't have an account? Create an account here!
        </Link>
      </Grid>
    </Grid>
  );
}
