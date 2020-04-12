import tenants from "./tenants";
import billTypes from "./billTypes";
import addBillDialog from "./addBillDialog";
import { combineReducers } from "redux";

export default combineReducers({
  tenants,
  billTypes,
  addBillDialog
});