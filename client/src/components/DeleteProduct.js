import React from "react";
import { IconButton, Grid, CardActions, Typography } from "@mui/material";
import { Clear as ClearIcon, Check as CheckIcon } from "@mui/icons-material";
import axios from "axios";

export default function DeleteProduct({
  product,
  setShowDeleteConfirmationAt,
  deleteProductAt,
}) {
  const deleteProduct = (selectedId) => {
    axios
      .delete(`http://localhost:5000/product/${selectedId}/delete`)
      .then((res) => {
        deleteProductAt();
      })
      .catch((err) => console.log(err.response.data));
  };
  return (
    <Grid container spacing={1} direction={"column"} alignItems={"center"}>
      <Grid item>
        <Typography variant="h6">Confirm deletion</Typography>
      </Grid>
      <Grid item>
        <CardActions>
          <IconButton onClick={() => deleteProduct(product._id)}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={() => setShowDeleteConfirmationAt()}>
            <ClearIcon />
          </IconButton>
        </CardActions>
      </Grid>
    </Grid>
  );
}
