const commonApi = {
  GET_ALL_THEMES: `/superadmin/themes/all`,

  GET_ALL_SUBSCRIPTIONS: `/superadmin/subscriptions/all`,

  GET_ALL_TABLETYPES: `/superadmin/commoncollections/all/tableTypes`,

  ADD_NEW_TABLETYPE: "/superadmin/tabletypes/create",
  UPDATE_TABLETYPE: "/superadmin/tabletypes/update",

  REMOVE_TABLETYPE: `/superadmin/tabletypes/delete`,

  ADD_NEW_THEME: "/superadmin/themes/create",
  UPDATE_THEME: "/superadmin/themes/update",

  REMOVE_THEME: `/superadmin/themes/delete`,

  ADD_NEW_SUBSCRIPTION: "/superadmin/subscriptions/create",
  UPDATE_SUBSCRIPTION: "/superadmin/subscriptions/update",

  REMOVE_SUBSCRIPTION: `/superadmin/subscriptions/delete`,
};
export default commonApi;
