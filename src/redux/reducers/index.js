import { combineReducers } from "redux";
import utilReducer from "./utilReducer";
import snackReducer from "./snackReducer";
import alertReducer from "./alertReducer";

import userReducer from "./userReducer";
import branchReducer from "./branchReducer";
import commonDataReducer from "./commonDataReducer";
import orderReducer from "./orderReducer";
import reportReducer from "./reportReducer";
import dashboardReducer from "./dashboardReducer";
import salonReducer from "./salonReducer";

const initialState = {
  values: {},
};

export default combineReducers({
  util: utilReducer,
  snack: snackReducer,
  alert: alertReducer,
  user: userReducer,
  salon: salonReducer,
  branch: branchReducer,
  common: commonDataReducer,
  order: orderReducer,
  report: reportReducer,
  dashboard: dashboardReducer,
});
