import {SET_BILL_TYPES, SET_TENANTS, ADD_TENANT} from "../actionTypes";

const initialState = {
  tenants: [],
  billTypes: []
};

const tenantReducer = function (state = initialState, action) {
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
    default:
      return state;
  }
};

export default tenantReducer;