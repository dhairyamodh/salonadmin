import React from "react";
import { useSelector } from "react-redux";
import PageCreator from "../../components/PageCreator";
import { BASEIMAGEURL } from "../../contants";
import {
  deleteCategory,
  createCategory,
  updateCategory,
  getAllSalonCategories,
} from "../../redux/action/categoryAction";
const Categories = () => {
  const salonCategories = useSelector((state) => state.all.salonCategories);
  const { role, salonId, branchId } = useSelector((state) => state.user);

  const tableHeaders = [
    { title: "Cateogory Name", key: "categoryName" },

    {
      title: "Category image",
      key: "categoryImage",
      type: "image",
      sourceUrl: BASEIMAGEURL,
    },
    {
      title: "Status",
      key: "status",
    },
  ];
  const formData = [
    // {
    //   type: isSalonAdmin ? "select" : "none",
    //   name: "branchId",
    //   label: "Branch",
    //   options: branches,
    //   optionLabelProp: "branchName",
    //   optionValueProp: "_id",
    //   hideAt: "Edit",
    //   required: true,
    //   rules: {
    //     required: {
    //       value: true,
    //       message: "Branch Name is required",
    //     },
    //   },
    // },

    {
      type: "text",
      name: "categoryName",
      label: "Category Name",
      placeholder: "Type Category Name",
      required: true,
    },
    {
      type: "file",
      name: "categoryImage",
      label: "Category image",
      placeholder: "Type Category image",
      // required: open === "Add" && true,
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
    title: "Categories",
    layout: "tabular",
    formData: formData,
    tableHeaders: tableHeaders,
    tableData: salonCategories,
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
    onAdd: createCategory,
    onEdit: updateCategory,
    onDelete: deleteCategory,
    onImport: () => {},

    getData: (e) => getAllSalonCategories(salonId),
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

export default Categories;
