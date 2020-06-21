import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_DOWNLOAD_PRODUCTS,
  DOWNLOAD_PRODUCTS_SUCCESS,
  DOWNLOAD_PRODUCTS_ERROR,
} from "../types";
import axiosClient from "../config/axios";
import Swal from "sweetalert2";

//FUNCTIONS

//create new products
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

//Function to obtain products from database

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
