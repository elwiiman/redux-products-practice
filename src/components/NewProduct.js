import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//redux actions
import { createNewProductAction } from "../actions/productActions";
import { showAlert, hideAlertAction } from "../actions/alertActions";

//

const NewProduct = ({ history }) => {
  //local state
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });

  //using useDispatch which return a function
  const dispatch = useDispatch();

  //access to store state
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const alert = useSelector((state) => state.alert.alert);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //function to add product by calling the action function
  const addProduct = (product) => dispatch(createNewProductAction(product));

  // when user submits new product executes
  const submitNewProduct = (e) => {
    e.preventDefault();

    //validate form
    if (product.name.trim() === "" || product.price.trim() <= 0) {
      const myAlert = {
        msg: "Both fields are mandatory",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(showAlert(myAlert));
      return;
    }
    //check if  no errors
    dispatch(hideAlertAction());

    //add a new product
    addProduct(product);

    //redirect to home
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Add New Product
            </h2>

            {alert ? <p className={alert.classes}>{alert.msg}</p> : null}

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
            {loading ? <p>Loading...</p> : null}
            {error ? (
              <p className="alert alert-danger p-2 mt-4 text-center">
                There was an error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
