import userApi from "../api/userApi";
import { userTypes } from "../types";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const loginUser = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Login Succcess",
      errorMessage: "Failed to Login",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: userTypes.LOGIN_USER,
      payload: {
        request: {
          url: userApi.LOGIN_USER,
          method: "post",
          data: data,
        },
      },
    });
};

export const expireSubScription = () => {
  return {
    type: userTypes.EXPIRED_SUBSCRIPTION,
  };
};

export const getOtp = (mobile, cb) => {
  // console.log(data);
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Otp sent successfully",
      errorMessage: "Failed to get otp",
      enableMessage: true,
      cb: cb,
      type: userTypes.FORGOT_PASSWORD,
      payload: {
        request: {
          url: userApi.FORGOT_PASSWORD,
          method: "post",
          data: {
            mobile: mobile,
          },
        },
      },
    });
};

export const forgotPassword = (data, cb) => {
  // console.log(data);
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Password reset successfully",
      errorMessage: "Failed",
      enableMessage: true,
      cb: cb,
      type: userTypes.FORGOT_PASSWORD,
      payload: {
        request: {
          url: userApi.FORGOT_PASSWORD,
          method: "put",
          data: data,
        },
      },
    });
};

export const logoutUser = () => {
  return {
    type: userTypes.LOGOUT_USER,
  };
};

// export const getUserDetails = () => {
//   return {
//     type: userTypes.GET_USER_DETAILS,
//     payload: {
//       request: {
//         url: "http://52.66.250.121:80/api/auth/login",
//         method: "POST",
//         data:{
//           email:"dhairyamodh123@gmail.com"
//         }
//       },
//     },
//   };
// };
export const getUserDetails = () => {
  return {
    type: userTypes.GET_USER_DETAILS,
    payload: {
      request: {
        url: userApi.GET_USER_DETAILS,
        method: "GET",
      },
    },
    // payload: { name, email },
    // meta: {
    //   offline: {
    //     // the network action to execute:
    //     effect: {
    //       url: "https://my-api.com/resource/api/register",
    //       method: "POST",
    //       body: `name=${name}&email=${email}`,
    //       headers: { "content-type": "application/x-www-form-urlencoded" },
    //     },
    //     // action to dispatch when effect succeeds:
    //     commit: { type: "REGISTER_USER_COMMIT", meta: { name, email } },
    //     // action to dispatch if network action fails permanently:
    //     rollback: { type: "REGISTER_USER_ROLLBACK", meta: { name, email } },
    //   },
    // },
  };
};

export const getAllUsers = (resId, branchId, status) => {
  return {
    type: userTypes.GET_ALL_USERS,
    payload: {
      request: {
        url: userApi.GET_ALL_USERS,
        method: "GET",
        params: {
          salonId: resId,
          branchId: branchId,
          status: status,
        },
      },
    },
  };
};

export const createUser = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "User Added Succesfully",
      errorMessage: "Failed to Add User",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: userTypes.CREATE_USER,
      payload: {
        request: {
          url: userApi.CREATE_USER,
          method: "post",
          data: data,
        },
      },
    });
};

export const updateUser = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "User Updated Succesfully",
      errorMessage: "Failed to update User",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: userTypes.UPDATE_USER,
      payload: {
        request: {
          url: userApi.UPDATE_USER,
          method: "put",
          data: data,
        },
      },
    });
};

export const deleteUser = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "User Deleted Succesfully",
      errorMessage: "Failed to delete User",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: userTypes.DELETE_USER,
      payload: {
        request: {
          url: userApi.DELETE_USER,
          method: "delete",
          data: data,
        },
      },
    });
};
