import {
  categoryTypes,
  commonTypes,
  expenseTypes,
  currency,
  userTypes,
  userGroupTypes,
} from "../types";

const initialstate = {};

const commonDataReducer = (state = initialstate, action) => {
  switch (action.type) {
    case commonTypes.GET_ALL_THEMES_SUCCESS:
      return {
        ...state,
        themes: action.payload.data.data || [],
      };

    case commonTypes.GET_ALL_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions: action.payload.data.data,
      };

    // case commonTypes.GET_ALL_TABLETYPES_SUCCESS:
    //   return {
    //     ...state,
    //     tableTypes: action.payload.data.data,
    //   };

    case userTypes.LOGOUT_USER:
      return { ...initialstate };
    default:
      return state;
  }
};

export default commonDataReducer;
