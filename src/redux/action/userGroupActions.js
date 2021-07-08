import userGroupApi from "../api/userGroupApi";
import { userGroupTypes } from "../types";

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

export const createUserGrpups = (data) => {
  console.log("submit", data);
  return {
    type: userGroupTypes.CREATE_USER_GROUP,
    payload: {
      request: {
        url: userGroupApi.CREATE_USER_GROUP,
        method: "post",
        data: data,
      },
    },
  };
};

export const updateUserGrpups = (data) => {
  return {
    type: userGroupTypes.UPDATE_USER_GROUP,
    payload: {
      request: {
        url: userGroupApi.UPDATE_USER_GROUP,
        method: "put",
        data: data,
      },
    },
  };
};

export const deleteUserGrpups = (data) => {
  return {
    type: userGroupTypes.DELETE_USER_GROUP,
    payload: {
      request: {
        url: userGroupApi.DELETE_USER_GROUP,
        method: "delete",
        data: data,
      },
    },
  };
};
