import {
  SET_BILL_TYPES,
  SET_TENANTS
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