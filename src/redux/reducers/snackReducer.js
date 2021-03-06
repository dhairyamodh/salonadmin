import { salonTypes, userTypes } from "../types";

// import { utilTypes, salonTypes, userTypes, branchTypes } from "../types";
const initialstate = {
  message: "",
  severity: "",
  open: false,
};
let success = "success";
let error = "error";

const snackReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "HIDE_SNACKBAR":
      return initialstate;

    case "SHOW_SNACKBAR":
      return {
        ...state,
        message: action.payload.data || "Success",
        severity: action.payload.severity,
        open: true,
      };
    case salonTypes.CREATE_SALON_SUCCESS:
      return {
        ...state,
        message: action.payload.data.message || "Success",
        severity: success,
        open: true,
      };
    case userTypes.LOGOUT_USER:
      return { ...initialstate };
    default:
      return state;
  }
};

export default snackReducer;
