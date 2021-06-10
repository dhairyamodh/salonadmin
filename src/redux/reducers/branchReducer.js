import { get } from "react-hook-form";
import {
  branchTypes,
  categoryTypes,
  expenseTypes,
  hotKeyTypes,
  serviceTypes,
  salonTypes,
  tableTypes,
  userTypes,
} from "../types";

const initialstate = {
  allBranches: [],
  categories: [],
  salonCategories: [],
  items: [],
  salonItems: [],
  hotkeys: [],
  tables: [],
  expenses: [],
  salonExpenseTypes: [],
};

const branchReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data;
  switch (action.type) {
    case branchTypes.CREATE_BRANCH:
      return {
        ...state,
      };

    case branchTypes.GET_ALL_BRANCHES_SUCCESS:
      return {
        ...state,
        allBranches: getData().data,
      };

    case categoryTypes.GET_BRANCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: getData().data,
      };

    case expenseTypes.GET_ALL_EXPENSES_SUCCESS:
      return {
        ...state,
        expenses: getData().data,
      };

    case expenseTypes.GET_SALON_EXPENSE_TYPES_SUCCESS:
      return {
        ...state,
        salonExpenseTypes: getData().data,
      };

    case categoryTypes.GET_SALON_CATEGORIES_SUCCESS:
      return {
        ...state,
        salonCategories: getData().data.filter((item) => {
          return (
            state.categories.findIndex((data) => {
              return data.categoryName === item.categoryName;
            }) < 0
          );
        }),
      };

    case serviceTypes.GET_SALON_SERVICES_SUCCESS:
      console.log("data");
      return {
        ...state,
        salonItems: getData().data.filter((item) => {
          return (
            state.items.findIndex((data) => {
              return data.itemName === item.itemName;
            }) < 0
          );
        }),
      };
    case serviceTypes.GET_BRANCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: getData().data,
      };

    case hotKeyTypes.GET_ALL_HOTKEYS_SUCCESS:
      return {
        ...state,
        hotkeys: getData().data,
      };

    case tableTypes.GET_ALL_TABLES_SUCCESS:
      return {
        ...state,
        tables: getData().data,
      };
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
