import { branchTypes, orderTypes, restaurantTypes } from "../types";
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
    type: orderTypes.GET_PREVIOS_ORDERS,
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

export const getFilteredOrders = (data) => {
  return {
    type: orderTypes.GET_FILTERED_ORDERS,
    payload: {
      request: {
        url: orderApi.GET_FILTERED_ORDERS,
        method: "post",
        data: data,
      },
    },
  };
};

export const activateTable = (
  chairTypeId,
  chairNumber,
  index,
  username,
  chairPrice
) => {
  return {
    type: orderTypes.ACTIVATE_CHAIR,
    payload: {
      chairTypeId,
      chairNumber,
      index,
      username,
      chairPrice,
    },
  };
};

export const setOrderType = (type) => {
  return {
    type: orderTypes.SET_ORDER_TYPE,
    payload: {
      key: type.key,
      value: type.value,
    },
  };
};

export const addNewOtherOrder = (selectedOrderTypeId) => {
  return {
    type: orderTypes.ADD_OTHER_ORDER_TYPE,
    payload: {
      selectedOrderTypeId,
    },
  };
};

export const pushItemToActiveOrder = (item, selectedOrderTypeId) => {
  return {
    type: orderTypes.PUSH_SERVICE_TO_ORDER,
    payload: {
      item,
      selectedOrderTypeId,
    },
  };
};

export const changeItemQuantity = (quantity, index) => {
  return {
    type: orderTypes.CHANGE_SERVICE_QUANTITY,
    payload: {
      quantity,
      index,
    },
  };
};

export const setActiveOrder = (refId) => {
  return {
    type: orderTypes.SET_ACTIVE_ORDER,
    payload: refId,
  };
};

export const deleteLocalOrder = (activeOrderIndex, chairNumber) => {
  return {
    type: orderTypes.DELETE_LOCAL_ORDER,
    payload: {
      activeOrderIndex,
      chairNumber: chairNumber,
    },
  };
};

export const removeItem = (index) => {
  return {
    type: orderTypes.REMOVE_SERVICE,
    payload: {
      index,
    },
  };
};

export const setKOTitemsData = (data) => {
  return {
    type: orderTypes.SET_KOT_SERVICES,
    payload: data,
  };
};

export const confirmOrder = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Order Successfull",
      errorMessage: "Failed To Order",
      cb: cb,
      errorCb: errorCb,
      type: orderTypes.CONFIRM_ORDER,
      payload: {
        request: {
          url: orderApi.CREATE_ORDER,
          method: "post",
          data: data,
          headers: {
            "Content-type": "application/json",
          },
        },
      },
    });
};

export const updateOrder = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Booking Updated Successfull",
      errorMessage: "Failed To Booking",
      cb: cb,
      errorCb: errorCb,
      type: orderTypes.UPDATE_ORDER,
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

export const getPreviosOrders = (data) => {
  return {
    type: orderTypes.GET_PREVIOS_ORDERS,
    payload: {
      request: {
        url: orderApi.GET_PREVIOS_ORDERS,
        method: "GET",
        params: {
          ...data,
        },
      },
    },
  };
};

export const setOtherCharges = (data) => {
  return {
    type: orderTypes.SET_OTHER_CHARGES,
    payload: data,
  };
};

export const setDiscount = (data) => {
  return {
    type: orderTypes.SET_DISCOUNT,
    payload: data,
  };
};
