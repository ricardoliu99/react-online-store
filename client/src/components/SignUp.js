import {
  FormControl,
  Grid,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [signUpForm, setSignUpForm] = useState({
    _id: uuidv4(),
    username: "",
    password: "",
    password2: "",
    name: "",
    phone: "",
    address: "",
  });
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const nagivate = useNavigate();

  const updateForm = (value) => {
    setSignUpForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (signUpForm.password !== signUpForm.password2) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    const { password2, ...newCustomer } = { ...signUpForm };

    axios
      .post(`http://localhost:5000/customer/add`, newCustomer, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setUsernameError(false);
        setSignUpForm({
          _id: uuidv4(),
          username: "",
          password: "",
          password2: "",
          name: "",
          phone: "",
          address: "",
        });
        nagivate("/login");
      })
      .catch((err) => {
        if (err.response.data.includes("E11000")) {
          setUsernameError(true);
        }
        console.log(err.response.data);
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
        <Typography variant="h2">Sign Up</Typography>
      </Grid>

      <Grid item>
        <FormControl>
          <TextField
            type="text"
            id="username"
            label="Username"
            value={signUpForm.username}
            onChange={(e) => {
              updateForm({ username: e.target.value });
            }}
            required
            autoComplete="off"
            inputProps={{ minLength: 4 }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            type="password"
            id="password"
            label="Password"
            value={signUpForm.password}
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
        <FormControl>
          <TextField
            type="password"
            id="password2"
            label="Re-enter password"
            value={signUpForm.password2}
            onChange={(e) => {
              updateForm({ password2: e.target.value });
            }}
            required
            autoComplete="off"
            inputProps={{ minLength: 8 }}
            error={passwordError}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            type="text"
            id="name"
            label="Name"
            value={signUpForm.name}
            onChange={(e) => {
              updateForm({ name: e.target.value });
            }}
            required
            autoComplete="off"
            inputProps={{ minLength: 1 }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            type="text"
            id="phone"
            label="Phone number"
            value={signUpForm.phone}
            onChange={(e) => {
              updateForm({ phone: e.target.value });
            }}
            required
            autoComplete="off"
            inputProps={{ pattern: "[0-9]{4}-[0-9]{4}" }}
            placeholder="0000-0000"
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            type="text"
            id="address"
            label="Address"
            value={signUpForm.address}
            onChange={(e) => {
              updateForm({ address: e.target.value });
            }}
            autoComplete="off"
          />
        </FormControl>
      </Grid>
      <Grid item></Grid>
      <Grid item>
        <Button type="submit" variant="contained">
          Create account
        </Button>
      </Grid>
      {passwordError && (
        <Grid item>
          <Typography variant="p" color="red">
            Passwords do not match
          </Typography>
        </Grid>
      )}
      {usernameError && (
        <Grid item>
          <Typography variant="p" color="red">
            Username is already taken. Please use another username.
          </Typography>
        </Grid>
      )}
      <Grid item>
        <Link href="/login">Already have an account? Log in here!</Link>
      </Grid>
    </Grid>
  );
}
