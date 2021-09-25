import React from "react";
import AddModal from "../../components/common/Modals/CommonActionModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllEmployees,
  updateUser,
} from "../../redux/action/employeeActions";
import { showSnackBar } from "../../redux/action/snackActions";
import SmartTable from "../../components/common/SmartTable";
import { getAllSalons } from "../../redux/action/salonActions";
import { getAllBranches } from "../../redux/action/branchActions";
import { useHistory } from "react-router-dom";
import DeleteModal from "../../components/common/Modals/DeleteModal";
import AddCommonAction from "../../components/common/Actions/AddCommonAction";
import ViewCommonAction from "../../components/common/Actions/ListCommonAction";
import EditCommonAction from "../../components/common/Actions/EditAction";
import DeleteCommonAction from "../../components/common/Actions/DeleteCommonAction";
import { mobileRegex, yupArray, yupMobile } from "../../helpers/regex";
import CommonTableModal from "../../components/common/Modals/CommonTableModal";
import {
  createUserGrpups,
  deleteUserGrpups,
  getAllUserGrpups,
  updateUserGrpups,
} from "../../redux/action/userGroupActions";
import { getSalonServices } from "../../redux/action/serviceActions";
import EmployeeScheduleModal from "../../components/common/Modals/EmployeeScheduleModal";
import ScheduleCommonAction from "../../components/common/Actions/ScheduleCommonAction";

const PageTitle = "Employees";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = React.useState();
  const [TableOpen, setTableOpen] = React.useState(false);
  const [actionData, setActionData] = React.useState();
  const { role, salonId, branchId } = useSelector((state) => state.user);
  const isSalonAdmin = ["salonadmin"].includes(role);
  const isBranchAdmin = ["branchadmin"].includes(role);
  const [selectedRes, setSelectedRes] = React.useState(salonId || "all");
  const { salonServices } = useSelector((state) => state.all);
  const CurrentSalon = salonId || selectedRes;

  const [selectedBranch, setSelectedBranch] = React.useState(branchId || "all");

  const {
    salons,
    branches,
    employees,
    allUserGroup: salonUserGroup,
  } = useSelector((state) => state.all);
  const [actionType, setActionType] = React.useState("");
  const formData = [
    {
      type: "text",
      name: "userName",
      label: "Employee Name",
      placeholder: "Type Employee Name",
      required: true,
    },
    {
      type: "text",
      name: "userMobile",
      label: "Employee Mobile Number",
      placeholder: "Type Mobile Number",
      required: true,
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
      name: "groupId",
      label: "Employee Group",
      options: salonUserGroup,
      optionLabelProp: "groupName",
      optionValueProp: "_id",
      defaultOption: () => (
        <option value={undefined} selected>
          Select group
        </option>
      ),
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

  const groupFormData = [
    {
      type: "text",
      name: "groupName",
      label: "Group Name",
      placeholder: "Type Group Name",
      required: true,
      size: 6,
    },
    {
      type: "multiselect",
      name: "services",
      label: "Services",
      placeholder: "Choose Services",
      options: salonServices,
      size: 6,
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
    console.log("actionType", actionType);
    if (actionType === "employee") {
      dispatch(
        deleteUser(actionData, () => {
          toggleAdd();
          dispatch(getAllEmployees(selectedRes, selectedBranch));
        })
      );
    } else {
      dispatch(
        deleteUserGrpups(actionData, () => {
          groupModalClose();
        })
      );
    }
  };

  const groupModalClose = () => {
    console.log("yes");
    toggleAdd();
    dispatch(getAllUserGrpups(salonId, undefined));
    actionType === "group" && setTableOpen(true);
  };

  const onAdd = (data) => {
    if (open === "Edit") {
      dispatch(
        updateUser(
          {
            ...actionData,
            ...data,
          },
          () => {
            dispatch(getAllEmployees(selectedRes, selectedBranch));
            toggleAdd();
          }
        )
      );
    }
  };

  const onAddUserGroup = (data) => {
    if (open === "Add") {
      dispatch(
        createUserGrpups(
          {
            ...data,
            salonId: salonId,
          },
          () => {
            groupModalClose();
          }
        )
      );
    }
    if (open === "Edit") {
      dispatch(
        updateUserGrpups(
          {
            ...actionData,
            ...data,
          },
          () => {
            groupModalClose();
          }
        )
      );
    }
  };

  const handeOpenScheduleModal = (data) => {
    toggleAdd("schedule");
    setActionData(data);
  };

  const handleSchedule = (data) => {
    // console.log("handleSchedule", data);
    dispatch(
      updateUser(
        {
          ...actionData,
          ...data,
        },
        () => {
          dispatch(getAllEmployees(selectedRes, selectedBranch));
          toggleAdd();
        }
      )
    );
  };
  const AddAction = () => {
    return (
      <AddCommonAction
        onClick={() => history.push("/adduser")}
        title={PageTitle}
      />
    );
  };

  const EmployeeGroupAction = () => {
    return (
      <ViewCommonAction
        onClick={() => {
          dispatch(getAllUserGrpups(salonId, undefined));
          setTableOpen(true);
          setActionType("group");
        }}
        title={`${PageTitle} Group`}
      />
    );
  };

  const headerGroupComponents = () => {
    return [AddEmployeeGroupAction];
  };

  const AddEmployeeGroupAction = () => {
    return (
      <AddCommonAction
        onClick={() => {
          toggleAdd("Add");
          if (isSalonAdmin) {
            dispatch(getSalonServices({ salonId }));
          }
          setTableOpen(false);
        }}
        title={`${PageTitle} Group`}
      />
    );
  };

  const EditAction = (action) => {
    return (
      <EditCommonAction
        onClick={() => {
          setActionType("employee");
          handleEdit(action.data.branchUser);
        }}
      />
    );
  };

  const DeleteAction = (action) => (
    <DeleteCommonAction
      onClick={() => {
        setActionType("employee");

        handleDelete(action.data.branchUser);
      }}
    />
  );

  const EditGroupAction = (action) => (
    <EditCommonAction
      onClick={() => {
        setActionType("group");
        setTableOpen(false);
        handleEdit(action.data);
      }}
    />
  );

  const DeleteGroupAction = (action) => (
    <DeleteCommonAction
      onClick={() => {
        handleDelete(action.data);
      }}
    />
  );

  const ScheduleAction = (action) => (
    <ScheduleCommonAction
      onClick={() => {
        handeOpenScheduleModal(action.data);
      }}
    />
  );

  const headers = [
    { title: "Employee Name", key: "userName" },

    { title: "Employee Mobile", key: "userMobile" },
    { title: "Employee Group", key: "groupName" },

    { title: "Role", key: "userRole" },
    { title: "Associated With", key: "associatedWith" },
    { title: "Status", key: "status" },
  ];

  const groupHeaders = [
    { title: "Group Name", key: "groupName" },
    { title: "Services", key: "servicesWithComma" },
  ];

  React.useEffect(() => {
    dispatch(getAllEmployees(selectedRes, selectedBranch));
    dispatch(getAllUserGrpups(salonId, undefined));
  }, [selectedRes, selectedBranch]);

  const SalonFilter = (action) => (
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
      <option value={"all"}>All Salons</option>
      {salons.map((res, resindex) => {
        return (
          <option key={resindex} value={res._id}>
            {res.name}
          </option>
        );
      })}
    </select>
  );

  const BranchFilter = (action) => (
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
  );

  const headerComponents = {
    superadmin: [
      SalonFilter,
      ...(selectedRes != "all"
        ? [BranchFilter, EmployeeGroupAction]
        : [EmployeeGroupAction]),
    ],
    salonadmin: [BranchFilter, EmployeeGroupAction],
  };

  const tableActions = {
    superadmin: [EditAction, DeleteAction],
    salonadmin: [EditAction, DeleteAction, ScheduleAction],
  };

  React.useEffect(() => {
    dispatch(getAllSalons("true"));
  }, []);

  React.useEffect(() => {
    dispatch(getAllBranches(selectedRes, "true"));
  }, [selectedRes]);

  return (
    <div class="page-content-tab">
      <EmployeeScheduleModal
        open={open === "schedule"}
        onClose={() => toggleAdd()}
        mode={open}
        data={actionData}
        onSubmit={(e) => handleSchedule(e)}
      />
      <CommonTableModal
        headers={groupHeaders}
        headerComponents={headerGroupComponents()}
        open={TableOpen}
        title={`${PageTitle} Group`}
        data={salonUserGroup}
        onClose={() => setTableOpen(false)}
        actions={[EditGroupAction, DeleteGroupAction]}
      />
      <DeleteModal
        size="md"
        open={open === "Delete"}
        title={actionData?.name}
        onClose={() => toggleAdd()}
        onConfirm={() => confirmDelete()}
      />

      <AddModal
        open={open === "Add" || open === "Edit"}
        onClose={() => groupModalClose()}
        mode={open}
        onSubmit={(e) =>
          actionType !== "employee" ? onAddUserGroup(e) : onAdd(e)
        }
        data={actionData}
        formData={actionType === "employee" ? formData : groupFormData}
        title={`${PageTitle} Group`}
      />

      <SmartTable
        title={PageTitle}
        headerComponents={headerComponents[role]}
        headAction={AddAction}
        actions={tableActions[role]}
        tableData={employees}
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
