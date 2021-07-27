import { orderApi } from "../api/orderApi";
import { orderTypes } from "../types";

export const getAllOrders = (data) => {
  return {
    type: orderTypes.GET_ALL_BOOKINGS,
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
