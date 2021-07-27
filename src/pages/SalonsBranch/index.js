import React from "react";
import PageCreator from "../../components/PageCreator";

import {
  emailRegex,
  mobileRegex,
  yupEmail,
  yupMobile,
} from "../../helpers/regex";

import {
  createBranch,
  updateBranch,
  deleteBranch,
  getAllBranches,
} from "../../redux/action/branchActions";

import { getAllSalons } from "../../redux/action/salonActions";
import { useDispatch, useSelector } from "react-redux";

const Salons = () => {
  const dispatch = useDispatch();

  const { salons, branches } = useSelector((state) => state.all);

  const { role, salonId, branchId } = useSelector((state) => state.user);

  const [selectedSalon, setSelectedSalon] = React.useState(salonId || "all");

  const isSuperAdmin = role === "superadmin";
  const formData = [
    {
      type: isSuperAdmin ? "select" : "none",
      name: "salonId",
      label: "Salon",
      options: salons,
      optionLabelProp: "name",
      optionValueProp: "_id",
      hideAt: "Edit",
      required: true,
    },

    {
      type: "text",
      name: "branchName",
      label: "Branch Name",
      placeholder: "Type Branch Name",
      required: true,
    },
    {
      hideAt: "edit",
      type: "text",
      name: "branchCode",
      label: "Branch Code",
      placeholder: "Type Branch Code",
      disabled: true,
    },
    {
      type: "text",
      name: "contactPerson",
      label: "Contact Person",
      placeholder: "Type Contact Person Name",
    },
    {
      type: "text",
      name: "contactNumber",
      label: "Contact Number",
      placeholder: "Type Contact Person Number",
      required: true,

      rules: {
        required: {
          value: true,
          message: "Contact Number is required",
        },
        pattern: {
          value: mobileRegex,
          message: "Invalid mobile number",
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

  React.useEffect(() => {
    dispatch(getAllSalons("true"));
  }, []);

  const tableHeaders = [
    { title: "Branch Name", key: "branchName" },
    { title: "Salon Name", key: "salonName" },
    { title: "Branch Code", key: "branchCode" },

    { title: "Total Users", key: "userCount" },

    { title: "Status", key: "status" },
  ];

  const defaults = {
    ...(!isSuperAdmin && { salonId: selectedSalon }),
  };

  const SalonFilter = (action) => (
    <div class="">
      <select
        name="status"
        class="form-control"
        defaultValue="true"
        required
        value={selectedSalon}
        onChange={(e) => {
          setSelectedSalon(e.target.value);
        }}
      >
        <option value={"all"}>All Salons</option>
        {salons.map((res, resindex) => {
          return (
            <option key={resindex} value={res._id}>
              {res.name}
            </option>
          );
        })}
      </select>
    </div>
  );
  const headActions = isSuperAdmin ? [SalonFilter] : [];

  const pageProps = {
    title: "Branches",
    layout: "tabular",
    formData: formData,
    tableHeaders: tableHeaders,
    tableData: branches,
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
    pageHeaderActions: headActions,

    defaultFormValues: defaults || {},
    deleteVariableTitle: undefined,
    onAdd: createBranch,
    onEdit: updateBranch,
    onDelete: deleteBranch,
    onImport: () => {},

    getData: () => getAllBranches(selectedSalon || salonId),
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

export default Salons;
