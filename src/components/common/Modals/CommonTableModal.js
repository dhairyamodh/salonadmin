import React from "react";
import { useSelector } from "react-redux";
import ModalContainer from "../ModalContainer";
import SmartTable from "../SmartTable";

const CommonTableModal = ({
  open,
  onClose,
  title,
  onSubmit,
  data,
  headers,
  actions,
  headerComponents
}) => {
  const [selectedData, setSelectedData] = React.useState([]);
  const isLoading = useSelector((state) => state.util.spinner);

  React.useEffect(() => {
    setSelectedData(data);
  }, [data, open]);

  const submitData = () => {
    onSubmit(selectedData.filter((item) => item.selected));
  };
  return (
    <ModalContainer
      open={open}
      onClose={() => {
        onClose();
      }}
      title={title}
    >
      {headerComponents && headerComponents?.map((Comp, index) => {
        return (
          <div class="ml-4">
            <Comp />
          </div>
        );
      })}
      <SmartTable
        tableData={selectedData}
        setTableData={(data) => setSelectedData(data)}
        headers={headers}
        sortable={true}
        paginated={true}
        searchByLabel={"Group name"}
        searchByField={"groupName"}
        rowsPerPage={5}
        actions={actions}
      />

    </ModalContainer>
  );
};

export default CommonTableModal;
