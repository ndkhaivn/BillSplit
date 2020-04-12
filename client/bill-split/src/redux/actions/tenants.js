import {
  SET_TENANTS,
  ADD_TENANT,
} from "../actionTypes";
import axios from "axios";
import { fromDateFormat } from "../../utilitiy";

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
      // dispatch({
      //   type: SET_TENANTS,
      //   payload: []
      // });
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