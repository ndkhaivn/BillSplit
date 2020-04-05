import {
  SET_BILL_TYPES,
  SET_TENANTS,
  ADD_TENANT
} from "../actionTypes";

import axios from "axios";

export const getAllTenants = () => (dispatch) => {
  axios.get('/tenants')
    .then(res => {
      dispatch({
        type: SET_TENANTS,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch({
        type: SET_TENANTS,
        payload: []
      });
      console.log(error);
    })
};

export const addTenant = (tenant) => (dispatch) => {
  axios.post("/tenants", tenant)
    .then(() => {
      dispatch({
        type: ADD_TENANT,
        payload: tenant
      });
    })
    .catch((error => {
      console.log(error);
    }));
}

export const getAllBillTypes = () => (dispatch) => {
  axios.get('/bill-types')
    .then(res => {
      dispatch({
        type: SET_BILL_TYPES,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: SET_BILL_TYPES,
        payload: []
      });
      console.log(error);
    })
};