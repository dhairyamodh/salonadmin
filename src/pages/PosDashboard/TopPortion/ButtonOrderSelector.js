import React from "react";
import { useSelector } from "react-redux";
import {
  stableSort,
  getComparator,
} from "../../../components/common/SmartTable/functions";
import { TYPESOFORDERS } from "../../../contants";
const ButtonOrderSelector = ({
  chairs,
  handleTableNumberClick,
  otherOrders,

  handleOtherOrderClick,
}) => {
  const activeOrders = useSelector((state) => state.order.activeOrders);

  const checkactive = (chairNumber) => {
    if (
      activeOrders.findIndex((table) => {
        console.log("activeOrders", chairNumber, table.chairNumber);

        return chairNumber === table.chairNumber;
      }) >= 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  const findTitle = (orderType) => {
    return TYPESOFORDERS.find((order) => order.value === orderType).key.charAt(
      0
    );
  };

  return (
    <div class="flex-container" style={{ maxHeight: 80, overflow: "auto" }}>
      {stableSort(chairs, getComparator("asc", "chairNumber")).map(
        (data, index) => {
          return (
            <button
              key={index}
              onClick={() => handleTableNumberClick(data, index)}
            >
              <div
                class={`child ${
                  checkactive(data.chairNumber) ? `child-active` : ""
                }`}
              >
                {data.chairNumber}
              </div>
            </button>
          );
        }
      )}
      {otherOrders.map((data, index) => {
        return (
          <button
            key={index}
            onClick={() => handleOtherOrderClick(data, index)}
          >
            <div
              class={`child child-parcel`}
              style={{ backgroundColor: TYPESOFORDERS[0].bgColor }}
            >
              {findTitle(data.orderType)} {index + 1}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ButtonOrderSelector;
