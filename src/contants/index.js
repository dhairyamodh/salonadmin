import moment from "moment";

export const ORDERSTATUS = [
  {
    key: "Pending",
    value: "pending",
  },
  {
    key: "Confirmed",
    value: "confirmed",
  },
  {
    key: "Completed",
    value: "completed",
  },

  {
    key: "Canceled",
    value: "canceled",
  },
];

export const DATEFORMAT = "DD/MM/YYYY";

export const DATEMONTHFORMAT = "DD MMM";

export const TIMEAMPMFORMAT = "h:mm A";

export const TIME24FORMAT = "HH:mm";

// export const BASEURL = "http://54.211.119.193:4001/api";
export const BASEURL = "http://52.55.94.175:4001/api";

// export const BASEURL = "http://192.168.0.111:4001/api";

export const BASEIMAGEURL = BASEURL.replace("/api", "");

export const TIMEFORMAT = "HH:mm:ss";

export const TIMEONLY = "HH:mm";

export const DATETIMEFORMAT = "DD/MM/YYYY HH:mm";

export const TIMEZONE = "Asia/Kolkata";

export const ROOTURL = "";

export const CURRENCY = "$";

export const TYPESOFPAYMENTS = [
  { type: "Cash", id: 0, icon: "mdi mdi-cash-multiple" },

  { type: "Card", id: 1, icon: "mdi mdi-credit-card" },
  { type: "Other", id: 2, icon: "mdi mdi-wallet-outline" },
];

export const MONTHSARRAY = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const WEEKARRAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const TYPESOFORDERS = [
  { key: "Chair", value: 0, bgColor: "#6d81f5" },

  { key: "New Order", value: 1, bgColor: "#6d81f5" },
];

export const SHORTCUTKEYS = [{ key: "Search and add item", value: "CTRL+S" }];

export const dateRanges = {
  Today: [moment().toDate(), moment().toDate()],
  Yesterday: [
    moment().subtract(1, "days").toDate(),
    moment().subtract(1, "days").toDate(),
  ],
  "Last 7 Days": [moment().subtract(6, "days").toDate(), moment().toDate()],
  "Last 30 Days": [moment().subtract(29, "days").toDate(), moment().toDate()],
  "This Month": [
    moment().startOf("month").toDate(),
    moment().endOf("month").toDate(),
  ],
  "Last Month": [
    moment().subtract(1, "month").startOf("month").toDate(),
    moment().subtract(1, "month").endOf("month").toDate(),
  ],
};
