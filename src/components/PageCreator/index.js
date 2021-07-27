import React from "react";
import * as layouts from "./layouts";

import CommonActionModal from "../common/Modals/CommonActionModal";

import CommonImportModal from "../common/Modals/CommonImportModal";

import DeleteModal from "../common/Modals/DeleteModal";

import AddCommonAction from "../common/Actions/AddCommonAction";
import EditCommonAction from "../common/Actions/EditAction";
import DeleteCommonAction from "../common/Actions/DeleteCommonAction";
import ViewCommonAction from "../common/Actions/ViewCommonAction";
import ImportCommonAction from "../common/Actions/ImportCommonAction";

import { useDispatch } from "react-redux";

const initState = {
  openCommonModal: undefined,
  actionData: {},
};
const PageCreator = ({
  title,
  layout = "tabular",
  formData,
  tableHeaders,
  tableData,
  searchByField,
  searchByLabel,
  initialTableRows = 5,

  sortable = false,

  paginated = true,

  enableImport = false,
  importHeaders = [],

  importData,

  hideEdit,
  hideDelete,
  hideAdd,
  hideView,
  tableRowActions = [],
  pageHeaderActions = [],

  defaultFormValues,
  deleteVariableTitle,
  onAdd,
  onEdit,
  onDelete,
  onImport,

  getData,
  getImportData,
  afterAddSuccess,
  afterEditSuccess,
  afterDeleteSuccess,
  afterImportSuccess,
}) => {
  const showTitle = layout !== "tabular";

  const dispatch = useDispatch();

  const Layout = layouts[layout];

  const [state, setState] = React.useState(initState);

  const [importOpen, setImportOpen] = React.useState();

  const getInitData = () => {
    dispatch(getData());
  };

  const handleRowActionClick = (mode, data) => {
    setState({
      ...state,
      openCommonModal: mode,
      actionData: data,
    });
  };

  const ImportAction = () => {
    return (
      <ImportCommonAction
        onClick={() => {
          enableImport && getImportData();

          setImportOpen(true);
        }}
        title={title}
      />
    );
  };

  const AddAction = () => {
    return (
      <AddCommonAction
        onClick={() => handleRowActionClick("add")}
        title={title}
      />
    );
  };

  const EditAction = (action) => (
    <EditCommonAction
      onClick={() => handleRowActionClick("edit", action.data)}
    />
  );

  const DeleteAction = (action) => (
    <DeleteCommonAction
      onClick={() => handleRowActionClick("delete", action.data)}
    />
  );

  const ViewAction = (action) => (
    <ViewCommonAction
      onClick={() => handleRowActionClick("view", action.data)}
    />
  );

  const closeModal = () => {
    setState(initState);
  };

  const onModalSubmit = (values) => {
    const mode = state.openCommonModal;
    if (mode === "add") {
      dispatch(
        onAdd({ ...defaultFormValues, ...state.actionData, ...values }, () => {
          closeModal();
          afterAddSuccess && afterAddSuccess();
          getInitData();
        })
      );
    }

    if (mode === "edit") {
      dispatch(
        onEdit({ ...defaultFormValues, ...state.actionData, ...values }, () => {
          closeModal();
          getInitData();

          afterEditSuccess && afterEditSuccess();
        })
      );
    }

    if (mode === "import") {
      dispatch(
        onImport(values, () => {
          closeModal();
          afterImportSuccess && afterImportSuccess();
          getInitData();
        })
      );
    }
  };

  const onDeleteSubmit = () => {
    dispatch(
      onDelete({ ...defaultFormValues, ...state.actionData }, () => {
        closeModal();
        afterDeleteSuccess && afterDeleteSuccess();
        getInitData();
      })
    );
  };

  const rowActions = [
    ...tableRowActions,
    ...(!hideEdit ? [EditAction] : []),
    ...(!hideView ? [ViewAction] : []),

    ...(!hideDelete ? [DeleteAction] : []),
  ];

  const tableHeaderComponents = [
    ...(enableImport ? [ImportAction] : []),
    ...pageHeaderActions,
  ];

  React.useEffect(() => {
    dispatch(getData());
    enableImport && getImportData();
  }, []);
  return (
    <div>
      {enableImport && (
        <CommonImportModal
          headers={importHeaders}
          open={importOpen}
          title={title}
          data={importData}
          onClose={() => {
            setImportOpen(false);
          }}
          onSubmit={(data) => {
            onImport(data);
          }}
        />
      )}
      {formData && (
        <CommonActionModal
          formData={formData}
          title={title}
          open={["add", "edit"].includes(state.openCommonModal)}
          onClose={() => closeModal()}
          mode={state.openCommonModal}
          onSubmit={(e) => onModalSubmit(e)}
          data={state.actionData}
          // data={defaultFormValues}
          defaultValues={defaultFormValues}
        />
      )}

      <DeleteModal
        size="md"
        open={["delete"].includes(state.openCommonModal)}
        title={deleteVariableTitle && state?.actionData[deleteVariableTitle]}
        onClose={() => closeModal()}
        onConfirm={() => onDeleteSubmit()}
      />
      <Layout
        title={title}
        headerComponents={tableHeaderComponents}
        headAction={!hideAdd && AddAction}
        actions={rowActions}
        tableData={tableData}
        headers={tableHeaders}
        sortable={sortable}
        paginated={paginated}
        searchByLabel={searchByLabel}
        searchByField={searchByField}
        rowsPerPage={initialTableRows}
      />
    </div>
  );
};

export default PageCreator;
