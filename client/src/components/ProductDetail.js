/* eslint-disable eqeqeq */
import React, { useState, useContext, useEffect } from "react";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";
import { NavContext } from "./UserRoute";

export default function ProductDetail() {
  const { navState, setNavState } = useContext(NavContext);
  const [customer, setCustomer] = useState(navState.customer);
  const [product, setProduct] = useState(navState.product);
  const [quantity, setQuantity] = useState(product.inventoryCount == 0 ? 0 : 1);

  useEffect(() => {
    setCustomer(navState.customer);
    setProduct(navState.product);
  }, [navState]);

  const quantityOnChange = (event) => {
    setQuantity(event.target.value);
  };

  const addToCart = () => {
    let productQuantity = customer.cart.find((prodQuantity) => {
      return prodQuantity.product == product._id;
    });
    const newProductQuantity = {
      product: { _id: product._id },
      quantity,
    };

    let newCart = [...customer.cart];
    if (productQuantity === undefined) {
      newCart.push(newProductQuantity);
    } else {
      newCart = customer.cart.map((prodQuantity) => {
        return product._id === prodQuantity._id
          ? newProductQuantity
          : prodQuantity;
      });
    }

    axios
      .post(
        `http://localhost:5000/customer/${customer._id}/addToCart`,
        newProductQuantity,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setNavState((prev) => {
          return { ...prev, customer: { ...prev.customer, cart: newCart } };
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid
      container
      direction={"row"}
      spacing={4}
      margin={8}
      justifyContent="center"
    >
      <Grid
        container
        direction={"column"}
        width="auto"
        spacing={2}
        alignItems="center"
      >
        <Grid item>
          <Paper>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ height: 394 }}
            />
          </Paper>
        </Grid>
        <Grid item>
          <FormControl
            spacing={2}
            sx={{ minWidth: 120 }}
            disabled={product.inventoryCount == 0}
          >
            <InputLabel id="quanityLabel">Quantity</InputLabel>
            <Select
              labelId="quanityLabel"
              id="quantity"
              value={quantity}
              label="Quantity"
              onChange={quantityOnChange}
            >
              {product.inventoryCount == 0 && <MenuItem value={0}></MenuItem>}
              {Array.apply(0, Array(product.inventoryCount)).map((_, count) => {
                count += 1;
                return (
                  <MenuItem key={count} value={count}>
                    {count}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            disabled={product.inventoryCount == 0}
            onClick={addToCart}
          >
            Add to cart
          </Button>
        </Grid>
      </Grid>

      <Grid item width={600}>
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <Typography fontSize={30}>{product.name}</Typography>
            <Divider />
          </Grid>
          <Grid item>
            <Typography fontSize={24}>Price: </Typography>
            <Typography fontSize={22}>{`$ ${product.price.toFixed(
              2
            )}`}</Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={24}>Left in stock: </Typography>
            <Typography fontSize={22}>{product.inventoryCount}</Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={24}>Brand: </Typography>
            <Typography fontSize={22}>{product.brand}</Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={24}>Description: </Typography>
            <Typography fontSize={22}>{product.description}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
