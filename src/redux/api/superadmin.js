const SuperAdminApi = {
  SALON_SUBSCRIPTION: "/api/superadmin/assignsubscription",

  GET_ALL_SALONS: "/api/superadmin/salons/all",
  CREATE_SALON: "/api/superadmin/salons/create",
  UPDATE_SALON: "/api/superadmin/salons/update",
  DELETE_SALON: `/api/superadmin/salons/delete`,

  GET_ALL_SUPERADMIN_CURRENCIES: "/api/superadmin/currency/all",
  CREATE_SUPERADMIN_CURRENCY: "/api/superadmin/currency/create",
  UPDATE_SUPERADMIN_CURRENCY: "/api/superadmin/currency/update",
  DELETE_SUPERADMIN_CURRENCY: `/api/superadmin/currency/delete`,

  GET_ALL_SUPERADMIN_EXPENSETYPES: "/api/superadmin/expensetype/all",
  CREATE_SUPERADMIN_EXPENSETYPE: "/api/superadmin/expensetype/create",
  UPDATE_SUPERADMIN_EXPENSETYPE: "/api/superadmin/expensetype/update",
  DELETE_SUPERADMIN_EXPENSETYPE: `/api/superadmin/expensetype/delete`,

  GET_ALL_SUPERADMIN_CATEGORYTYPES: `/api/superadmin/category`,
  CREATE_SUPERADMIN_CATEGORYTYPE: "/api/superadmin/category/create",
  UPDATE_SUPERADMIN_CATEGORYTYPE: "/api/superadmin/category/update",
  DELETE_SUPERADMIN_CATEGORYTYPE: `/api/superadmin/category/delete`,
};
export default SuperAdminApi;
