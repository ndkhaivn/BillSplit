import {
  SET_BILL_TYPES,
  SET_TENANTS,
  ADD_TENANT,
  ADD_BILL_TYPE,
  TOGGLE_ADD_BILL_DIALOG,
  SET_CURRENT_BILL_TYPE,
  ADD_BILL,
} from "../actionTypes";

const initialState = {
  tenants: [],
  billTypes: [],
  addBillDialog: {
    isOpen: false,
    billTypeId: "",
    title: "",
    paymentDate: "",
    period: {},
    split: [],
  },
};

const reducers = function (state = initialState, action) {
  switch (action.type) {
    case ADD_TENANT:
      return {
        ...state,
        tenants: state.tenants.concat([action.payload]),
      };
    case SET_TENANTS:
      return {
        ...state,
        tenants: action.payload,
      };
    case SET_BILL_TYPES:
      return {
        ...state,
        billTypes: action.payload,
      };
    case ADD_BILL_TYPE:
      return {
        ...state,
        billTypes: state.billTypes.concat([action.payload]),
      };
    case TOGGLE_ADD_BILL_DIALOG:
      return {
        ...state,
        addBillDialog: {
          ...state.addBillDialog,
          isOpen: !state.addBillDialog.isOpen,
        },
      };
    case SET_CURRENT_BILL_TYPE:
      return {
        ...state,
        addBillDialog: {
          ...state.addBillDialog,
          billTypeId: action.payload.billTypeId,
          title: action.payload.title,
        },
      };
    case ADD_BILL:
      const bill = action.payload;
      const index = state.billTypes.map(billType => billType.billTypeId).indexOf(bill.billTypeId);
      const newState = {
        ...state,
        billTypes: [
          ...state.billTypes
        ],
        addBillDialog: {
          isOpen: false
        }
      };

      newState.billTypes[index].bills = newState.billTypes[index].bills.concat(bill);
      return newState;

    default:
      return state;
  }
};

export default reducers;
