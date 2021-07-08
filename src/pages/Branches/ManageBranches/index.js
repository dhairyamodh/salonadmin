import React from "react";
import AddModal from "../../../components/common/Modals/CommonAddModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createBranch,
  updateBranch,
  deleteBranch,
  getAllBranches,
} from "../../../redux/action/branchActions";
import { showSnackBar } from "../../../redux/action/snackActions";
import SmartTable from "../../../components/common/SmartTable";
import DeleteModal from "../../../components/common/Modals/DeleteModal";
import AddCommonAction from "../../../components/common/Actions/AddCommonAction";
import EditCommonAction from "../../../components/common/Actions/EditAction";
import DeleteCommonAction from "../../../components/common/Actions/DeleteCommonAction";
import { getAllSalons } from "../../../redux/action/salonActions";
import { mobileRegex, yupBoolean, yupMobile } from "../../../helpers/regex";
import getErrorMessage from "../../../helpers/getErrorMessage";

const PageTitle = "Branches";

const ManageBranches = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState();
  const [actionData, setActionData] = React.useState();

  const { role, salonId, branchId } = useSelector((state) => state.user);

  const isSuperAdmin = role === "superadmin";

  const [selectedRes, setSelectedRes] = React.useState(salonId || "all");

  const salons = useSelector((state) => state.salon.allSalons);

  const branches = useSelector((state) => state.branch.allBranches);

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
      type: open === "Edit" ? "text" : "none",
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
      rules: yupMobile('Invalid contact number')
      // rules: {
      //   required: {
      //     value: true,
      //     message: "Contact Number is required",
      //   },
      //   pattern: {
      //     value: mobileRegex,
      //     message: "Invalid mobile number",
      //   },
      // },
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
      rules: yupBoolean('Status')

    },
  ];

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
    dispatch(deleteBranch(actionData))
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Deleted succesfully"));
          dispatch(getAllBranches(selectedRes));
        }
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(
          showSnackBar(
            getErrorMessage(err) || "Failed to Delete Branch",
            "error"
          )
        );
      });
  };

  const onAdd = (data) => {
    if (open === "Add") {
      dispatch(
        createBranch({
          ...data,
          ...(!isSuperAdmin && { salonId: selectedRes }),
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(getAllBranches(salonId || selectedRes));

            dispatch(showSnackBar("Branch Added Successfully", "success"));

            toggleAdd();
          } else {
            dispatch(showSnackBar("Failed to Add Branch", "error"));
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to Add Branch",
              "error"
            )
          );
        });
    }

    if (open === "Edit") {
      dispatch(
        updateBranch({
          ...actionData,
          ...data,
          ...(!isSuperAdmin && { salonId: selectedRes }),
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(showSnackBar("Branch Updated Successfully", "success"));
            dispatch(getAllBranches(salonId || selectedRes));

            toggleAdd();
          } else {
            dispatch(showSnackBar("Failed to Update Branch", "error"));
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to Update Branch",
              "error"
            )
          );
        });
    }
  };

  const AddAction = () => {
    return (
      <AddCommonAction onClick={() => toggleAdd("Add")} title={PageTitle} />
    );
  };

  const EditAction = (action) => (
    <EditCommonAction onClick={() => handleEdit(action.data)} />
  );

  const DeleteAction = (action) => (
    <DeleteCommonAction onClick={() => handleDelete(action.data)} />
  );

  const headers = [
    { title: "Branch Name", key: "branchName" },
    { title: "Salon Name", key: "salonName" },
    { title: "Branch Code", key: "branchCode" },

    { title: "Total Users", key: "userCount" },

    // { title: "Total Items", key: "itemCount" },
    { title: "Status", key: "status" },
  ];

  const RestaurantFilter = (action) => (
    <div class="">
      <select
        name="status"
        class="form-control"
        defaultValue="true"
        required
        value={selectedRes}
        onChange={(e) => {
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

  const headerComponents = {
    superadmin: [RestaurantFilter],
    salonadmin: undefined,
  };

  const defaultValues = {
    salonId: salonId,
  };
  React.useEffect(() => {
    dispatch(getAllBranches(selectedRes || salonId));
    dispatch(getAllSalons("true"));
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
        defaultValue={defaultValues}
        title={PageTitle}
      />

      <SmartTable
        title={PageTitle}
        headerComponents={headerComponents[role]}
        headAction={AddAction}
        actions={[EditAction, DeleteAction]}
        tableData={branches}
        headers={headers}
        sortable={true}
        paginated={true}
        searchByLabel={"Branch name"}
        searchByField={"branchName"}
      />
    </div>
  );
};

export default ManageBranches;
