import { ADD_PRODUCT, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_ERROR } from "../types";

//FUNCTIONS

//create new products
export function createNewProductAction(product) {
  return (dispatch) => {
    dispatch(addProduct());
    try {
      dispatch(addProductSuccess(product));
    } catch (error) {
      dispatch(addProductError(true));
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
