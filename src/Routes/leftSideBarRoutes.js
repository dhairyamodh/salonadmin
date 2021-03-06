export const superadmin = [
  {
    title: "Dashboard",
    icon: "mdi mdi-view-dashboard-outline",

    link: "/",
  },

  {
    title: "Salon",
    icon: "mdi mdi-food-fork-drink",
    link: "/salons",
  },
  // {
  //   title: "Branch",
  //   icon: "mdi mdi-source-branch",
  //   link: "/branches",
  // },
  {
    title: "Employees",
    icon: "mdi mdi-account-check-outline",
    link: "/employees",
  },

  {
    title: "Setting",
    icon: "mdi mdi-cog-outline",

    children: [
      {
        title: "Subscriptions",
        // icon: "mdi mdi-package-variant-closed",
        link: "/managesubscriptions",
      },

      {
        title: "Themes",
        link: "/managethemes",
      },
      {
        title: "Currency",
        link: "/currency",
      },
    ],
  },
];

export const salonadmin = [
  {
    title: "Dashboard",
    icon: "mdi mdi-view-dashboard-outline",

    link: "/",
  },
  {
    title: "POS",
    icon: "mdi mdi-cart-outline",

    link: "/pos",
  },
  {
    title: "Bookings",
    icon: "mdi mdi-calendar-multiselect",
    link: "/bookings",
  },
  {
    title: "Resources",

    icon: "mdi mdi-link-variant",

    children: [
      {
        title: "Categories",
        icon: "mdi mdi-format-list-bulleted",
        link: "/categories",
      },
      {
        title: "Services",
        role: "salonadmin",
        icon: "mdi mdi-package-variant-closed",
        link: "/services",
      },
      {
        title: "Offers",
        role: "salonadmin",
        icon: "mdi mdi-gift",
        link: "/offers",
      },

      {
        title: "Deals",
        role: "salonadmin",
        icon: "mdi mdi-ticket-percent",
        link: "/deals",
      },
      {
        title: "Chairs",
        role: "salonadmin",
        icon: "mdi mdi-chair-school",
        link: "/chairs",
      },
    ],
  },

  // {
  //   title: "Branch",
  //   icon: "mdi mdi-source-branch",
  //   role: "salonadmin",
  //   link: "/branches",
  // },
  {
    title: "Employees",
    role: "salonadmin",
    icon: "mdi mdi-account-check-outline",
    link: "/employees",
  },
  {
    title: "Customers",
    role: "salonadmin",
    icon: "mdi mdi-account-outline",
    link: "/customers",
  },
  {
    title: "Users",
    role: "salonadmin",
    icon: "mdi mdi-account-outline",
    link: "/users",
  },
  {
    title: "Expenses",
    icon: "mdi mdi-wallet-outline",
    link: "/expenses",
  },

  {
    title: "Reports",
    icon: "mdi mdi-chart-line",
    children: [
      {
        title: "Daily Report",
        link: "/reports/dailyreport",
      },
      {
        title: "Cash Book",
        link: "/reports/cashbook",
      },
      // {
      //   title: "Bookings Report",
      //   link: "/reports/orderreport",
      // },
      {
        title: "Expense Report",
        link: "/reports/expensereport",
      },
      {
        title: "Service Report",
        link: "/reports/servicereport",
      },
      {
        title: "Sales Report",
        link: "/reports/salesreport",
      },
    ],
  },

  // {
  //   title: "Manage Chairs",
  //   icon: "mdi mdi-table-column-plus-after",
  //   link: "/managetables",
  // },
  // {
  //   title: "Manage Hotkeys",
  //   icon: "mdi mdi-alpha-h-circle",
  //   link: "/managehotkeys",
  // },
];

export const branchadmin = [
  {
    title: "Dashboard",
    icon: "mdi mdi-view-dashboard-outline",

    link: "/",
  },
  // {
  //   title: "Users",
  //   role: "salonadmin",
  //   icon: "mdi mdi-account-outline",
  //   children: [
  //     {
  //       title: "Users",
  //       link: "/manageusers",
  //     },
  //     { title: "Reports", link: "/dum" },
  //   ],
  // },
  {
    title: "Order Dashboard",
    icon: "mdi mdi-bowling",
    link: "/order",
  },

  {
    title: "Expenses",
    icon: " mdi mdi-wallet",

    link: "/manageexpense",
  },
  {
    title: "Order History",
    icon: "mdi mdi-history",

    link: "/orderhistory",
  },
  {
    title: "Resources",
    icon: "mdi mdi-link-variant",

    children: [
      {
        title: "Items",
        role: "salonadmin",
        icon: "mdi mdi-food",
        link: "/services",
      },
      {
        title: "Categories",
        icon: "mdi mdi-yelp",
        link: "/categories",
      },
      {
        title: "Chairs",
        icon: "mdi mdi-table-column-plus-after",
        link: "/managetables",
      },
    ],
  },
  {
    title: "Setting",
    icon: "mdi mdi-cog-outline",

    children: [
      {
        title: "Printer Setting",
        link: "/manageprinters",
      },
    ],
  },
  // {
  //   title: "Manage Hotkeys",
  //   icon: "mdi mdi-alpha-h-circle",
  //   link: "/managehotkeys",
  // },
];

export const employee = [
  // {
  //   title: "Dashboard",
  //   icon: "mdi mdi-view-dashboard-outline",

  //   link: "/",
  // },
  // {
  //   title: "Users",
  //   role: "salonadmin",
  //   icon: "mdi mdi-account-outline",
  //   children: [
  //     {
  //       title: "Users",
  //       link: "/manageusers",
  //     },
  //     { title: "Reports", link: "/dum" },
  //   ],
  // },
  {
    title: "Bookings",
    icon: "mdi mdi-calendar-multiselect",
    link: "/bookings",
  },
  {
    title: "POS",
    icon: "mdi mdi-cart-outline",
    link: "/pos",
  },

];
export default {
  superadmin,
  salonadmin,
  branchadmin,
  employee,
};
