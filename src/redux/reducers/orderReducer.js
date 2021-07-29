import {
  branchTypes,
  categoryTypes,
  commonTypes,
  orderTypes,
  chairTypes,
  userTypes,
  serviceTypes,
} from "../types";
import { uuid } from "uuidv4";
import { TYPESOFORDERS } from "../../contants";
import getFloat from "../../helpers/getFloat";
const datachairTypes = [];

const dummyActive = (payload) => {
  const { chairNumber, chairTypeId, username, chairPrice } = payload;
  return {
    chairNumber: chairNumber,
    chairTypeId: chairTypeId,
    associatedPerson: username,
    items: [],
    chairPrice: chairPrice || 0,
    orderType: 0,
    otherCharges: 0,
    discount: 0,
    lastKOTItems: [],
    refId: uuid(),
  };
};
const initialstate = {
  chairTypes: datachairTypes,
  allChairs: [],
  activeOrders: [],
  activeOrderIndex: undefined,
  itemCategories: [],
  allServices: [],
  lastOrderNumber: 0,
  selectedOrderType: "Chair",
  selectedOrderTypeId: TYPESOFORDERS[0].value,
  previousOrders: [],
};

const findActiveOrder = (activeOrders, refId) => {
  const foundOrder = activeOrders.findIndex((order) => order.refId === refId);
  if (foundOrder > -1) {
    return foundOrder;
  } else {
    return null;
  }
};

const setOrderType = ({ key, value }) => {
  return {
    selectedOrderType: key,
    selectedOrderTypeId: value,
  };
};

const activateTable = (allChairs, index) => {
  allChairs[index].active = true;
  return allChairs;
};

const pushItemToActiveOrder = (
  activeOrders,
  activeOrderIndex,
  stateOrderId,
  item,
  selectedOrderTypeId
) => {
  if (activeOrders[activeOrderIndex]) {
    const iteminde = activeOrders[activeOrderIndex].items.findIndex((data) => {
      return data.id === item.id;
    });
    if (iteminde >= 0) {
      activeOrders[activeOrderIndex].items[iteminde].quantity++;
      activeOrders[activeOrderIndex].items[iteminde].itemTotal += getFloat(
        activeOrders[activeOrderIndex].items[iteminde].salePrice
      );
    } else {
      activeOrders[activeOrderIndex].items.push({
        ...item,
        quantity: 1,
        itemTotal: getFloat(1 * item.salePrice),
      });
    }
  } else {
    console.log(
      "push else",
      activeOrders[activeOrderIndex],
      activeOrderIndex,
      activeOrders
    );
    alert("Please select order type");
  }

  return activeOrders;
};

const addNewOtherOrder = (activeOrders, selectedOrderTypeId) => {
  activeOrders.push({
    chairNumber: undefined,
    chairTypeId: undefined,
    associatedPerson: "Rahul",
    items: [],
    chairPrice: 0,
    orderType: selectedOrderTypeId,
    otherCharges: 0,
    discount: 0,
    lastKOTItems: [],
    refId: uuid(),
  });
  return activeOrders;
};

const changeItemQuantity = (allChairs, activeOrderIndex, quantity, index) => {
  if (activeOrderIndex || activeOrderIndex === 0)
    allChairs[activeOrderIndex].items[index].quantity = quantity;

  allChairs[activeOrderIndex].items[index].itemTotal =
    quantity * allChairs[activeOrderIndex].items[index].salePrice;
  return allChairs;
};

const removeItem = (allChairs, activeOrderIndex, index) => {
  if (activeOrderIndex || activeOrderIndex === 0) {
    allChairs[activeOrderIndex].items = allChairs[
      activeOrderIndex
    ].items.filter((ite, itemindex) => {
      return itemindex != index;
    });
  }

  return allChairs;
};

const deleteLocalOrder = (activeOrders, allChairs, orderIndex, chairNumber) => {
  let filteredTables = activeOrders.filter((chair, tabindex) => {
    return tabindex !== orderIndex;
  });

  if (chairNumber) {
    let mychair = allChairs.findIndex((chair) => {
      return chair.chairNumber == chairNumber;
    });
    if (mychair >= 0) {
      allChairs[mychair].active = false;
    }
  }
  return {
    activeOrders: filteredTables,
    allChairs: allChairs,
  };
};

const changeMiscDetails = (activeOrders, activeOrderIndex, data, variable) => {
  if (activeOrderIndex || activeOrderIndex === 0) {
    activeOrders[activeOrderIndex][variable] = data;
  } else {
    alert("Please activate an order to change");
  }

  return activeOrders;
};

const orderReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data;
  switch (action.type) {
    case userTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        lastOrderNumber: action.payload.data.user.orderNumber || 0,
      };

    case userTypes.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        lastOrderNumber: action.payload.data.user.orderNumber || 0,
      };

    case serviceTypes.GET_SALON_SERVICES_SUCCESS:
      return {
        ...state,

        allServices: getData().data,
      };

    // case commonTypes.GET_ALL_TABLETYPES_SUCCESS:
    //   return {
    //     ...state,
    //     chairTypes: action.payload.data.data,
    //   };

    case categoryTypes.GET_BRANCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        itemCategories: getData().data,
      };

    case chairTypes.GET_ALL_CHAIRS_SUCCESS:
      return {
        ...state,
        allChairs: getData().data.map((item) => {
          return { ...item, active: false };
        }),
      };

    case orderTypes.SET_ORDER_TYPE:
      return {
        ...state,
        ...setOrderType(action.payload),
      };

    case orderTypes.SET_ACTIVE_ORDER:
      return {
        ...state,
        activeOrderIndex: findActiveOrder(state.activeOrders, action.payload),
      };

    case orderTypes.ACTIVATE_CHAIR:
      return {
        ...state,
        allChairs: [...activateTable(state.allChairs, action.payload.index)],
        activeOrders: [...state.activeOrders, dummyActive(action.payload)],
        activeOrderIndex: state.activeOrders.length,
      };
    case orderTypes.ADD_OTHER_ORDER_TYPE:
      return {
        ...state,
        activeOrders: [
          ...addNewOtherOrder(
            state.activeOrders,
            action.payload.selectedOrderTypeId
          ),
        ],
        activeOrderIndex: state.activeOrders.length - 1,
      };

    case orderTypes.PUSH_SERVICE_TO_ORDER:
      return {
        ...state,
        activeOrders: [
          ...pushItemToActiveOrder(
            state.activeOrders,
            state.activeOrderIndex,
            state.selectedOrderTypeId,

            action.payload.item,
            action.payload.selectedOrderTypeId
          ),
        ],
      };

    case orderTypes.CHANGE_SERVICE_QUANTITY:
      return {
        ...state,
        activeOrders: [
          ...changeItemQuantity(
            state.activeOrders,
            state.activeOrderIndex,
            action.payload.quantity,
            action.payload.index
          ),
        ],
      };

    case orderTypes.REMOVE_SERVICE:
      return {
        ...state,
        activeOrders: [
          ...removeItem(
            state.activeOrders,
            state.activeOrderIndex,
            action.payload.index
          ),
        ],
      };

    case orderTypes.DELETE_LOCAL_ORDER:
      return {
        ...state,

        activeOrders: [
          ...deleteLocalOrder(
            state.activeOrders,
            state.allChairs,
            action.payload.activeOrderIndex,
            action.payload.chairNumber
          ).activeOrders,
        ],
        allChairs: [
          ...deleteLocalOrder(
            state.activeOrders,
            state.allChairs,
            action.payload.activeOrderIndex,
            action.payload.chairNumber
          ).allChairs,
        ],
      };

    case orderTypes.SET_DISCOUNT:
      return {
        ...state,
        activeOrders: [
          ...changeMiscDetails(
            state.activeOrders,
            state.activeOrderIndex,
            action.payload,
            "discount"
          ),
        ],
      };

    case orderTypes.SET_OTHER_CHARGES:
      return {
        ...state,
        activeOrders: [
          ...changeMiscDetails(
            state.activeOrders,
            state.activeOrderIndex,
            action.payload,
            "otherCharges"
          ),
        ],
      };

    case orderTypes.CONFIRM_ORDER_SUCCESS:
      return {
        ...state,

        lastOrderNumber: getData().data.orderNumber,
      };

    // case orderTypes.GET_PREVIOS_ORDERS_SUCCESS:
    //   return {
    //     ...state,

    //     previousOrders: getData().data,
    //   };

    case userTypes.LOGOUT_USER:
      return initialstate;
    default:
      return state;
  }
};

export default orderReducer;
