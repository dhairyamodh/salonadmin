import {
  branchTypes,
  categoryTypes,
  serviceTypes,
  restaurantTypes,
} from "../types";
import servicesApi from "../api/servicesApi";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";
export const createService = (data, cb, errorCb) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Service Added Succesfully",
      errorMessage: "Failed to add Service",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: serviceTypes.CREATE_SERVICE,
      payload: {
        request: {
          url: servicesApi.CREATE_SERVICE,
          method: "post",
          data: formData,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const updateService = (data, cb, errorCb) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Service Updated Succesfully",
      errorMessage: "Failed to update Service",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: serviceTypes.UPDATE_SERVICE,
      payload: {
        request: {
          url: servicesApi.UPDATE_SERVICE,
          method: "PUT",
          data: formData,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const deleteService = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Service Deleted Succesfully",
      errorMessage: "Failed to delete Service",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: serviceTypes.DELETE_SERVICE,
      payload: {
        request: {
          url: servicesApi.DELETE_SERVICE,
          method: "delete",
          data: data,
        },
      },
    });
};

export const getSalonServices = (data) => {
  return {
    type: serviceTypes.GET_SALON_SERVICES,
    payload: {
      request: {
        url: servicesApi.GET_SALON_SERVICES,
        method: "get",
        params: {
          ...data,
        },
      },
    },
  };
};
