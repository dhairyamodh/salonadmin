import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageCreator from "../../components/PageCreator";
import { BASEIMAGEURL, DATEFORMAT, dateRanges } from "../../contants";

import {
  getAllDealss,
  createDeal,
  updateDeal,
  deleteDeal,
} from "../../redux/action/salonActions";

const Customers = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.all.deals);

  const { role, salonId, branchId } = useSelector((state) => state.user);

  const tableHeaders = [
    { title: "Title", key: "dealTitle" },
    {
      title: "Sub Title",
      key: "dealSubTitle",
    },

    {
      title: "Discount",
      key: "dealDiscount",
    },

    {
      title: "Deal Code",
      key: "dealCode",
    },
    {
      title: "Start Date",
      key: "dealStartDate",
    },
    {
      title: "End Date",
      key: "dealEndDate",
    },
  ];

  const formData = [
    {
      type: "text",
      name: "dealTitle",
      label: "Title",
      placeholder: "Type Title",
      required: true,
    },

    {
      type: "text",
      name: "dealSubTitle",
      label: "Sub Title",
      placeholder: "Type Sub Title",
      required: true,
    },
    {
      type: "number",
      size: 3,
      name: "dealDiscount",
      label: "Discount(%)",
      placeholder: "Type Discount",
      required: true,
    },
    {
      type: "text",
      size: 3,
      name: "dealCode",
      label: "Deal Code",
      placeholder: "Type Sub Title",
      required: true,
    },
    {
      type: "dateTime",
      size: 3,
      name: "dealStartDate",
      label: "Deal Start Date & Time",
      placeholder: "Deal Start Date & Time",
      required: true,
      options: {
        singleDatePicker: true,
        hideRanges: true,
      },
      rules: {
        required: {
          value: true,
          message: "Start Date & time is required",
        },
      },
    },
    {
      type: "dateTime",
      name: "dealEndDate",
      size: 3,
      label: "Deal End Date & Time",
      placeholder: "Deal End Date & Time",
      required: true,
      options: {
        singleDatePicker: true,
        hideRanges: true,
      },
      rules: {
        required: {
          value: true,
          message: "Start Date & time is required",
        },
      },
    },
    {
      type: "select",
      name: "status",
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

      required: true,
    },
  ];

  const pageProps = {
    title: "Deals",
    layout: "tabular",
    tableHeaders: tableHeaders,
    tableData: data,
    searchByField: undefined,
    searchByLabel: undefined,
    formData: formData,
    sortable: true,

    paginated: true,

    enableImport: false,
    importHeaders: [],

    importData: [],

    tableRowActions: [],
    pageHeaderActions: [],

    defaultFormValues: { salonId, role: role },
    deleteVariableTitle: undefined,
    onAdd: createDeal,
    onEdit: updateDeal,
    onDelete: deleteDeal,
    onImport: () => { },

    getData: (e) => getAllDealss({ salonId }),
    getImportData: () => { },
    afterAddSuccess: () => { },
    afterEditSuccess: () => { },
    afterDeleteSuccess: () => { },
    afterImportSuccess: () => { },
  };

  return (
    <div>
      <PageCreator {...pageProps} />
    </div>
  );
};

export default Customers;
