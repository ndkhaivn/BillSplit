import {SET_BILL_TYPES, SET_TENANTS, ADD_TENANT, ADD_BILL_TYPE, TOGGLE_ADD_BILL_DIALOG, SET_CURRENT_BILL_TYPE } from "../actionTypes";

const initialState = {
  tenants: [],
  billTypes: [],
  addBillDialog: {
    isOpen: false,
    billTypeId: "",
    title: "",
    paymentDate: "",
    period: {},
    split: []
  }
};

const reducers = function (state = initialState, action) {
  switch (action.type) {
    case ADD_TENANT:
      return {
        ...state,
        tenants: state.tenants.concat([action.payload])
      }
    case SET_TENANTS:
      return {
        ...state,
        tenants: action.payload,
      };
    case SET_BILL_TYPES:
      return {
        ...state,
        billTypes: action.payload
      };
    case ADD_BILL_TYPE:
      return {
        ...state,
        billTypes: state.billTypes.concat([action.payload])
      }
    case TOGGLE_ADD_BILL_DIALOG:
      return {
        ...state,
        addBillDialog: {
          ...state.addBillDialog,
          isOpen: !state.addBillDialog.isOpen
        }
      }
    case SET_CURRENT_BILL_TYPE:
      return {
        ...state,
        addBillDialog: {
          ...state.addBillDialog,
          billTypeId: action.payload.billTypeId,
          title: action.payload.title
        }
      }
    default:
      return state;
  }
};

export default reducers;