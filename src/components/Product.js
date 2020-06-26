import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteProductAction,
  obtainProductToEditAction,
} from "../actions/productActions";
import Swal from "sweetalert2";

const Product = ({ product }) => {
  const { name, price, id } = product;

  const dispatch = useDispatch();
  const history = useHistory();

  const confirmDeleteProduct = (id) => {
    //ask user
    Swal.fire({
      title: "Are you sure you want to delete this product?",
      text: "A product deleted can't be recover!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        //call to action
        dispatch(deleteProductAction(id));
      }
    });
  };

  //function to redirect programatically
  const redirectionToEdit = (product) => {
    dispatch(obtainProductToEditAction(product));
    history.push(`/products/edit/${product.id}`);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <span className="font-weight-bold">$ {price} </span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redirectionToEdit(product)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmDeleteProduct(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Product;
