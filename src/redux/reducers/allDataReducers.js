import { get } from "react-hook-form";
import {
  branchTypes,
  categoryTypes,
  expenseTypes,
  hotKeyTypes,
  serviceTypes,
  salonTypes,
  currency,
  userTypes,
  userGroupTypes,
  commonTypes,
  customerTypes,
  chairTypes,
  orderTypes,
} from "../types";

const initialstate = {
  salons: [],
  branches: [],
  users: [],
  allUserGroup: [],
  categories: [],
  salonCategories: [],

  salonServices: [],
  services: [],

  salonItems: [],
  hotkeys: [],
  expenses: [],
  salonExpenseTypes: [],

  subscriptions: [],
  currencies: [],
  themes: [],
  customers: [],
  expenses: [],
  offers: [],
  deals: [],
  chairs: [],
  bookings: [],
};

const findBookingAndUpdate = (bookings, currBooking) => {
  const foundIndex = bookings.findIndex((item) => item.id === currBooking.id);
  if (foundIndex >= 0) {
    bookings[foundIndex].isPaid = "true";
  }
  return bookings;
};

const branchReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data;
  switch (action.type) {
    case salonTypes.GET_ALL_SALONS_SUCCESS:
      return {
        ...state,
        salons: getData().data,
      };
    case orderTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        bookings: [...findBookingAndUpdate(state.bookings, getData().data)],
      };
    case orderTypes.GET_PREVIOS_ORDERS_SUCCESS:
      return {
        ...state,
        bookings: getData().data,
      };

    case orderTypes.GET_FILTERED_ORDERS_SUCCESS:
      return {
        ...state,
        bookings: getData().data,
      };

    case branchTypes.GET_ALL_BRANCHES_SUCCESS:
      return {
        ...state,
        branches: getData().data,
      };

    case userTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: getData().data,
      };

    case serviceTypes.GET_SALON_SERVICES_SUCCESS:
      return {
        ...state,
        salonServices: getData().data,
      };

    case serviceTypes.GET_BRANCH_SERVICES_SUCCESS:
      return {
        ...state,
        services: getData().data,
      };

    case userGroupTypes.GET_ALL_USER_GROUP_SUCCESS:
      return {
        ...state,
        allUserGroup: getData().data,
      };

    case commonTypes.GET_ALL_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions: getData().data,
      };

    case commonTypes.GET_ALL_CURRENCIES_SUCCESS:
      return {
        ...state,
        currencies: getData().data,
      };

    case commonTypes.GET_ALL_THEMES_SUCCESS:
      return {
        ...state,
        themes: getData().data,
      };

    case categoryTypes.GET_SALON_CATEGORIES_SUCCESS:
      return {
        ...state,
        salonCategories: getData().data,
      };

    case serviceTypes.GET_SALON_SERVICES_SUCCESS:
      return {
        ...state,
        salonServices: getData().data,
      };

    case customerTypes.GET_ALL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: getData().data,
      };

    case expenseTypes.GET_ALL_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: getData().data,
      };

    case salonTypes.GET_ALL_OFFERS_SUCCESS:
      return {
        ...state,
        offers: getData().data,
      };

    case salonTypes.GET_ALL_DEALS_SUCCESS:
      return {
        ...state,
        deals: getData().data,
      };

    case chairTypes.GET_ALL_CHAIRS_SUCCESS:
      return {
        ...state,
        chairs: getData().data,
      };
    // case categoryTypes.GET_SALON_CATEGORIES_SUCCESS:
    //   return {
    //     ...state,
    //     bookings: getData().data,
    //   };

    // case branchTypes.CREATE_BRANCH:
    //   return {
    //     ...state,
    //   };

    // case categoryTypes.GET_BRANCH_CATEGORIES_SUCCESS:
    //   return {
    //     ...state,
    //     categories: getData().data,
    //   };

    // case expenseTypes.GET_ALL_EXPENSES_SUCCESS:
    //   return {
    //     ...state,
    //     expenses: getData().data,
    //   };

    // case expenseTypes.GET_SALON_EXPENSE_TYPES_SUCCESS:
    //   return {
    //     ...state,
    //     salonExpenseTypes: getData().data,
    //   };

    // case categoryTypes.GET_SALON_CATEGORIES_SUCCESS:
    //   return {
    //     ...state,
    //     salonCategories: getData().data.filter((item) => {
    //       return (
    //         state.categories.findIndex((data) => {
    //           return data.categoryName === item.categoryName;
    //         }) < 0
    //       );
    //     }),
    //   };

    // case serviceTypes.GET_SALON_SERVICES_SUCCESS:
    //   console.log("data");
    //   return {
    //     ...state,
    //     salonItems: getData().data.filter((item) => {
    //       return (
    //         state.items.findIndex((data) => {
    //           return data.itemName === item.itemName;
    //         }) < 0
    //       );
    //     }),
    //   };
    // case serviceTypes.GET_BRANCH_ITEMS_SUCCESS:
    //   return {
    //     ...state,
    //     items: getData().data,
    //   };

    // case hotKeyTypes.GET_ALL_HOTKEYS_SUCCESS:
    //   return {
    //     ...state,
    //     hotkeys: getData().data,
    //   };

    case userTypes.LOGOUT_USER:
      return { ...initialstate };
    // case salonTypes.CREATE_SALON_SUCCESS:
    //   return {
    //     ...state,
    //     ...getData().salon,
    //   };

    default:
      return state;
  }
};

export default branchReducer;
