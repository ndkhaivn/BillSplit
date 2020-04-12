import {
  SET_BILL_TYPES,
  SET_TENANTS,
  ADD_TENANT,
  ADD_BILL_TYPE,
  TOGGLE_ADD_BILL_DIALOG,
  SET_CURRENT_BILL_TYPE,
  ADD_BILL,
  DELETE_BILL,
  DELETE_BILL_TYPE
} from "../actionTypes";
import axios from "axios";
import { fromDateFormat, toDateFormat } from "../../utilitiy";

export const getAllTenants = () => (dispatch) => {
  axios.get('/tenants')
    .then(res => {
      // Convert date string to js Date
      for (let tenant of res.data) {
        tenant.stays = tenant.stays.map(stay => ({
          fromDate: fromDateFormat(stay.fromDate),
          toDate: fromDateFormat(stay.toDate)
        }));
      }

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
    .then((res) => {
      dispatch({
        type: ADD_TENANT,
        payload: {
          ...tenant,
          tenantId: res.data.tenantId
        }
      });
    })
    .catch((error => {
      console.log(error);
    }));
}

export const getAllBillTypes = () => (dispatch) => {
  axios.get('/bill-types')
    .then(res => {

      // Convert date string to js Date
      for (let billType of res.data) {
        billType.bills = billType.bills.map(bill => ({
          ...bill,
          paymentDate: fromDateFormat(bill.paymentDate),
          period: {
            fromDate: fromDateFormat(bill.period.fromDate),
            toDate: fromDateFormat(bill.period.toDate)
          }
        }));
      }

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

export const addBill = (bill) => (dispatch) => {

  const newBill = {
    ...bill,
    paymentDate: toDateFormat(bill.paymenDate),
    period: {
      fromDate: toDateFormat(bill.period.fromDate),
      toDate: toDateFormat(bill.period.toDate)
    }
  }

  axios.post("/bills", newBill)
    .then((res) => {
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