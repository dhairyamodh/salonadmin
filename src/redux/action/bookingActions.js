import { branchTypes, bookingTypes, restaurantTypes } from "../types";
import branchApi from "../api/branchApi";
import { orderApi } from "../api/orderApi";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";
// export const createBranch = (data) => {
//   //   const role = store.getState();

//   //   console.log(role);

// return {
//   type: branchTypes.CREATE_BRANCH,
//   payload: {
//     request: {
//       url: branchApi.CREATE_BRANCH,
//       method: "post",
//       data: data,
//       headers: {
//         "Content-type": "application/json",
//       },
//     },
//   },
// };
// };

export const getAllOrders = (data) => {
  return {
    type: bookingTypes.GET_PREVIOS_ORDERS,
    payload: {
      request: {
        url: orderApi.GET_PREVIOS_ORDERS,
        method: "get",
        params: {
          ...data,
        },
      },
    },
  };
};

export const getItem = (orderNumber) => {
  return {
    type: bookingTypes.GET_ITEM_FROM_BOOKING,
    payload: {
      orderNumber,
    },
  };
};

export const pushItem = (item, selectedOrderTypeId) => {
  return {
    type: bookingTypes.PUSH_SERVICE_TO_BOOKING,
    payload: {
      item,
    },
  };
};

export const removeItem = (index) => {
  return {
    type: bookingTypes.REMOVE_SERVICE,
    payload: {
      index,
    },
  };
};


export const updateOrder = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Booking Updated Successfull",
      errorMessage: "Failed To Booking",
      cb: cb,
      errorCb: errorCb,
      type: bookingTypes.UPDATE_ORDER,
      payload: {
        request: {
          url: orderApi.UPDATE_ORDER,
          method: "put",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const setDiscount = (data) => {
  return {
    type: bookingTypes.SET_DISCOUNT,
    payload: data,
  };
};
