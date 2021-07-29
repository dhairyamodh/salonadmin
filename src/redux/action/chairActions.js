import { chairTypes } from "../types";
import chairApi from "../api/chairApi";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";
export const createChair = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Chair Added Succesfully",
      errorMessage: "Failed to Add Chair",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: chairTypes.CREATE_CHAIR,
      payload: {
        request: {
          url: chairApi.CREATE_CHAIR,
          method: "post",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const updateChair = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Chair Updated Succesfully",
      errorMessage: "Failed to Update Chair",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: chairTypes.UPDATE_CHAIR,
      payload: {
        request: {
          url: chairApi.UPDATE_CHAIR,
          method: "PUT",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const deleteChair = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Chair Deleted Succesfully",
      errorMessage: "Failed to Delete Chair",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: chairTypes.DELETE_CHAIR,
      payload: {
        request: {
          url: chairApi.DELETE_CHAIR,
          method: "delete",
          data: data,
        },
      },
    });
};

export const getAllChaires = (data) => {
  return {
    type: chairTypes.GET_ALL_CHAIRS,
    payload: {
      request: {
        url: chairApi.GET_ALL_CHAIRS,
        method: "get",
        params: {
          ...data,
        },
      },
    },
  };
};
