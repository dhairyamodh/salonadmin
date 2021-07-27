import React from "react";
import { useSelector } from "react-redux";
import PageCreator from "../../../components/PageCreator";
import {
  deleteCurrency,
  createCurrency,
  updateCurrency,
  getAllCurrencies,
} from "../../../redux/action/commonActions";
const Subscriptions = () => {
  const currency = useSelector((state) => state.all.currencies);

  const tableHeaders = [
    { title: "Currency Name", key: "currencyName" },
    { title: "Currency Symbol", key: "currencySymbol" },
    { title: "Status", key: "status" },
  ];
  const formData = [
    {
      type: "text",
      name: "currencyName",
      label: "Currency Name ",
      placeholder: "Enter Currency Name",
      required: true,
      size: 12,
    },
    {
      type: "text",
      name: "currencySymbol",
      label: "Currency Symbol ",
      placeholder: "Enter Currency Symbol",
      required: true,
      size: 12,
    },

    {
      type: "select",
      name: "status",
      label: "Status",
      size: 12,
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

      required: true,
    },
  ];

  const pageProps = {
    title: "Currencies",
    layout: "tabular",
    formData: formData,
    tableHeaders: tableHeaders,
    tableData: currency,
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
    onAdd: createCurrency,
    onEdit: updateCurrency,
    onDelete: deleteCurrency,
    onImport: () => {},

    getData: getAllCurrencies,
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
