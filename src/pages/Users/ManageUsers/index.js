import React from "react";
import AddModal from "../../../components/common/Modals/CommonAddModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../../redux/action/userActions";
import { showSnackBar } from "../../../redux/action/snackActions";
import SmartTable from "../../../components/common/SmartTable";
import { getAllSalons } from "../../../redux/action/salonActions";
import { getAllBranches } from "../../../redux/action/branchActions";
import { useHistory } from "react-router-dom";
import DeleteModal from "../../../components/common/Modals/DeleteModal";
import AddCommonAction from "../../../components/common/Actions/AddCommonAction";
import EditCommonAction from "../../../components/common/Actions/EditAction";
import DeleteCommonAction from "../../../components/common/Actions/DeleteCommonAction";
import { mobileRegex } from "../../../helpers/regex";

const PageTitle = "Employees";

const formData = [
  {
    type: "text",
    name: "userName",
    label: "Employee Name",
    placeholder: "Type Employee Name",
    required: true,
    rules: {
      required: {
        value: true,
        message: "Employee Name is required",
      },
    },
  },
  {
    type: "text",
    name: "userMobile",
    label: "Employee Mobile Number",
    placeholder: "Type Mobile Number",
    rules: {
      required: {
        value: true,
        message: "Mobile Number is required",
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
    rules: {
      required: {
        value: true,
        message: "Branch Name is required",
      },
    },
  },
];

const ManageUsers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = React.useState();
  const [actionData, setActionData] = React.useState();

  const { role, salonId, branchId } = useSelector((state) => state.user);

  const [selectedRes, setSelectedRes] = React.useState(salonId || "all");

  const CurrentRestaurant = salonId || selectedRes;

  const [selectedBranch, setSelectedBranch] = React.useState(branchId || "all");

  const salons = useSelector((state) => state.salon.allSalons);
  const branches = useSelector((state) => state.branch.allBranches);
  const allUsers = useSelector((state) => state.user.allUsers);

  const toggleAdd = (mode) => {
    setOpen(mode);
    if (mode === undefined) {
      setActionData({});
    }
  };

  const handleEdit = (data) => {
    toggleAdd("Edit");
    setActionData(data);
  };

  const handleDelete = (data) => {
    toggleAdd("Delete");
    setActionData(data);
  };

  const confirmDelete = (data) => {
    dispatch(deleteUser(actionData)).then((res) => {
      if (res.payload.status === 200) {
        toggleAdd();
        dispatch(showSnackBar("Deleted succesfully"));
        dispatch(getAllUsers(selectedRes, selectedBranch));
      }
    });
  };

  const onAdd = (data) => {
    if (open === "Edit") {
      dispatch(
        updateUser({
          ...actionData,
          ...data,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(showSnackBar("Employee Updated Successfully", "success"));
            dispatch(getAllUsers(selectedRes, selectedBranch));
            toggleAdd();
          } else {
            dispatch(showSnackBar("Failed to update Employee ", "error"));
          }
        })
        .catch((err) => {
          dispatch(showSnackBar("Failed to update user", "error"));
        });
    }
  };

  const AddAction = () => {
    return (
      <AddCommonAction
        onClick={() => history.push("/adduser")}
        title={PageTitle}
      />
    );
  };

  const EditAction = (action) => (
    <EditCommonAction onClick={() => handleEdit(action.data.branchUser)} />
  );

  const DeleteAction = (action) => (
    <DeleteCommonAction onClick={() => handleDelete(action.data.branchUser)} />
  );

  const headers = [
    { title: "Employee Name", key: "userName" },

    { title: "Employee Mobile", key: "userMobile" },

    { title: "Role", key: "userRole" },
    { title: "Associated With", key: "associatedWith" },
    { title: "Status", key: "status" },
  ];

  React.useEffect(() => {
    dispatch(getAllUsers(selectedRes, selectedBranch));
  }, [selectedRes, selectedBranch]);

  const RestaurantFilter = (action) => (
    <div class="">
      <select
        name="salonId"
        class="form-control"
        defaultValue="true"
        required
        value={selectedRes}
        onChange={(e) => {
          setSelectedBranch("all");

          setSelectedRes(e.target.value);
        }}
      >
        <option value={"all"}>All Restaurants</option>
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

  const BranchFilter = (action) => (
    <div class="">
      <select
        name="status"
        class="form-control"
        defaultValue="true"
        required
        value={selectedBranch}
        onChange={(e) => setSelectedBranch(e.target.value)}
      >
        <option value={"all"}>All Branches</option>
        {branches.map((res, resindex) => {
          return (
            <option key={resindex} value={res._id}>
              {res.branchName}
            </option>
          );
        })}
      </select>
    </div>
  );

  const headerComponents = {
    superadmin: [
      RestaurantFilter,
      ...(selectedRes != "all" ? [BranchFilter] : []),
    ],
    salonadmin: [BranchFilter],
  };

  React.useEffect(() => {
    dispatch(getAllSalons("true"));
  }, []);

  React.useEffect(() => {
    dispatch(getAllBranches(selectedRes, "true"));
  }, [selectedRes]);

  return (
    <div class="page-content-tab">
      <DeleteModal
        size="md"
        open={open === "Delete"}
        title={actionData?.name}
        onClose={() => toggleAdd()}
        onConfirm={() => confirmDelete()}
      />

      <AddModal
        open={open === "Add" || open === "Edit"}
        onClose={() => toggleAdd()}
        mode={open}
        onSubmit={(e) => onAdd(e)}
        data={actionData}
        formData={formData}
        title={PageTitle}
      />

      <SmartTable
        title={PageTitle}
        headerComponents={headerComponents[role]}
        headAction={AddAction}
        actions={[EditAction, DeleteAction]}
        tableData={allUsers}
        headers={headers}
        sortable={true}
        paginated={true}
        searchByLabel={"Employee Name"}
        searchByField={"userName"}
      />
    </div>
  );
};

export default ManageUsers;
