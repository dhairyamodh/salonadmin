import {
  categoryTypes,
  commonTypes,
  expenseTypes,
  currency,
  userTypes,
  userGroupTypes,
} from "../types";

const initialstate = {
  themes: [],
  subscriptions: [],
  currency: [],
  categoryTypes: [],
  expenseTypes: [],
  allUserGroup: []
};

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

    case currency.GET_ALL_CURRENCIES_SUCCESS:
      return {
        ...state,
        currency: action.payload.data.data,
      };
    case expenseTypes.GET_ALL_EXPENSE_TYPES_SUCCESS:
      return {
        ...state,
        expenseTypes: action.payload.data.data,
      };

    case categoryTypes.GET_ALL_CATEGORY_TYPES_SUCCESS:
      return {
        ...state,
        categoryTypes: action.payload.data.data,
      };

    case userGroupTypes.GET_ALL_USER_GROUP_SUCCESS:
      return {
        ...state,
        allUserGroup: action.payload.data.data,
      };
    case userGroupTypes.GET_ALL_USER_GROUP_FAIL:
      return {
        ...state,
        allUserGroup: [],
      };
    case userTypes.LOGOUT_USER:
      return { ...initialstate };
    default:
      return state;
  }
};

export default commonDataReducer;
