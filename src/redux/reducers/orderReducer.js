import { orderTypes, utilTypes } from "../types";
const initialstate = {
  orders: [],
};

const orderReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data;
  switch (action.type) {
    case orderTypes.GET_ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        orders: getData().data,
      };

    default:
      return state;
  }
};

export default orderReducer;
