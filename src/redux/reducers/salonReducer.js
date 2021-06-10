import { act } from "react-dom/test-utils";
import { get } from "react-hook-form";
import { salonTypes, userTypes } from "../types";

const initialstate = {
  allSalons: [],
};

const salonReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data;

  const getUpdatedRestaurants = () => {
    let allres = state.allSalons;
    let foundRes = allres.findIndex((res) => {
      return res._id === getData().data.id;
    });
    if (foundRes > -1) {
      allres[foundRes] = getData().data;
    }

    console.log("found res", allres[foundRes]);
    return allres;
  };

  switch (action.type) {
    // case salonTypes.CREATE_RESTAURANT_SUCCESS:
    //   return {
    //     ...state,
    //     allSalons: [
    //       ...state.allSalons,
    //       { ...action.payload.data.data, branchCount: 0, userCount: 0 },
    //     ],
    //   };

    // case salonTypes.UPDATE_RESTAURANT_SUCCESS:
    //   return {
    //     ...state,
    //     allSalons: [...getUpdatedRestaurants()],
    //   };
    case salonTypes.GET_ALL_SALONS_SUCCESS:
      return {
        ...state,
        allSalons: getData().data,
      };
    case userTypes.LOGOUT_USER:
      return { ...initialstate };
    default:
      return state;
  }
};

export default salonReducer;
