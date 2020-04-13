import {
  SET_TENANTS,
  ADD_TENANT,
  UPDATE_TENANT,
  DELETE_TENANT
} from "../actionTypes";
import axios from "axios";

export const getAllTenants = () => (dispatch) => {
  axios.get('/tenants')
    .then(res => {

      for (let tenant of res.data) {
        tenant.stays = tenant.stays.map(stay => ({
          fromDate: stay.fromDate,
          toDate: stay.toDate ? stay.toDate : new Date()
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

export const deleteTenant = (tenantId) => (dispatch) => {
  axios.delete(`/tenant/${tenantId}`)
    .then(() => {
      dispatch({
        type: DELETE_TENANT,
        tenantId: tenantId
      });
    })
    .catch(error => console.log(error));
}

export const addStay = (tenant, stay) => (dispatch) => {
  const updatedTenant = {
    ...tenant,
    stays: tenant.stays.concat(stay)
  };

  axios.post(`/tenant/${tenant.tenantId}`, updatedTenant)
  .then(() => {

    updatedTenant.stays = updatedTenant.stays.map(stay => ({
      fromDate: stay.fromDate,
      toDate: stay.toDate ? stay.toDate : new Date()
    }));

    dispatch({
      type: UPDATE_TENANT,
      payload: updatedTenant,
    });
  })
  .catch(error => console.log(error));
}

export const deleteStay = (tenant, stayToDelete) => (dispatch) => {
  const updatedTenant = {
    ...tenant,
    stays: tenant.stays.filter(stay => stay != stayToDelete)
  };

  axios.post(`/tenant/${tenant.tenantId}`, updatedTenant)
    .then(() => {
      dispatch({
        type: UPDATE_TENANT,
        payload: updatedTenant,
      });
    })
    .catch(error => console.log(error));
}