import React, { useState } from "react";
import axios from "axios";
import { Grid, FormControl, TextField, IconButton } from "@mui/material";
import {
  AddCircle as AddCircleIcon,
  SaveAs as SaveAsIcon,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

export default function CreateProduct({
  product,
  isCreate,
  setProductsListUpdate,
  updateProductAt,
}) {
  const [form, setForm] = useState(product);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    const newProduct = { ...form };

    const postOperation = isCreate ? "add" : `${product._id}/update`;

    axios
      .post(`http://localhost:5000/product/${postOperation}`, newProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        if (isCreate) {
          setProductsListUpdate((prev) => !prev);
        } else {
          updateProductAt(newProduct);
        }
        setForm({
          _id: isCreate ? uuidv4() : product._id,
          name: "",
          price: 0,
          description: "",
          imageUrl: "",
          brand: "",
          inventoryCount: 0,
        });
      })
      .catch((err) => console.log(err.response.data));
  }

  return (
    <Grid
      container
      component="form"
      onSubmit={onSubmit}
      direction="column"
      spacing={2}
    >
      <Grid item>
        <FormControl>
          <TextField
            type="text"
            id="name"
            label="Name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
            required
            autoComplete="off"
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            type="number"
            id="price"
            label="Price"
            inputProps={{ step: "0.01", min: "0" }}
            value={form.price}
            onChange={(e) => updateForm({ price: e.target.value })}
            required
            autoComplete="off"
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            type="text"
            id="description"
            label="Description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
            required
            autoComplete="off"
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            type="text"
            id="imageUrl"
            label="Image Link"
            value={form.imageUrl}
            onChange={(e) => updateForm({ imageUrl: e.target.value })}
            required
            autoComplete="off"
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            type="text"
            id="brand"
            label="Brand"
            value={form.brand}
            onChange={(e) => updateForm({ brand: e.target.value })}
            required
            autoComplete="off"
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <TextField
            type="number"
            id="inventoryCount"
            label="Inventory Count"
            inputProps={{ min: "0" }}
            value={form.inventoryCount}
            onChange={(e) => updateForm({ inventoryCount: e.target.value })}
            required
            autoComplete="off"
          />
        </FormControl>
      </Grid>
      <Grid item>
        <IconButton type="submit" sx={{ float: "right" }}>
          {isCreate ? <AddCircleIcon /> : <SaveAsIcon />}
        </IconButton>
      </Grid>
    </Grid>
  );
}
