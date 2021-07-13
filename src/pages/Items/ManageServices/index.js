import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../../redux/action/snackActions";
import SmartTable from "../../../components/common/SmartTable";

import DeleteModal from "../../../components/common/Modals/DeleteModal";
import EditCommonAction from "../../../components/common/Actions/EditAction";
import AddCommonAction from "../../../components/common/Actions/AddCommonAction";
import DeleteCommonAction from "../../../components/common/Actions/DeleteCommonAction";
import CommonAddModal from "../../../components/common/Modals/CommonAddModal";
import {
  getBranchCategories,
  getSalonCategories,
} from "../../../redux/action/categoryActions";
import {
  createService,
  deleteService,
  getSalonServices,
  getBranchServices,
  importServices,
  updateService,
} from "../../../redux/action/serviceActions";
import { RootUrl } from "../../../redux/types";
import { getAllBranches } from "../../../redux/action/branchActions";
import getErrorMessage from "../../../helpers/getErrorMessage";
import CommonImportModal from "../../../components/common/Modals/CommonImportModal";
import ImportCommonAction from "../../../components/common/Actions/ImportCommonAction";

const PageTitle = "Services";

const ManageServices = () => {
  const {
    categories: arraycategories,
    salonCategories,
    items,
    salonItems,
  } = useSelector((state) => state.branch);
  const { role, salonId, branchId } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState();

  const branches = useSelector((state) => state.branch.allBranches);
  const [selectedBranch, setSelectedBranch] = React.useState(branchId);

  const currBranchId = branchId || selectedBranch;
  const isSalonAdmin = ["salonadmin"].includes(role);
  const isBranchAdmin = ["branchadmin"].includes(role);
  const isSuperAdmin = ["superadmin"].includes(role);
  const categories = isSalonAdmin ? salonCategories : arraycategories;
  const [importOpen, setImportOpen] = React.useState();

  const getAllCategories = () => {
    if (isSalonAdmin) {
      dispatch(getSalonCategories(salonId, "true"));
    }
    if (isBranchAdmin) {
      dispatch(getBranchCategories(salonId, branchId, "true"));
    }
  };

  const getAllData = () => {
    if (isSalonAdmin) {
      dispatch(getSalonServices());
    }
    if (isBranchAdmin) {
      dispatch(getBranchServices(branchId));
    }
  };

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
      type: "number",
      name: "salePrice",
      size: 4,

      label: "Selling Price",
      placeholder: "Type Selling Price",
      required: true,
    },
    {
      type: "number",
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
      options: categories,
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
      // required: true,
      // rules: {
      //   required: {
      //     value: true,
      //     message: "Estimated time is required",
      //   },
      // },
    },
  ];

  const dispatch = useDispatch();

  const [actionData, setActionData] = React.useState();

  const toggleAdd = (mode) => {
    setOpen(mode);
    if (mode === undefined) {
      setActionData({});
    }
  };

  const handleEdit = (data) => {
    toggleAdd("Edit");
    // delete data.imageSrc;

    setActionData(data);
  };

  const handleDelete = (data) => {
    toggleAdd("Delete");
    setActionData(data);
  };

  const confirmDelete = (data) => {
    dispatch(deleteService({ role, id: actionData.id || actionData._id })).then(
      (res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Service Deleted succesfully"));
          getAllData();
        }
      }
    );
  };

  const onAdd = (data) => {
    if (open === "Add") {
      if (data.categoryId === "") {
        delete data.categoryId;
      }
      console.log("service dat", data);
      dispatch(
        createService({
          ...data,
          salonId: salonId,
          ...(isBranchAdmin && { branchId: branchId }),
          role: role,
          ...(data?.imageSrc[0] &&
            typeof data?.imageSrc[0] !== "string" && {
              imageSrc: data?.imageSrc[0],
            }),
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            toggleAdd();
            dispatch(showSnackBar("Service Added successfully"));
            getAllData();
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to Add Service",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to Add Service",
              "error"
            )
          );
        });
    }
    if (open === "Edit") {
      if (data.categoryId === "") {
        delete data.categoryId;
      }
      if (data.imageSrc.length < 1) {
        delete data.imageSrc;
      } else {
        data.imageSrc = data.imageSrc[0];
      }
      dispatch(
        updateService({
          ...actionData,
          ...data,
          role: role,
        })
      )
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(showSnackBar("Service Updated Successfully", "success"));
            getAllData();

            toggleAdd();
          } else {
            dispatch(
              showSnackBar(
                getErrorMessage(res) || "Failed to Update Service",
                "error"
              )
            );
          }
        })
        .catch((err) => {
          console.log("err", err);
          dispatch(
            showSnackBar(
              getErrorMessage(err) || "Failed to Update Service",
              "error"
            )
          );
        });
    }
  };

  const onImport = (data) => {
    dispatch(
      importServices({
        salonId: salonId,
        data: data.map((item) => {
          delete item.id;
          delete item._id;
          return {
            ...item,
            salonId: salonId,
            branchId: currBranchId,
          };
        }),
      })
    )
      .then((res) => {
        if (res.payload.status === 200) {
          toggleAdd();
          dispatch(showSnackBar("Services Imported successfully"));
          getAllCategories(salonId, branchId, "true");
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

  const ImportAction = () => {
    return (
      <ImportCommonAction
        onClick={() => {
          dispatch(getSalonServices("true"));

          setImportOpen(true);
        }}
        title={PageTitle}
      />
    );
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
    { title: "Service Name", key: "name" },
    {
      title: "Service Image",
      key: "imageSrc",
      type: "image",
      sourceUrl: RootUrl,
    },
    { title: "Price", key: "price" },
    { title: "Category", key: "categoryName" },
    { title: "Status", key: "status" },
  ];

  const defaultValues = {
    // salonId: salonId,
  };

  React.useEffect(() => {
    getAllCategories();
    getAllData();
  }, [selectedBranch]);

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
        <option value={""} selected>
          This Salon
        </option>
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
    salonadmin: [BranchFilter],
    branchadmin: [ImportAction],
  };
  return (
    <>
      <div class="page-content-tab">
        {!isSuperAdmin && (
          <CommonImportModal
            headers={headers}
            open={importOpen}
            title={PageTitle}
            data={salonItems}
            onClose={() => {
              setImportOpen(false);
            }}
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
          headerComponents={headerComponents[role]}
          title={PageTitle}
          headAction={AddAction}
          actions={[EditAction, DeleteAction]}
          tableData={isSalonAdmin ? salonItems : items}
          headers={headers}
          sortable={true}
          paginated={true}
          searchByLabel={"Service name"}
          searchByField={"itemName"}
          rowsPerPage={5}
        />
      </div>
    </>
  );
};

export default ManageServices;
