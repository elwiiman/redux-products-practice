import { SHOW_ALERT, HIDE_ALERT } from "../types";

//each reducer has its own state
const initialState = {
  alert: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
