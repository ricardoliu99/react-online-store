import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  Grid,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import CreateProduct from "./CreateProduct";
import { v4 as uuidv4 } from "uuid";
import DeleteProduct from "./DeleteProduct";
import { NavContext } from "./UserRoute";

export default function ListProducts() {
  const { navState, setNavState } = useContext(NavContext);
  // list of products shown on screen
  const [products, setProducts] = useState([]);
  // whether the add form is shown
  const [showAddForm, setShowAddForm] = useState(false);
  // when a new product is created, this sends a get request in useEffect
  const [productsListUpdate, setProductsListUpdate] = useState(false);
  // array of boolean, whether product at index shows edit form
  const [showEditForm, setShowEditForm] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState([]);

  const navigate = useNavigate();

  // refreshes list of products with newest data from database
  useEffect(() => {
    function getProducts() {
      axios
        .get("http://localhost:5000/products")
        .then((res) => {
          setProducts(res.data);
          setShowEditForm(new Array(res.data.length).fill(false));
          setShowDeleteConfirmation(new Array(res.data.length).fill(false));
        })
        .catch((err) => {
          console.log(err);
          setProducts([]);
        });
    }
    getProducts();
  }, [productsListUpdate]);

  // controls toggling of edit form associated with product at index
  const setShowEditFormAt = (index) => {
    let newShowEditForm = [...showEditForm];
    newShowEditForm[index] = !newShowEditForm[index];
    setShowEditForm(newShowEditForm);
  };

  // controls toggling of delete confirmation associated with product at index
  const setShowDeleteConfirmationAt = (index) => {
    let newShowDeleteConfirmation = [...showDeleteConfirmation];
    newShowDeleteConfirmation[index] = !newShowDeleteConfirmation[index];
    setShowDeleteConfirmation(newShowDeleteConfirmation);
  };

  // deletes product at index and its associated boolean value
  const deleteProductAt = (index) => {
    setProducts(
      products.filter((_, idx) => {
        return index !== idx;
      })
    );
    setShowDeleteConfirmation(
      showDeleteConfirmation.filter((_, idx) => {
        return index !== idx;
      })
    );
    setShowEditForm(
      showEditForm.filter((_, idx) => {
        return index !== idx;
      })
    );
  };

  // updates product at index and toggles the edit form visibility
  const updateProductAt = (index, newProduct) => {
    setProducts(
      products.map((val, idx) => {
        if (idx === index) {
          return newProduct;
        }
        return val;
      })
    );
    setShowEditForm(
      showEditForm.map((val, idx) => {
        if (idx === index) {
          return !val;
        }
        return val;
      })
    );
  };

  const navigateToProductDetail = (product) => {
    setNavState((prev) => {
      return { ...prev, product };
    });
    navigate(`/user/product/${product._id}`, {
      state: { product, customer: navState.customer },
    });
  };

  return (
    <Grid container spacing={3} margin={8}>
      {products.map((prod, index) => {
        return (
          <Grid item key={prod._id}>
            <Card sx={{ backgroundColor: "lightblue" }}>
              {showEditForm[index] && (
                <CardActions disableSpacing>
                  <IconButton onClick={() => setShowEditFormAt(index)}>
                    <ClearIcon />
                  </IconButton>
                </CardActions>
              )}
              {!showEditForm[index] && !showDeleteConfirmation[index] && (
                <CardMedia
                  component="img"
                  height="194"
                  image={prod.imageUrl}
                  alt={prod.name}
                  onClick={() => {
                    navigateToProductDetail(prod);
                  }}
                  sx={{
                    "&:hover": { cursor: "pointer" },
                    marginTop: 4,
                  }}
                />
              )}
              <CardContent align="center">
                {showEditForm[index] ? (
                  <CreateProduct
                    product={prod}
                    isCreate={false}
                    setProductsListUpdate={setProductsListUpdate}
                    updateProductAt={(newProduct) => {
                      updateProductAt(index, newProduct);
                    }}
                  />
                ) : showDeleteConfirmation[index] ? (
                  <DeleteProduct
                    product={prod}
                    setShowDeleteConfirmationAt={() =>
                      setShowDeleteConfirmationAt(index)
                    }
                    deleteProductAt={() => {
                      deleteProductAt(index);
                    }}
                  />
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      "&::-webkit-scrollbar": { display: "none" },
                      msOverflowStyle: "none",
                      scrollbarWidth: "none",
                      overflow: "auto",
                      width: 174,
                      "&:hover": {
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => {
                      navigateToProductDetail(prod);
                    }}
                  >
                    {prod.name}
                  </Typography>
                )}
              </CardContent>
              {!showEditForm[index] && !showDeleteConfirmation[index] && (
                <CardActions disableSpacing sx={{ float: "right" }}>
                  <IconButton
                    onClick={() => setShowDeleteConfirmationAt(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => setShowEditFormAt(index)}>
                    <EditIcon />
                  </IconButton>
                </CardActions>
              )}
            </Card>
          </Grid>
        );
      })}
      <Grid item alignSelf="center">
        <Card sx={{ backgroundColor: "lightblue" }}>
          <CardActions disableSpacing>
            <IconButton
              onClick={() => {
                setShowAddForm((prev) => !prev);
              }}
            >
              {showAddForm ? <ClearIcon /> : <AddIcon />}
            </IconButton>
          </CardActions>
          {showAddForm && (
            <CardContent>
              <CreateProduct
                product={{
                  _id: uuidv4(),
                  name: "",
                  price: 0,
                  description: "",
                  imageUrl: "",
                  brand: "",
                  inventoryCount: 0,
                }}
                isCreate={true}
                setProductsListUpdate={setProductsListUpdate}
                updateProductAt={() => {}}
              />
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
