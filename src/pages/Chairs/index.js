import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageCreator from "../../components/PageCreator";

import moment from "moment";

import {
  getAllChaires,
  createChair,
  updateChair,
  deleteChair,
} from "../../redux/action/chairActions";

const Chairs = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.all.chairs);

  const { role, salonId, branchId } = useSelector((state) => state.user);

  const tableHeaders = [
    {
      title: "Chair Number",
      key: "chairNumber",
    },

    //   { title: "Chair Type", key: "tableType" },
    { title: "Extra Price", key: "chairPrice", isCurrency: true },

    { title: "Status", key: "status" },
  ];

  const formData = [
    // {
    //   type: "select",
    //   name: "chairTypeId",
    //   label: "Chair Type",
    //   options: tableTypes,
    //   optionLabelProp: "tableTypeName",
    //   optionValueProp: "id",
    // },

    {
      type: "text",
      name: "chairNumber",
      label: "Chair Number",
      placeholder: "Type Chair Number",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Chair Number is required",
        },
      },
    },

    {
      type: "float",
      name: "chairPrice",
      label: "Extra Price",
      placeholder: "Type Extra Price",
      required: true,

      rules: {
        required: {
          value: true,
          message: "Extra Priceis required",
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
      rules: {
        required: {
          value: true,
        },
      },
    },
  ];

  const pageProps = {
    title: "Chairs",
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
    onAdd: createChair,
    onEdit: updateChair,
    onDelete: deleteChair,
    onImport: () => {},

    getData: (e) => getAllChaires({ salonId }),
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

export default Chairs;
