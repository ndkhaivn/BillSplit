import {
  SET_BILL_TYPES,
  ADD_BILL_TYPE,
  TOGGLE_ADD_BILL_DIALOG,
  SET_CURRENT_BILL_TYPE,
  ADD_BILL,
  DELETE_BILL,
  DELETE_BILL_TYPE
} from "../actionTypes";

const initialState = [];

const billTypeReducers = function (state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_BILL_TYPES:
      return action.payload
      
    case ADD_BILL_TYPE:
      return state.concat([action.payload]);

    case DELETE_BILL_TYPE:
      return state.filter((billType) => billType.billTypeId !== action.billTypeId);

    case ADD_BILL:
      const bill = action.payload;
      const index = state.map(billType => billType.billTypeId).indexOf(bill.billTypeId);

      newState = [...state];
      newState[index].bills = newState[index].bills.concat(bill);

      return [
        ...newState
      ]
      
    case DELETE_BILL:
      const billTypeIndex = state.map(billType => billType.billTypeId).indexOf(action.billTypeId);
      const billIndex = state[billTypeIndex].bills.map(bill => bill.billId).indexOf(action.billId);
      newState = [...state];
      newState[billTypeIndex].bills.splice(billIndex, 1);
      return newState

    default:
      return state;
  }
};

export default billTypeReducers;
