import { categoryTypes } from "../types";
import categoryApi from "../api/categoryApi";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";
export const createCategory = (data, cb, errorCb) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Category Added Succesfully",
      errorMessage: "Failed to add Category",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: categoryTypes.CREATE_CATEGORY,
      payload: {
        request: {
          url: categoryApi.CREATE_CATEGORY,
          method: "post",
          data: formData,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const updateCategory = (data, cb, errorCb) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Category Updated Succesfully",
      errorMessage: "Failed to update Category",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: categoryTypes.UPDATE_CATEGORY,
      payload: {
        request: {
          url: categoryApi.UPDATE_CATEGORY,
          method: "PUT",
          data: formData,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const deleteCategory = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Category deleted Succesfully",
      errorMessage: "Failed to delete Category",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: categoryTypes.DELETE_CATEGORY,
      payload: {
        request: {
          url: categoryApi.DELETE_CATEGORY,
          method: "delete",
          data: data,
        },
      },
    });
};

export const getAllSalonCategories = (data) => {
  return {
    type: categoryTypes.GET_SALON_CATEGORIES,
    payload: {
      request: {
        url: categoryApi.GET_ALL_CATEGORIES,
        method: "get",
        params: {
          ...data,
        },
      },
    },
  };
};
