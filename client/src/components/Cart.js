import React, { useContext, useEffect, useState } from "react";
import { NavContext } from "./UserRoute";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  tableCellClasses,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Clear as ClearIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { navState, setNavState } = useContext(NavContext);
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/customer/${navState.customer._id}/getCart`)
      .then((res) => {
        const newCart = res.data;
        setCart(newCart);
      })
      .catch((err) => console.log(err));
  }, [navState]);

  useEffect(() => {
    let currentPrice = 0;

    cart.forEach((productQuantity) => {
      currentPrice += productQuantity.product.price * productQuantity.quantity;
    });

    setPrice(currentPrice);
  }, [cart]);

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "darkblue",
      color: "white",
      fontSize: 32,
    },
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: "lightblue",
      fontSize: 24,
    },
  }));

  const deleteFromCart = (productId) => {
    axios
      .post(
        `http://localhost:5000/customer/${navState.customer._id}/deleteFromCart`,
        { productId }
      )
      .then((res) => {
        const newCart = navState.customer.cart.filter((prodQuantity) => {
          return productId !== prodQuantity.product._id;
        });
        console.log(newCart);
        setNavState((prev) => {
          console.log({
            ...prev,
            customer: { ...prev.customer, cart: newCart },
          });
          return { ...prev, customer: { ...prev.customer, cart: newCart } };
        });
      })
      .catch((err) => console.log(err.response.data));
  };

  const navigateToProductDetail = (product) => {
    setNavState((prev) => {
      return { ...prev, product };
    });
    navigate(`/user/product/${product._id}`, {
      state: { product, customer: navState.customer },
    });
  };

  return navState.customer.cart.length > 0 ? (
    <Grid
      container
      direction="column"
      sx={{ width: "75%", margin: "auto", marginTop: 8 }}
      spacing={3}
    >
      <Grid item>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow key={"header"}>
                <StyledTableCell align="center" width="5%"></StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Quantity</StyledTableCell>
                <StyledTableCell align="center">Subtotal</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((prodQuantity) => {
                const product = prodQuantity.product;
                return (
                  <TableRow key={product._id}>
                    <StyledTableCell align="center" width="5%">
                      <IconButton
                        onClick={() => {
                          deleteFromCart(product._id);
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography
                        fontSize={24}
                        sx={{
                          "&:hover": {
                            color: "blue",
                            textDecoration: "underline",
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => {
                          navigateToProductDetail(product);
                        }}
                      >
                        {product.name}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {product.price}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {prodQuantity.quantity}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {product &&
                        (product.price * prodQuantity.quantity).toFixed(2)}
                    </StyledTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item align="right" marginRight={16}>
        <Paper sx={{ width: "10%", backgroundColor: "lightblue" }}>
          <Typography fontSize={24} align="center">
            Total: {price > 0 && price.toFixed(2)}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  ) : (
    <Typography variant="h4" align="center" marginTop={8}>
      Your shopping cart is empty!
    </Typography>
  );
}
