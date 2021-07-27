import commonApi from "../api/commonApi";
import { commonTypes, currency } from "../types";

import superadminapi from "../api/superAdminApi";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const getAllThemes = (status) => {
  console.log("theme get log");

  return {
    type: commonTypes.GET_ALL_THEMES,
    payload: {
      request: {
        url: commonApi.GET_ALL_THEMES,
        method: "get",
        params: {
          status: status,
        },
      },
    },
  };
};

export const getAllSubscriptions = (status) => {
  return {
    type: commonTypes.GET_ALL_SUBSCRIPTIONS,
    payload: {
      request: {
        url: commonApi.GET_ALL_SUBSCRIPTIONS,
        method: "get",
        params: {
          status: status,
        },
      },
    },
  };
};

export const getAllTableTypes = (status) => {
  return {
    type: commonTypes.GET_ALL_TABLETYPES,
    payload: {
      request: {
        url: commonApi.GET_ALL_TABLETYPES,
        method: "get",
        params: {
          status: status,
        },
      },
    },
  };
};

export const createTheme = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Theme Added Succesfully",
      errorMessage: "Failed to Add Theme",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: commonTypes.ADD_NEW_THEME,
      payload: {
        request: {
          url: commonApi.ADD_NEW_THEME,

          method: "post",
          data: data,
        },
      },
    });
};

export const updateTheme = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Theme Update Succesfully",
      errorMessage: "Failed to update Theme",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: commonTypes.UPDATE_THEME,
      payload: {
        request: {
          url: commonApi.UPDATE_THEME,
          method: "put",
          data: data,
        },
      },
    });
};

export const deleteTheme = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Theme Deleted Succesfully",
      errorMessage: "Failed to Delete Theme",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: commonTypes.REMOVE_THEME,
      payload: {
        request: {
          url: commonApi.REMOVE_THEME,
          method: "delete",
          data: {
            id: data,
          },
        },
      },
    });
};

export const createSubscription = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Subscription Added Succesfully",
      errorMessage: "Failed to Add Subscription",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: commonTypes.ADD_NEW_SUBSCRIPTION,
      payload: {
        request: {
          url: commonApi.ADD_NEW_SUBSCRIPTION,
          method: "post",
          data: data,
        },
      },
    });
};

export const updateSubscription = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Subscription Updated Succesfully",
      errorMessage: "Failed to update Subscription",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: commonTypes.UPDATE_SUBSCRIPTION,
      payload: {
        request: {
          url: commonApi.UPDATE_SUBSCRIPTION,
          method: "put",
          data: data,
        },
      },
    });
};

export const deleteSubscription = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Subscription Deleted Succesfully",
      errorMessage: "Failed to delete Subscription",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: commonTypes.REMOVE_SUBSCRIPTION,
      payload: {
        request: {
          url: commonApi.REMOVE_SUBSCRIPTION,
          method: "delete",
          data: {
            id: data,
          },
        },
      },
    });
};

//currency

export const createCurrency = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Currency Added Succesfully",
      errorMessage: "Failed to Add Currency",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: currency.CREATE_CURRENCY,
      payload: {
        request: {
          url: superadminapi.CREATE_SUPERADMIN_CURRENCY,
          method: "post",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const updateCurrency = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Currency Updated Succesfully",
      errorMessage: "Failed to update Currency",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: currency.UPDATE_CURRENCY,
      payload: {
        request: {
          url: superadminapi.UPDATE_SUPERADMIN_CURRENCY,
          method: "PUT",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const deleteCurrency = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Currency Deleted Succesfully",
      errorMessage: "Failed to delete Currency",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: currency.DELETE_CURRENCY,
      payload: {
        request: {
          url: superadminapi.DELETE_SUPERADMIN_CURRENCY,
          method: "delete",
          data: {
            id: data,
          },
        },
      },
    });
};

export const getAllCurrencies = (status) => {
  return {
    type: currency.GET_ALL_CURRENCIES,
    payload: {
      request: {
        url: superadminapi.GET_ALL_SUPERADMIN_CURRENCIES,
        method: "get",
        params: {
          status: status,
        },
      },
    },
  };
};
