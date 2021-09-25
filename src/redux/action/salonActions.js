import customerApi from "../api/customerApi";
import userApi from "../api/userApi";
import salonApi from "../api/salonApi";
import SuperAdminApi from "../api/superAdminApi";
import { branchTypes, customerTypes, salonTypes, userTypes } from "../types";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

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

export const createSalon = (data, cb, errorCb) => {
  // console.log(data);

  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Salon Added Succesfully",
      errorMessage: "Failed to Add Salon",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
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

export const deleteSalon = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Salon Deleted Succesfully",
      errorMessage: "Failed to Delete Salon",
      enableMessage: true,
      cb: cb,
      type: salonTypes.DELETE_SALON,
      payload: {
        request: {
          url: SuperAdminApi.DELETE_SALON,
          method: "delete",
          data: { id: data },
        },
      },
    });
};

export const updateSalon = (data, cb, errorCb) => {
  if (data) {
    delete data.subscription;
  }
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Salon Updated Succesfully",
      errorMessage: "Failed to Update Salon",
      enableMessage: true,
      cb: cb,
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
    });
};

export const createSalonItem = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: salonTypes.CREATE_SALON_ITEMS,
    payload: {
      request: {
        url: SuperAdminApi.CREATE_SALON_ITEM,
        method: "post",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const updateSalonItem = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: salonTypes.UPDATE_SALON_ITEMS,
    payload: {
      request: {
        url: SuperAdminApi.UPDATE_UPDATE_ITEM,
        method: "PUT",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const deleteSalonItem = (data) => {
  return {
    type: salonTypes.DELETE_SALON_ITEMS,
    payload: {
      request: {
        url: SuperAdminApi.DELETE_SALON_ITEM,
        method: "delete",
        data: data,
      },
    },
  };
};

export const getAllSalonItems = (resId, status) => {
  return {
    type: salonTypes.GET_ALL_SALON_ITEMS,
    payload: {
      request: {
        url: SuperAdminApi.GET_ALL_SALON_ITEMS,
        method: "get",
        params: {
          resId: resId,

          status: status,
        },
      },
    },
  };
};

export const getAllCustomers = (data) => {
  return {
    type: customerTypes.GET_ALL_CUSTOMERS,
    payload: {
      request: {
        url: customerApi.GET_ALL_CUSTOMERS,
        method: "get",
        params: {
          ...data,
        },
      },
    },
  };
};

export const getAllUsers = (data) => {
  return {
    type: userTypes.GET_ALL_WEB_USERS,
    payload: {
      request: {
        url: userApi.GET_ALL_WEB_USERS,
        method: "get",
        params: {
          ...data,
        },
      },
    },
  };
};

//offfers

export const createOffer = (data, cb, errorCb) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Offer Added Succesfully",
      errorMessage: "Failed to add Offer",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: salonTypes.CREATE_OFFER,
      payload: {
        request: {
          url: salonApi.CREATE_OFFER,
          method: "post",
          data: formData,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const updateOffer = (data, cb, errorCb) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Offer Updated Succesfully",
      errorMessage: "Failed to update Offer",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: salonTypes.UPDATE_OFFER,
      payload: {
        request: {
          url: salonApi.UPDATE_OFFER,
          method: "PUT",
          data: formData,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const deleteOffers = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Offer deleted Succesfully",
      errorMessage: "Failed to delete Offer",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: salonTypes.DELETE_OFFER,
      payload: {
        request: {
          url: salonApi.DELETE_OFFER,
          method: "delete",
          data: data,
        },
      },
    });
};

export const getAllOffers = (data) => {
  return {
    type: salonTypes.GET_ALL_OFFERS,
    payload: {
      request: {
        url: salonApi.GET_ALL_OFFERS,
        method: "get",
        params: {
          ...data,
        },
      },
    },
  };
};

//deals

export const createDeal = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Deal Added Succesfully",
      errorMessage: "Failed to add Deal",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: salonTypes.CREATE_DEAL,
      payload: {
        request: {
          url: salonApi.CREATE_DEAL,
          method: "post",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const updateDeal = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Deal Updated Succesfully",
      errorMessage: "Failed to update Deal",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: salonTypes.UPDATE_DEAL,
      payload: {
        request: {
          url: salonApi.UPDATE_DEAL,
          method: "PUT",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const deleteDeal = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Deal deleted Succesfully",
      errorMessage: "Failed to delete Deal",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: salonTypes.DELETE_DEAL,
      payload: {
        request: {
          url: salonApi.DELETE_DEAL,
          method: "delete",
          data: data,
        },
      },
    });
};

export const getAllDealss = (data) => {
  return {
    type: salonTypes.GET_ALL_DEALS,
    payload: {
      request: {
        url: salonApi.GET_ALL_DEALS,
        method: "get",
        params: {
          ...data,
        },
      },
    },
  };
};
