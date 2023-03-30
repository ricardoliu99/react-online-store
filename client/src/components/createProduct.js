import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newProduct = { ...form };

    await axios.post("http://localhost:5000/product/add", newProduct, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setForm({ name: "", price: 0, description: "" });
    // navigate("/")
  }

  return (
    <div>
      <h3>Add product</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            step="0.01"
            id="price"
            value={form.price}
            onChange={(e) => updateForm({ price: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Add product"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
