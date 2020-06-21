import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProductAction } from "../actions/productActions";
import Swal from "sweetalert2";

const Product = ({ product }) => {
  const { name, price, id } = product;

  const dispatch = useDispatch();

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
  return (
    <tr>
      <td>{name}</td>
      <td>
        <span className="font-weight-bold">$ {price} </span>
      </td>
      <td className="acciones">
        <Link to={`/products/edit/${id}`} className="btn btn-primary mr-2 ">
          Edit
        </Link>
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
