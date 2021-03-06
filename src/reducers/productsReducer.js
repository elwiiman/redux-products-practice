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
  PRODUCT_EDITED_SUCCESS,
  PRODUCT_EDITED_ERROR,
} from "../types";

// each reducer has his own state

const initialState = {
  products: [],
  error: null,
  loading: false,
  productToDelete: null,
  productToEdit: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_DOWNLOAD_PRODUCTS:
    case ADD_PRODUCT:
      return { ...state, loading: action.payload };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };

    case PRODUCT_EDITED_ERROR:
    case PRODUCT_DELETED_ERROR:
    case DOWNLOAD_PRODUCTS_ERROR:
    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DOWNLOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };
    case OBTAIN_PRODUCT_TO_DELETE:
      return {
        ...state,
        productToDelete: action.payload,
      };

    case PRODUCT_DELETED_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== state.productToDelete
        ),
        productToDelete: null,
      };
    case OBTAIN_PRODUCT_TO_EDIT:
      return {
        ...state,
        productToEdit: action.payload,
      };
    case PRODUCT_EDITED_SUCCESS:
      return {
        ...state,
        productToEdit: null,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
      };

    default:
      return state;
  }
}
