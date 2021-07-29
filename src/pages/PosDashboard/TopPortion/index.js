import React from "react";
import OrderTypeSelector from "./OrderTypeSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  activateTable,
  setActiveOrder,
} from "../../../redux/action/orderActions";
import ButtonOrderSelector from "./ButtonOrderSelector";
import TableStatusInfo from "./TableStatusInfo";
import TableTypeSelector from "./TableTypeSelector";
import { Col, Row } from "react-bootstrap";
import ShortCutList from "./ShortCutList";
import { TYPESOFORDERS } from "../../../contants";

const TopPortion = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.name);
  const [chairFilterId, setTableFilterId] = React.useState("all");
  const active = useSelector((state) => state.order.activeOrderIndex);

  const allChairs = useSelector((state) => state.order.allChairs);
  const activeOrders = useSelector((state) => state.order.activeOrders);

  const checkactive = (chairNumber) => {
    let myIndex = activeOrders.find((chair) => {
      return chairNumber === chair.chairNumber;
    });

    if (myIndex) {
      return myIndex;
    } else {
      return false;
    }
  };
  const handleTableNumberClick = (data, index) => {
    if (checkactive(data.chairNumber)) {
      dispatch(setActiveOrder(checkactive(data.chairNumber).refId));
    } else {
      dispatch(
        activateTable(
          data.chairTypeId,
          data.chairNumber,
          index,
          username,
          data.chairPrice
        )
      );
    }
  };

  const handleTableTypeFilter = (typeId) => {
    setTableFilterId(typeId);
  };

  const handleOtherOrderClick = (data) => {
    dispatch(setActiveOrder(data.refId));
  };

  const getFilteredTables = () => {
    if (chairFilterId === "all") {
      return allChairs;
    } else {
      return allChairs.filter((tab) => tab.chairTypeId === chairFilterId);
    }
  };

  const getOtherOrders = () => {
    return activeOrders.filter((order) => !order.chairTypeId);
  };

  const getParcelOrders = () => {
    return activeOrders.filter(
      (order) => order.orderType === TYPESOFORDERS[1].value
    );
  };

  const getHomeDeliveryOrders = () => {
    return activeOrders.filter(
      (order) => order.orderType === TYPESOFORDERS[2].value
    );
  };

  const RowRender = ({ children }) => <Row class="pb-0 mb-0 ">{children}</Row>;
  const ColRender = ({ children, lg }) => (
    <Col lg={lg} class="pb-0 mb-0 ">
      {children}
    </Col>
  );

  const getTableTypes = () => {
    const key = "chairType";

    const arrayUniqueByKey = [
      ...new Map(allChairs.map((item) => [item[key], item])).values(),
    ];
    return arrayUniqueByKey;
  };
  return (
    <div class="card mb-0" style={{ width: "100%" }}>
      <div class="card-body pb-2 pt-2 mb-0">
        <RowRender>
          <div class="col-lg-3 p-0 pr-2">
            <OrderTypeSelector />
            <ShortCutList />
          </div>
          <ColRender lg={9}>
            <RowRender>
              <ColRender lg={3}>
                <RowRender>
                  <TableTypeSelector
                    selected={chairFilterId}
                    setSelected={handleTableTypeFilter}
                    chairTypes={getTableTypes().map((data) => {
                      return {
                        chairTypeName: data.chairType,
                        chairTypeId: data.chairTypeId,
                      };
                    })}
                  />
                </RowRender>
                <RowRender>
                  <TableStatusInfo />
                </RowRender>
              </ColRender>

              <ColRender lg={9}>
                <ButtonOrderSelector
                  chairs={getFilteredTables()}
                  otherOrders={getParcelOrders()}
                  handleTableNumberClick={handleTableNumberClick}
                  handleOtherOrderClick={handleOtherOrderClick}
                />
              </ColRender>
            </RowRender>
          </ColRender>
        </RowRender>
      </div>
    </div>
  );
};

export default TopPortion;
