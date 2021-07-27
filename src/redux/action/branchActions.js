import { branchTypes } from "../types";
import branchApi from "../api/branchApi";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";
export const createBranch = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Branch Added Succesfully",
      errorMessage: "Failed to Add Branch",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: branchTypes.CREATE_BRANCH,
      payload: {
        request: {
          url: branchApi.CREATE_BRANCH,
          method: "post",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const updateBranch = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Branch Updated Succesfully",
      errorMessage: "Failed to Update Branch",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: branchTypes.UPDATE_BRANCH,
      payload: {
        request: {
          url: branchApi.UPDATE_BRANCH,
          method: "PUT",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const deleteBranch = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Branch Deleted Succesfully",
      errorMessage: "Failed to Delete Branch",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: branchTypes.DELETE_BRANCH,
      payload: {
        request: {
          url: branchApi.DELETE_BRANCH,
          method: "delete",
          data: data,
        },
      },
    });
};

export const getAllBranches = (id, status) => {
  return {
    type: branchTypes.GET_ALL_BRANCHES,
    payload: {
      request: {
        url: branchApi.GET_ALL_BRANCHES,
        method: "get",
        params: {
          id: id,
          status: status,
        },
      },
    },
  };
};
