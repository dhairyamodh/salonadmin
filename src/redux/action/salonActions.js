import restaurantApi from "../api/restaurantApi";
import SuperAdminApi from "../api/superadmin";
import { branchTypes, salonTypes } from "../types";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";
import { showSnackBar } from "./snackActions";

export const getAllSalons = (status) => {
  return {
    type: salonTypes.GET_ALL_SALONS,
    payload: {
      request: {
        url: SuperAdminApi.GET_ALL_SALONS,
        method: "get",
        params: {
          status: status,
        },
      },
    },
  };
};

export const assignSalonSubScription = (data, cb) => {
  // console.log(data);
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Subscription updated Succesfully",
      errorMessage: "Failed to update subscription",
      cb: cb,
      type: salonTypes.ASSIGN_SALON_SUBSCRIPTION,
      payload: {
        request: {
          url: SuperAdminApi.SALON_SUBSCRIPTION,
          method: "post",
          data: data,
        },
      },
    });
};

export const removeSalonSubScription = (data, cb) => {
  // console.log(data);
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Subscription Removed Succesfully",
      errorMessage: "Failed to Remove subscription",
      cb: cb,
      type: salonTypes.REMOVE_SALON_SUBSCRIPTION,
      payload: {
        request: {
          url: SuperAdminApi.SALON_SUBSCRIPTION,
          method: "delete",
          data: data,
        },
      },
    });
};

export const createRestaurant = (data, cb) => {
  // console.log(data);

  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Restaurant Added Succesfully",
      errorMessage: "Failed to Add Restaurant",
      enableMessage: true,
      cb: cb,
      type: salonTypes.CREATE_SALON,
      payload: {
        request: {
          url: SuperAdminApi.CREATE_SALON,
          method: "post",
          data: formData,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const deleteRestaurant = (data) => {
  return {
    type: salonTypes.DELETE_SALON,
    payload: {
      request: {
        url: SuperAdminApi.DELETE_SALON,
        method: "delete",
        data: { id: data },
      },
    },
  };
};

export const updateRestaurant = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: salonTypes.UPDATE_SALON,
    payload: {
      request: {
        url: SuperAdminApi.UPDATE_SALON,
        method: "put",
        data: formData,
        headers: {
          "Content-type": "multipart/form-data",
        },
      },
    },
  };
};

export const createRestaurantItem = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: salonTypes.CREATE_SALON_ITEMS,
    payload: {
      request: {
        url: restaurantApi.CREATE_SALON_ITEM,
        method: "post",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const updateRestaurantItem = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: salonTypes.UPDATE_SALON_ITEMS,
    payload: {
      request: {
        url: restaurantApi.UPDATE_UPDATE_ITEM,
        method: "PUT",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const deleteRestaurantItem = (data) => {
  return {
    type: salonTypes.DELETE_SALON_ITEMS,
    payload: {
      request: {
        url: restaurantApi.DELETE_SALON_ITEM,
        method: "delete",
        data: data,
      },
    },
  };
};

export const getAllRestaurantItems = (resId, status) => {
  return {
    type: salonTypes.GET_ALL_SALON_ITEMS,
    payload: {
      request: {
        url: restaurantApi.GET_ALL_SALON_ITEMS,
        method: "get",
        params: {
          resId: resId,

          status: status,
        },
      },
    },
  };
};
