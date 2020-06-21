import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_DOWNLOAD_PRODUCTS,
  DOWNLOAD_PRODUCTS_SUCCESS,
  DOWNLOAD_PRODUCTS_ERROR,
  OBTAIN_PRODUCT_TO_DELETE,
  PRODUCT_DELETED_SUCCESS,
  PRODUCT_DELETED_ERROR,
  OBTAIN_PRODUCT_TO_EDIT,
  START_EDIT_PRODUCT,
  PRODUCT_EDITED_SUCCESS,
  PRODUCT_EDITED_ERROR,
} from "../types";
import axiosClient from "../config/axios";
import Swal from "sweetalert2";

//FUNCTIONS

//CREATE A NEW PRODUCT
export function createNewProductAction(product) {
  return async (dispatch) => {
    dispatch(addProduct());
    try {
      //call API to try insert product in DB
      await axiosClient.post("/products", product);
      //if everything is OK excutes dispatch
      dispatch(addProductSuccess(product));

      //success alert
      Swal.fire("Correct", "Product has been added", "success");
    } catch (error) {
      console.log(error);
      //if there is an error exceute this dispatch
      dispatch(addProductError(true));

      //alert of error
      Swal.fire({
        icon: "error",
        title: "There was an error",
        text: "Sorry, try again",
      });
    }
  };
}

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true,
});

// if products is saved in database
const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

//if errror
const addProductError = (errorState) => ({
  type: ADD_PRODUCT_ERROR,
  payload: errorState,
});

//OBTAIN OR CALL ALL PRODUCTS
export function obtainProductsAction() {
  return async (dispatch) => {
    dispatch(downloadProducts());
    try {
      const response = await axiosClient.get("/products");
      dispatch(downloadProductsSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(downloadProductsError());
    }
  };
}

const downloadProducts = () => ({
  type: START_DOWNLOAD_PRODUCTS,
  payload: true,
});

const downloadProductsSuccess = (products) => ({
  type: DOWNLOAD_PRODUCTS_SUCCESS,
  payload: products,
});

const downloadProductsError = () => ({
  type: DOWNLOAD_PRODUCTS_ERROR,
  payload: true,
});

//SELECT AND DELETE A PRODUCT
export function deleteProductAction(id) {
  return async (dispatch) => {
    dispatch(obtainProductToDelete(id));
    try {
      await axiosClient.delete(`/products/${id}`);
      dispatch(deleteProductSuccess());

      //show alert if so deleted
      Swal.fire("Deleted!", "Product has been deleted.", "success");
    } catch (error) {
      console.log(error);
      dispatch(deleteProductError);
    }
  };
}

const obtainProductToDelete = (id) => ({
  type: OBTAIN_PRODUCT_TO_DELETE,
  payload: id,
});

const deleteProductSuccess = () => ({
  type: PRODUCT_DELETED_SUCCESS,
});

const deleteProductError = () => ({
  type: PRODUCT_DELETED_ERROR,
  payload: true,
});

//PUT A PRODUCT TO EDIT
export function obtainProductToEditAction(product) {
  return (dispatch) => {
    dispatch(obtainProductToEdit(product));
  };
}

const obtainProductToEdit = (product) => ({
  type: OBTAIN_PRODUCT_TO_EDIT,
  payload: product,
});

//edit a register in the API
export function editProductAction(product) {
  return async (dispatch) => {
    dispatch(editProduct(product));
    try {
      await axiosClient.put(`products/${product.id}`, product);
      dispatch(editProductSuccess(product));
    } catch (error) {
      console.log(error);
      dispatch(editProductError());
    }
  };
}

const editProduct = () => ({
  type: START_EDIT_PRODUCT,
});

const editProductSuccess = (product) => ({
  type: PRODUCT_EDITED_SUCCESS,
  payload: product,
});

const editProductError = () => ({
  type: PRODUCT_EDITED_ERROR,
  payload: true,
});
