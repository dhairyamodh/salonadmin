import { expenseTypes } from "../types";

import expenseApi from "../api/expenseApi";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const createExpense = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Expense Added Succesfully",
      errorMessage: "Failed to Add Expense",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: expenseTypes.CREATE_EXPENSE,
      payload: {
        request: {
          url: expenseApi.CREATE_EXPENSE,
          method: "post",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const updateExpense = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Expense Updated Succesfully",
      errorMessage: "Failed to updated Expense",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: expenseTypes.UPDATE_EXPENSE,
      payload: {
        request: {
          url: expenseApi.UPDATE_EXPENSE,
          method: "PUT",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const deleteExpense = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Expense Deleted Succesfully",
      errorMessage: "Failed to delete Expense",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: expenseTypes.DELETE_EXPENSE,
      payload: {
        request: {
          url: expenseApi.DELETE_EXPENSE,
          method: "delete",
          data: data,
        },
      },
    });
};

export const getAllexpense = (data) => {
  return {
    type: expenseTypes.GET_ALL_EXPENSES,
    payload: {
      request: {
        url: expenseApi.GET_ALL_EXPENSES,
        method: "get",
        params: {
          ...data,
        },
      },
    },
  };
};
