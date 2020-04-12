import {
  SET_BILL_TYPES,
  ADD_BILL_TYPE,
  TOGGLE_ADD_BILL_DIALOG,
  SET_CURRENT_BILL_TYPE,
  ADD_BILL,
  DELETE_BILL,
  DELETE_BILL_TYPE
} from "../actionTypes";

const initialState = {
  isOpen: false,
  billTypeId: "",
  title: ""
};

const billTypeReducers = function (state = initialState, action) {
  let newState;
  switch (action.type) {
    case TOGGLE_ADD_BILL_DIALOG:
      return {
        ...state,
        isOpen: !state.isOpen
      }

    case SET_CURRENT_BILL_TYPE:
      return {
        ...state,
        billTypeId: action.payload.billTypeId,
        title: action.payload.title,
      }

    default:
      return state;
  }
};

export default billTypeReducers;
