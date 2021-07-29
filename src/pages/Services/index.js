import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageCreator from "../../components/PageCreator";
import { BASEIMAGEURL } from "../../contants";
import { getAllSalonCategories } from "../../redux/action/categoryAction";
import {
  getSalonServices,
  createService,
  updateService,
  deleteService,
} from "../../redux/action/serviceActions";

const Services = () => {
  const dispatch = useDispatch();
  const salonServices = useSelector((state) => state.all.salonServices);
  const salonCategories = useSelector((state) => state.all.salonCategories);

  const { role, salonId, branchId } = useSelector((state) => state.user);
  const tableHeaders = [
    { title: "Service Name", key: "name" },
    {
      title: "Service Image",
      key: "imageSrc",
      type: "image",
      sourceUrl: BASEIMAGEURL,
    },
    { title: "Sale Price", key: "salePrice" },
    { title: "Price", key: "price" },
    { title: "Category", key: "categoryName" },
    { title: "Status", key: "status" },
  ];
  const formData = [
    {
      type: "text",
      name: "name",
      label: "Service Name",
      size: 12,

      placeholder: "Type Service Name",
      required: true,
    },
    {
      type: "file",
      name: "imageSrc",
      label: "Service image",
      size: 4,
      // required: true,
    },
    {
      type: "float",
      name: "salePrice",
      size: 4,

      label: "Sale Price",
      placeholder: "Type Sale Price",
      required: true,
    },
    {
      type: "float",
      name: "price",
      size: 4,

      label: "Price",
      placeholder: "Type Price",
      required: true,
    },
    {
      type: "duration",
      name: "estimatedTime",
      size: 4,
      label: "Estimate Time",
      placeholder: "Choose Estimate Time",
      // required: true,
      // rules: {
      //   required: {
      //     value: true,
      //     message: "Estimated time is required",
      //   },
      // },
    },
    {
      type: "select",
      name: "categoryId",
      size: 4,

      label: "Category",
      options: salonCategories,
      optionLabelProp: "categoryName",
      optionValueProp: "id",
      defaultOption: () => (
        <option value={""} selected>
          Common
        </option>
      ),
    },

    {
      type: "select",
      name: "status",
      size: 4,

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
    {
      type: "textarea",
      name: "description",
      size: 12,
      label: "Description",
      maxLength: 500,
      placeholder: "Enter description",
      rows: 3,
    },
  ];
  const pageProps = {
    title: "Services",
    layout: "tabular",
    formData: formData,
    tableHeaders: tableHeaders,
    tableData: salonServices,
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

    defaultFormValues: { salonId, role: role },
    deleteVariableTitle: undefined,
    onAdd: createService,
    onEdit: updateService,
    onDelete: deleteService,
    onImport: () => {},

    getData: (e) => getSalonServices(salonId),
    getImportData: () => {},
    afterAddSuccess: () => {},
    afterEditSuccess: () => {},
    afterDeleteSuccess: () => {},
    afterImportSuccess: () => {},
  };
  React.useEffect(() => {
    dispatch(getAllSalonCategories({ salonId }));
  }, []);
  return (
    <div>
      <PageCreator {...pageProps} />
    </div>
  );
};

export default Services;
