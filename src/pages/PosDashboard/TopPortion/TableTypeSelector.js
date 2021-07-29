import React from "react";
import { useSelector } from "react-redux";

const TableTypeSelector = ({ selected, chairTypes, setSelected }) => {
  // const chairTypes = useSelector((state) => state.order.chairTypes);

  const handleSelectType = (e) => {
    setSelected(e.target.value);
  };
  console.log("chairTypes", chairTypes);
  return (
    <div class="form-group mb-0 " style={{ width: "100%" }}>
      <select
        name="theme"
        label="Select Table Type"
        class="form-control"
        value={selected}
        onChange={(e) => handleSelectType(e)}
      >
        {chairTypes.map((type, index) => {
          // console.log("chair type", type);
          return (
            <option key={index} value={type.chairTypeId}>
              {type.chairTypeName ? type.chairTypeName.toUpperCase() : ""}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TableTypeSelector;
