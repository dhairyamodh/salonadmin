import React from "react";
import { useSelector } from "react-redux";
import { TYPESOFORDERS } from "../../../contants";

const TableTypeSelector = ({ selected, setSelected }) => {
  const allTables = useSelector((state) => state.order.allTables);
  const getTableTypes = () => {
    const key = "tableType";

    const arrayUniqueByKey = [
      ...new Map(allTables.map((item) => [item[key], item])).values(),
    ];

    return arrayUniqueByKey;
  };

  // tablesTypes={getTableTypes().map((data) => {
  //   return {
  //     tableTypeName: data.tableType,
  //     tableTypeId: data.tableTypeId,
  //   };
  // })}
  const handleSelectType = (e, tableTypeId) => {
    setSelected({
      type: e,
      tableTypeId: tableTypeId,
    });
  };
  return (
    <div
      class="btn-group"
      style={{ width: "100%" }}
      role="group"
      aria-label="Basic example"
    >
      <button
        type="button"
        onClick={() => handleSelectType("active")}
        class={`btn btn-${selected.type === "active" ? "primary" : "info"}`}
      >
        Active
      </button>

      <button
        type="button"
        onClick={() => handleSelectType(TYPESOFORDERS[0].value)}
        class={`btn btn-${
          selected.type === TYPESOFORDERS[0].value ? "primary" : "info"
        }`}
      >
        Chair
      </button>
      <button
        type="button"
        onClick={() => handleSelectType(TYPESOFORDERS[1].value)}
        class={`btn btn-${
          selected.type === TYPESOFORDERS[1].value ? "primary" : "info"
        }`}
      >
        Default
      </button>
      {/* <button
        type="button"
        onClick={() => handleSelectType(1)}
        class={`btn btn-${selected.type === 1 ? "primary" : "info"}`}
      >
        Parcel
      </button>
      <button
        type="button"
        onClick={() => handleSelectType(2)}
        class={`btn btn-${selected.type === 2 ? "primary" : "info"}`}
      >
        Home Delivery
      </button> */}
    </div>
  );
};

export default TableTypeSelector;
