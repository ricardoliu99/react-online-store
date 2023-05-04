import React, { useContext, useState } from "react";
import { NavContext } from "./UserRoute";
import {
  Grid,
  TextField,
  Typography,
  IconButton,
  FormControl,
} from "@mui/material";
import {
  Edit as EditIcon,
  SaveAs as SaveAsIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import axios from "axios";

export default function Profile() {
  const { navState, setNavState } = useContext(NavContext);
  const [editForm, setEditForm] = useState({
    name: navState.customer.name,
    address: navState.customer.address,
    phone: navState.customer.phone,
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const resetForm = () => {
    setEditForm({
      name: navState.customer.name,
      address: navState.customer.address,
      phone: navState.customer.phone,
    });
  };
  const updateForm = (val) => {
    setEditForm((prev) => {
      return { ...prev, ...val };
    });
  };
  const saveUserInfo = (e) => {
    e.preventDefault();
    const newCustomer = { ...editForm };

    axios
      .post(
        `http://localhost:5000/customer/${navState.customer._id}/update`,
        newCustomer,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setIsDisabled((prev) => !prev);
        setNavState((prev) => {
          return { ...prev, customer: { ...prev.customer, ...editForm } };
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Grid
      container
      direction="column"
      align="center"
      marginTop={1}
      spacing={5}
      component="form"
      onSubmit={saveUserInfo}
    >
      <Grid item>
        <Typography variant="h4">Account information</Typography>
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            variant="standard"
            value={editForm.name}
            label="Name"
            disabled={isDisabled}
            required
            onChange={(e) => {
              updateForm({ name: e.target.value });
            }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          variant="standard"
          value={editForm.address}
          label="Address"
          disabled={isDisabled}
          onChange={(e) => {
            updateForm({ address: e.target.value });
          }}
        />
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            variant="standard"
            value={editForm.phone}
            label="Phone"
            inputProps={{ pattern: "[0-9]{4}-[0-9]{4}" }}
            disabled={isDisabled}
            required
            onChange={(e) => {
              updateForm({ phone: e.target.value });
            }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <Grid container direction="row" justifyContent="center">
          {!isDisabled && (
            <Grid item>
              <IconButton type="submit">
                <SaveAsIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item>
            <IconButton
              onClick={() => {
                setIsDisabled((prev) => !prev);
                if (!isDisabled) {
                  resetForm();
                }
              }}
            >
              {isDisabled ? <EditIcon /> : <ClearIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
