import userGroupApi from "../api/userGroupApi";
import { userGroupTypes } from "../types";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const getAllUserGrpups = (salonId, branchId, status) => {
  return {
    type: userGroupTypes.GET_ALL_USER_GROUP,
    payload: {
      request: {
        url: userGroupApi.GET_ALL_USER_GROUP,
        method: "GET",
        params: {
          salonId: salonId,
          branchId: branchId,
          status: status,
        },
      },
    },
  };
};

export const createUserGrpups = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "User Group Created Succesfully",
      errorMessage: "Failed to create User Group",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: userGroupTypes.CREATE_USER_GROUP,
      payload: {
        request: {
          url: userGroupApi.CREATE_USER_GROUP,
          method: "post",
          data: data,
        },
      },
    });
};

export const updateUserGrpups = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "User Group Updated Succesfully",
      errorMessage: "Failed to update User Group",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: userGroupTypes.UPDATE_USER_GROUP,
      payload: {
        request: {
          url: userGroupApi.UPDATE_USER_GROUP,
          method: "put",
          data: data,
        },
      },
    });
};

export const deleteUserGrpups = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "User Group Deleted Succesfully",
      errorMessage: "Failed to delete User Group",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: userGroupTypes.DELETE_USER_GROUP,
      payload: {
        request: {
          url: userGroupApi.DELETE_USER_GROUP,
          method: "delete",
          data: data,
        },
      },
    });
};
