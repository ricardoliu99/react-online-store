import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get("http://localhost:5000/product");
        setProducts(res.data);
      } catch (err) {
        setProducts([]);
      }
    }
    getProducts();
  }, []);

  return (
    <div>
      <ul>
        {products.map((prod) => {
          return <li key={prod._id}>{prod.name}</li>;
        })}
      </ul>
    </div>
  );
}
