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
  let newState;
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
    case DELETE_BILL_TYPE:
      return {
        ...state,
        billTypes: state.billTypes.filter((billType) => billType.billTypeId !== action.billTypeId)
      }
    case ADD_BILL:
      const bill = action.payload;
      const index = state.billTypes.map(billType => billType.billTypeId).indexOf(bill.billTypeId);
      newState = {
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
    case DELETE_BILL:
      const billTypeIndex = state.billTypes.map(billType => billType.billTypeId).indexOf(action.billTypeId);
      const billIndex = state.billTypes[billTypeIndex].bills.map(bill => bill.billId).indexOf(action.billId);
      newState = {
        ...state,
        billTypes: [
          ...state.billTypes
        ]
      };
      newState.billTypes[billTypeIndex].bills.splice(billIndex, 1);
      return newState;
    default:
      return state;
  }
};

export default reducers;
