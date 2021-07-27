import { orderTypes, utilTypes } from "../types";
const initialstate = {
  spinner: false,

  isFullScreen: false,
};

const utilReducer = (state = initialstate, action) => {
  switch (action.type) {
    case utilTypes.TOGGLE_FULL_SCREEN:
      return {
        ...state,
        isFullScreen: !state.isFullScreen,
      };

    case utilTypes.TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      };

    case "SPINNER_START":
      return {
        ...state,
        spinner: true,
      };

    case "SPINNER_STOP":
      return {
        ...state,
        spinner: false,
      };

    default:
      return state;
  }
};

export default utilReducer;
