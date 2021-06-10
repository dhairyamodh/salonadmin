import SuperAdminApi from "../api/superadmin";
import {
  branchTypes,
  categoryTypes,
  serviceTypes,
  restaurantTypes,
} from "../types";
import servicesApi from "../api/servicesApi";
export const createService = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: serviceTypes.CREATE_SERVICE,
    payload: {
      request: {
        url: servicesApi.CREATE_SERVICE,
        method: "post",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const updateService = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return {
    type: serviceTypes.UPDATE_SERVICE,
    payload: {
      request: {
        url: servicesApi.UPDATE_SERVICE,
        method: "PUT",
        data: formData,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};

export const deleteService = (data) => {
  return {
    type: serviceTypes.DELETE_SERVICE,
    payload: {
      request: {
        url: servicesApi.DELETE_SERVICE,
        method: "delete",
        data: data,
      },
    },
  };
};

export const getSalonServices = (status) => {
  return {
    type: serviceTypes.GET_SALON_SERVICES,
    payload: {
      request: {
        url: servicesApi.GET_SALON_SERVICES,
        method: "get",
        params: {
          status: status,
        },
      },
    },
  };
};
export const getBranchServices = (branchId, status) => {
  return {
    type: serviceTypes.GET_BRANCH_SERVICES,
    payload: {
      request: {
        url: servicesApi.GET_BRANCH_SERVICES,
        method: "get",
        params: {
          branchId: branchId,
          status: status,
        },
      },
    },
  };
};

export const importServices = (data) => {
  return {
    type: serviceTypes.IMPORT_ITEMS,
    payload: {
      request: {
        url: servicesApi.IMPORT_ITEMS,
        method: "post",
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      },
    },
  };
};
