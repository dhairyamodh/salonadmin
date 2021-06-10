import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../redux/action/snackActions";
import SmartTable from "../../components/common/SmartTable";

import DeleteModal from "../../components/common/Modals/DeleteModal";
import AddCommonAction from "../../components/common/Actions/AddCommonAction";
import EditCommonAction from "../../components/common/Actions/EditAction";
import DeleteCommonAction from "../../components/common/Actions/DeleteCommonAction";
import CommonAddModal from "../../components/common/Modals/CommonAddModal";
import {
  createExpense,
  deleteExpense,
  getAllexpenseTypes,
  updateExpense,
  importExpenseTypes,
  getAllExpenses,
  getRestaurantExpenseType,
} from "../../redux/action/expenseActions";
import { RootUrl } from "../../redux/types";
import { getAllBranches } from "../../redux/action/branchActions";
import getErrorMessage from "../../helpers/getErrorMessage";
import CommonImportModal from "../../components/common/Modals/CommonImportModal";
import ImportCommonAction from "../../components/common/Actions/ImportCommonAction";

const ManageExpense = () => {
  const { expenses: arraycat, restaurantExpenseTypes } = useSelector(
    (state) => state.branch
  );
  const { role, restaurantId, branchId } = useSelector((state) => state.user);

  const branches = useSelector((state) => state.branch.allBranches);

  const superadminExpenseTypes = useSelector(
    (state) => state.common.expenseTypes
  );

  const isSalonAdmin = ["salonadmin"].includes(role);
  const isBranchAdmin = ["branchadmin"].includes(role);

  const isBranchUser = ["branchuser"].includes(role);

  const isSuperAdmin = ["superadmin"].includes(role);
  const PageTitle = isSalonAdmin ? "Expense Types" : "Expenses";

  const [open, setOpen] = React.useState();

  const [importOpen, setImportOpen] = React.useState();

  const [selectedBranch, setSelectedBranch] = React.useState(branchId);

  const currRestaurantId = restaurantId || undefined;

  const currBranchId = branchId || selectedBranch;
  const expenses = isBranchAdmin
    ? arraycat
    : isSalonAdmin
      ? restaurantExpenseTypes
      : arraycat;

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
      type: isSalonAdmin ? "text" : "none",
      name: "expenseType",
      label: "Expense Type",
      placeholder: "Type Expense Type",

      rules: {
        required: {
          value: true,
          message: "Expense Type is required",
        },
      },
    },

    {
      type: !isSalonAdmin ? "select" : "none",
      name: "expenseTypeId",
      label: "Expense Type",
      options: restaurantExpenseTypes,
      optionLabelProp: "expenseType",
      optionValueProp: "id",

      // required: true,
      // rules: {
      //   required: {
      //     value: true,
      //     message: "Branch Name is required",
      //   },
      // },
    },
    {
      type: !isSalonAdmin ? "text" : "none",
      name: "expenseTitle",
      label: "Expense Title",
      placeholder: "Type Expense Title",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Expense Title is required",
        },
      },
    },
    {
      type: !isSalonAdmin ? "number" : "none",

      name: "quantity",
      label: "Expense Quantity",
      placeholder: "Type Expense Quantity",
    },
    {
      type: !isSalonAdmin ? "select" : "none",
      name: "quantityType",
      size: 4,

      label: "Quantity Type",
      options: [
        {
          title: "Kg, ",
          value: "kg",
        },
        {
          title: "Gram",
          value: "Gram",
        },
        {
          title: " Nos.",
          value: " Nos.",
        },
        {
          title: "Litres",
          value: "Litres",
        },
      ],
      optionLabelProp: "title",
      optionValueProp: "value",
    },

    {
      type: !isSalonAdmin ? "number" : "none",
      name: "expensePrice",
      label: "Expense Price",

      required: true,
      rules: {
        required: {
          value: true,
          message: "Branch Name is required",
        },
      },
    },
  ];

  const dispatch = useDispatch();
  // const Cateogrys = useSelector((state) => state.common.Cateogrys);

  const [actionData, setActionData] = React.useState();

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
    dispatch(deleteExpense({ ...actionData, role: role }))
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Deleted succesfully"));
          getAllData();
        } else {
          dispatch(
            showSnackBar(
              getErrorMessage(res) || "Failed to Delete Cateogry",
              "error"
            )
          );
        }
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(
          showSnackBar(
            getErrorMessage(err) || "Failed to Delete Cateogry",
            "error"
          )
        );
      });
  };

  const getAllData = (selectedBranch) => {
    if (isSalonAdmin) {
      dispatch(getRestaurantExpenseType(restaurantId));
    }
    if (isBranchAdmin || isBranchUser) {
      dispatch(getRestaurantExpenseType(restaurantId));
      dispatch(getAllExpenses(restaurantId, branchId));
    }
    if (isSuperAdmin) {
      dispatch(getAllexpenseTypes());
    }
  };

  console.log("restaurantExpenseTypes", restaurantExpenseTypes);

  const importData = () => {
    if (isSalonAdmin) {
      return superadminExpenseTypes.filter((item) => {
        return (
          restaurantExpenseTypes.findIndex((data) => {
            return data.expenseType === item.expenseType;
          }) < 0
        );
      });
    } else {
      return restaurantExpenseTypes;
    }
  };
  const onAdd = (data) => {
    if (open === "Add") {
      dispatch(
        createExpense({
          ...data,
          role: role,
          // branchId: branchId || data.branchId,

          ...(currRestaurantId && { restaurantId: restaurantId }),
          ...(currBranchId && { branchId: currBranchId }),
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            toggleAdd();
            dispatch(showSnackBar("Expense created successfully"));
            getAllData();
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to Add Cateogry",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to Add Cateogry",
              "error"
            )
          );
        });
    }
    if (open === "Edit") {
      dispatch(
        updateExpense({
          ...actionData,
          ...data,
          role: role,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(showSnackBar("Cateogry Updated Successfully", "success"));
            getAllData();

            toggleAdd();
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to Update Cateogry",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to Update Cateogry",
              "error"
            )
          );
        });
    }
  };

  const onImport = (data) => {
    dispatch(
      importExpenseTypes({
        restaurantId: restaurantId,
        ...(currBranchId && { branchId: branchId }),
        data: data.map((item) => {
          return {
            ...item,
            restaurantId: restaurantId,
            ...(currBranchId && { branchId: branchId }),
          };
        }),
      })
    )
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Expense Imported successfully"));
          getAllData();

          setImportOpen(false);
        } else {
          dispatch(
            showSnackBar(
              getErrorMessage(res) || "Failed to Import Cateogry",
              "error"
            )
          );
        }
      })
      .catch((err) => {
        dispatch(
          showSnackBar(
            getErrorMessage(err) || "Failed to Import Cateogry",
            "error"
          )
        );
      });
  };
  const AddAction = () => {
    return (
      <AddCommonAction onClick={() => toggleAdd("Add")} title={PageTitle} />
    );
  };

  const ImportAction = () => {
    return (
      <ImportCommonAction
        onClick={() => {
          if (isSalonAdmin) {
            dispatch(getAllexpenseTypes(undefined, undefined, "true"));
          }
          if (isBranchAdmin) {
            dispatch(getRestaurantExpenseType(restaurantId, undefined, "true"));
          }
          setImportOpen(true);
        }}
        title={PageTitle}
      />
    );
  };

  const EditAction = (action) => (
    <EditCommonAction onClick={() => handleEdit(action.data)} />
  );

  const DeleteAction = (action) => (
    <DeleteCommonAction onClick={() => handleDelete(action.data)} />
  );

  const restauranttableheaders = [
    { title: "Expense Type", key: "expenseType" },

    // {
    //   title: "Status",
    //   key: "status",
    // },
  ];

  const branchtableheaders = [
    { title: "Expense Title", key: "expenseTitle" },
    { title: "Expense Type", key: "expenseType" },
    { title: "Quantity", key: "quantity" },

    { title: "Expense Price", key: "expensePrice" },
  ];
  const headers = isSalonAdmin
    ? restauranttableheaders
    : branchtableheaders;

  const defaultValues = {
    restaurantId: restaurantId,
  };

  const BranchFilter = (action) => (
    <div class="">
      <select
        name="status"
        class="form-control"
        defaultValue="true"
        required
        value={selectedBranch}
        onChange={(e) => {
          if (e.target.value === "all") {
            return setSelectedBranch(undefined);
          } else {
            setSelectedBranch(e.target.value);
          }
        }}
      >
        <option value={""} selected>
          This Restaurant
        </option>
        {branches.map((res, resindex) => {
          return (
            <option key={resindex} value={res._id || res.id}>
              {res.branchName}
            </option>
          );
        })}
      </select>
    </div>
  );

  const headerComponents = {
    salonadmin: [
      // ...[BranchFilter],
      ...(!currBranchId ? [ImportAction] : []),
    ],
  };
  React.useEffect(() => {
    getAllData();
    // isSalonAdmin && dispatch(getAllexpenseTypes());
    // isBranchAdmin && dispatch(getRestaurantExpenseType(restaurantId));
  }, []);

  return (
    <>
      <div class="page-content-tab">
        {!isSuperAdmin && (
          <CommonImportModal
            headers={headers}
            open={importOpen}
            title={PageTitle}
            data={importData()}
            onClose={() => setImportOpen(false)}
            onSubmit={(data) => {
              onImport(data);
            }}
          />
        )}
        <CommonAddModal
          title={PageTitle}
          open={open === "Add" || open === "Edit"}
          onClose={() => toggleAdd()}
          mode={open}
          onSubmit={(e) => onAdd(e)}
          data={actionData}
          formData={formData}
          defaultValue={defaultValues}
        />

        <DeleteModal
          size="md"
          open={open === "Delete"}
          title={actionData?.name}
          onClose={() => toggleAdd()}
          onConfirm={() => confirmDelete()}
        />

        <SmartTable
          title={PageTitle}
          headerComponents={headerComponents[role]}
          headAction={AddAction}
          actions={[EditAction, DeleteAction]}
          tableData={expenses}
          headers={headers}
          sortable={true}
          paginated={true}
          searchByLabel={"Expense Title"}
          searchByField={"expenseTitle"}
          rowsPerPage={5}
        />
      </div>
    </>
  );
};

export default ManageExpense;