import {
  SET_TENANTS,
  ADD_TENANT,
  UPDATE_TENANT,
  DELETE_TENANT
} from "../actionTypes";

const initialState = [];

const tenantReducers = function (state = initialState, action) {
  let newState;
  switch (action.type) {
    case ADD_TENANT:
      return state.concat([action.payload]);

    case SET_TENANTS:
      return action.payload;
      
    case UPDATE_TENANT:
      newState = [...state];
      let index = state.map(tenant => tenant.tenantId).indexOf(action.payload.tenantId);
      newState[index] = action.payload
      return newState;

    case DELETE_TENANT:
      return state.filter(tenant => tenant.tenantId != action.tenantId);

    default:
      return state;
  }
};

export default tenantReducers;
