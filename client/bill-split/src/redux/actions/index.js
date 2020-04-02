import {
  SET_BILLS,
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

export const getAllBills = () => (dispatch) => {
  axios.get('/bills')
    .then(res => {
      dispatch({
        type: SET_BILLS,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: SET_BILLS,
        payload: []
      });
      console.log(error);
    })
};