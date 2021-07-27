const SuperAdminApi = {
  SALON_SUBSCRIPTION: "/superadmin/assignsubscription",

  GET_ALL_SALONS: "/superadmin/salons/all",
  CREATE_SALON: "/superadmin/salons/create",
  UPDATE_SALON: "/superadmin/salons/update",
  DELETE_SALON: `/superadmin/salons/delete`,

  GET_ALL_SUPERADMIN_CURRENCIES: "/superadmin/currency/all",
  CREATE_SUPERADMIN_CURRENCY: "/superadmin/currency/create",
  UPDATE_SUPERADMIN_CURRENCY: "/superadmin/currency/update",
  DELETE_SUPERADMIN_CURRENCY: `/superadmin/currency/delete`,

  GET_ALL_SUPERADMIN_EXPENSETYPES: "/superadmin/expensetype/all",
  CREATE_SUPERADMIN_EXPENSETYPE: "/superadmin/expensetype/create",
  UPDATE_SUPERADMIN_EXPENSETYPE: "/superadmin/expensetype/update",
  DELETE_SUPERADMIN_EXPENSETYPE: `/superadmin/expensetype/delete`,

  GET_ALL_SUPERADMIN_CATEGORYTYPES: `/superadmin/category`,
  CREATE_SUPERADMIN_CATEGORYTYPE: "/superadmin/category/create",
  UPDATE_SUPERADMIN_CATEGORYTYPE: "/superadmin/category/update",
  DELETE_SUPERADMIN_CATEGORYTYPE: `/superadmin/category/delete`,
};
export default SuperAdminApi;
