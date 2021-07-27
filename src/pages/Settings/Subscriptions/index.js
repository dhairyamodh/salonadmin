import React from "react";
import { useSelector } from "react-redux";
import PageCreator from "../../../components/PageCreator";
import {
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  updateSubscription,
} from "../../../redux/action/commonActions";
const Subscriptions = () => {
  const subscriptions = useSelector((state) => state.all.subscriptions);

  const tableHeaders = [
    { title: "Subscription Name", key: "subscriptionName" },

    { title: "Duration (Months)", key: "subscriptionDuration" },
    { title: "Amount", key: "subscriptionAmount" },

    { title: "Subscribers", key: "subscribers" },
    { title: "Status", key: "status" },
  ];
  const formData = [
    {
      type: "text",
      name: "subscriptionName",
      label: "Subscription Name",
      size: 3,

      placeholder: "Type Subscription Name",
      // required: true,
    },
    {
      type: "number",
      name: "subscriptionAmount",
      label: "Subscription Amount",
      size: 3,

      placeholder: "Type Subscription Amount",
      // required: true,
    },
    {
      type: "number",
      name: "subscriptionDuration",
      label: "Subscription Duration",
      size: 3,

      placeholder: "Type Subscription Duration",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Subscription Duration is required",
        },
        maxLength: {
          value: 2,
          message: "Please select lesser duration , maximum allowed 99",
        },
      },
    },

    {
      type: "select",
      name: "status",
      size: 3,

      label: "Status",
      options: [
        {
          title: "Active",
          value: true,
        },
        {
          title: "Inactive",
          value: false,
        },
      ],
      optionLabelProp: "title",
      optionValueProp: "value",
    },
  ];

  const pageProps = {
    title: "Subscriptions",
    layout: "tabular",
    formData: formData,
    tableHeaders: tableHeaders,
    tableData: subscriptions,
    searchByField: undefined,
    searchByLabel: undefined,

    sortable: true,

    paginated: true,

    enableImport: false,
    importHeaders: [],

    importData: [],

    // hideEdit,
    // hideDelete,
    // hideAdd,
    // hideView,
    tableRowActions: [],
    pageHeaderActions: [],

    defaultFormValues: {},
    deleteVariableTitle: undefined,
    onAdd: createSubscription,
    onEdit: updateSubscription,
    onDelete: deleteSubscription,
    onImport: () => {},

    getData: getAllSubscriptions,
    getImportData: () => {},
    afterAddSuccess: () => {},
    afterEditSuccess: () => {},
    afterDeleteSuccess: () => {},
    afterImportSuccess: () => {},
  };

  return (
    <div>
      <PageCreator {...pageProps} />
    </div>
  );
};

export default Subscriptions;
