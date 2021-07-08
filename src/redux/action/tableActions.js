import { currency } from "../types";

import superadminapi from "../api/superadmin";

//currency

export const createCurrency = (data) => {
  return {
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
  };
};

export const updateCurrency = (data) => {
  return {
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
  };
};

export const deleteCurrency = (data) => {
  return {
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
  };
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
