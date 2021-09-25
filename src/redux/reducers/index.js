import { combineReducers } from "redux";
import utilReducer from "./utilReducer";
import snackReducer from "./snackReducer";
import alertReducer from "./alertReducer";

import userReducer from "./userReducer";
import allDataReducers from "./allDataReducers";
import commonDataReducer from "./commonDataReducer";
import orderReducer from "./orderReducer";
import reportReducer from "./reportReducer";
import dashboardReducer from "./dashboardReducer";
import salonReducer from "./salonReducer";
import bookingReducer from "./bookingReducer";

const initialState = {
  values: {},
};

export default combineReducers({
  util: utilReducer,
  snack: snackReducer,
  alert: alertReducer,
  user: userReducer,
  salon: salonReducer,
  all: allDataReducers,
  common: commonDataReducer,
  order: orderReducer,
  report: reportReducer,
  dashboard: dashboardReducer,
  booking: bookingReducer
});
