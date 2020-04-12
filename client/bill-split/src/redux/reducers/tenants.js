import {
  SET_TENANTS,
  ADD_TENANT,
} from "../actionTypes";

const initialState = [];

const tenantReducers = function (state = initialState, action) {
  let newState;
  switch (action.type) {
    case ADD_TENANT:
      return state.concat([action.payload]);

    case SET_TENANTS:
      return action.payload;
      
    default:
      return state;
  }
};

export default tenantReducers;
