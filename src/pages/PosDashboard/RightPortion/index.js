import React from "react";
import { useSelector } from "react-redux";
import ActiveTableSelector from "./ActiveTableSelector";

import TableTypeSelector from "./TableTypeSelector";

const styles = {
  tableList: {
    height: "100%",
    overflowY: "auto",
  },
};
const RightPortion = () => {
  const [orderFilter, setTableFilterId] = React.useState({
    type: "active",
    chairTypeId: undefined,
  });
  const activeOrders = useSelector((state) => state.order.activeOrders);
  const activeOrderIndex = useSelector((state) => state.order.activeOrderIndex);

  const active = activeOrders.find(
    (order) => order.refId === activeOrders[activeOrderIndex]?.refId
  );

  const handleTableTypeFilter = (data) => {
    console.log(data);
    setTableFilterId({
      type: data.type,
      chairTypeId: data.chairTypeId,
    });
  };

  const getFilteredTables = () => {
    if (orderFilter.type === "active") {
      return active ? [active] : [];
    } else if (orderFilter.chairTypeId) {
      return activeOrders.filter(
        (tab) => tab.chairTypeId == orderFilter.chairTypeId
      );
    } else {
      return activeOrders.filter((tab) => tab.orderType == orderFilter.type);
    }
  };
  React.useEffect(() => {
    setTableFilterId({
      type: "active",
      chairTypeId: undefined,
    });
  }, [activeOrderIndex]);
  return (
    <div style={{ width: 500, padding: "10px 0px", height: "100%" }}>
      <div
        // class="card tables"
        class="tables"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",

          overflow: "hidden",
        }}
      >
        <TableTypeSelector
          selected={orderFilter}
          setSelected={handleTableTypeFilter}
        />
        <div style={styles.tableList} class="accordion" id="accordionExample">
          <ActiveTableSelector tables={getFilteredTables()} />
        </div>
        {/* <div>
            <OrderTotalDisplay />
          </div> */}
      </div>
    </div>
  );
};

export default RightPortion;
