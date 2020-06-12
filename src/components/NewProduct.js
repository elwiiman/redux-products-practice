import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//redux actions
import { createNewProductAction } from "../actions/productActions";

//

const NewProduct = () => {
  //local state
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //using useDispatch which return a function
  const dispatch = useDispatch();

  //function to add product by calling the action function
  const addProduct = (product) => dispatch(createNewProductAction(product));

  // when user submits new product executes
  const submitNewProduct = (e) => {
    e.preventDefault();

    //validate form
    if (product.name.trim() === "" || product.price.trim() <= 0) {
      return;
    }
    //check if errors

    //add a new product
    addProduct(product);
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Add New Product
            </h2>

            <form onSubmit={submitNewProduct}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Product Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Product Price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
