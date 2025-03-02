import {
  SET_BILL_TYPES,
  ADD_BILL_TYPE,
  TOGGLE_ADD_BILL_DIALOG,
  SET_CURRENT_BILL_TYPE,
  ADD_BILL,
  DELETE_BILL,
  DELETE_BILL_TYPE
} from "../actionTypes";
import axios from "axios";
import { toDateFormat } from "../../utilitiy";

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

export const addBillType = (billType) => (dispatch) => {
  axios.post("/bill-types", billType)
    .then((res) => {
      dispatch({
        type: ADD_BILL_TYPE,
        payload: {
          ...billType,
          billTypeId: res.data.billTypeId
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
}

export const deleteBillType = (billTypeId) => (dispatch) => {
  axios.delete(`/bill-type/${billTypeId}`)
    .then(() => {
      dispatch({
        type: DELETE_BILL_TYPE,
        billTypeId
      });
    })
    .catch(error => {
      console.log(error);
    });
}

export const addBill = (bill) => (dispatch) => {

  axios.post("/bills", bill)
    .then((res) => {

      dispatch({
        type: TOGGLE_ADD_BILL_DIALOG
      });

      dispatch({
        type: ADD_BILL,
        payload: {
          ...bill,
          billId: res.data.billId
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
}

export const deleteBill = (bill) => (dispatch) => {
  
  axios.delete(`/bill/${bill.billId}`)
    .then(() => {
      dispatch({
        type: DELETE_BILL,
        billId: bill.billId,
        billTypeId: bill.billTypeId
      });
    })
    .catch(error => {
      console.log(error);
    })
}

export const toggleAddBillDialog = () => (dispatch) => {
  dispatch({
    type: TOGGLE_ADD_BILL_DIALOG
  });
}

export const setCurrentBillType = (billType) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_BILL_TYPE,
    payload: billType
  });
}
