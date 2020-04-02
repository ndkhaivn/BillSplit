import {SET_BILLS, SET_TENANTS} from "../actionTypes";
import { combineReducers } from "redux";

const initialState = {
  tenants: [],
  bills: []
};

const tenantReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_TENANTS:
      return {
        ...state,
        tenants: action.payload,
      };
    case SET_BILLS:
      return {
        ...state,
        bills: action.payload
      };
    default:
      return state;
  }
};

export default tenantReducer;