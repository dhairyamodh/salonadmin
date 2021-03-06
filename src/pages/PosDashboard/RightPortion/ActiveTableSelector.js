import React from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { TYPESOFORDERS } from "../../../contants";
import {
  changeItemQuantity,
  deleteLocalOrder,
  removeItem,
  setActiveOrder,
} from "../../../redux/action/orderActions";
import { Curreny } from "../../../redux/types";
import ItemQuantitySelector from "./ItemQuantitySelector";
import { Button, Collapse } from "react-bootstrap";
import ListItemSelector from "./ListItemSelector";

const getColor = (type) => {
  if (type === 1) {
    return { backgroundColor: "#ffeaad" };
  }
  if (type === 2) {
    return { backgroundColor: "#c6ffba" };
  }
  if (type === 0) {
    return { backgroundColor: "#e3c8fa" };
  }
};
const styles = {
  container: {
    marginTop: "5px",
  },
  accordionHeader: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

const ActiveOrderSelector = ({ tables }) => {
  const dispatch = useDispatch();
  const tablesRef = React.useRef([]);

  const { lastOrderNumber, activeOrders } = useSelector((state) => state.order);
  const activeOrderIndex = useSelector((state) => state.order.activeOrderIndex);

  const active = activeOrders.find(
    (order) => order.refId === activeOrders[activeOrderIndex]?.refId
  );
  const branchCode = useSelector((state) => state.user.branchCode);
  const handleItemQuantity = (quantity, itemindex) => {
    dispatch(changeItemQuantity(parseInt(quantity), itemindex));
  };
  const deleteItem = (index) => {
    dispatch(removeItem(index));
  };

  const deleteOrder = (index) => {
    dispatch(deleteLocalOrder(index));
  };

  const makeTableActive = (refId) => {
    dispatch(setActiveOrder(refId));
  };

  React.useEffect(() => {
    tablesRef.current = tablesRef.current.slice(0, tables.length);
  }, [tables]);
  const executeScroll = (index) => {
    index &&
      tablesRef.current[tables.length - index] &&
      tablesRef.current[tables.length - index].scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
  };

  React.useEffect(() => {
    executeScroll(active);
  }, [active]);
  return [...tables].reverse().map((data, dataIndex) => {
    const index = activeOrders.length - 1 - dataIndex;

    const isActive = data.refId === active?.refId;

    return (
      <>
        <div
          class="card border mb-1 shadow-none"
          ref={(el) => (tablesRef.current[dataIndex] = el)}
        >
          <div
            class={`card-header ${isActive ? "bg-purple " : ""}`}
            style={{
              padding: "10px 10px",
              ...getColor(data.orderType),
            }}
            onClick={() => makeTableActive(data.refId)}
          >
            <a
              href="javascript:void(0);"
              class={`text-dark mb-0 pb-0`}
              data-toggle="collapse"
              data-target={`#collapseOne${index}`}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <div className="row " style={{ width: "100%" }}>
                {/* <div className="col-md-12 "> */}
                <div className="col-md-8">
                  {data.chairNumber ? (
                    <span
                      style={{
                        color: isActive ? "white" : undefined,
                      }}
                    >
                      Chair Number: {data.chairNumber}
                    </span>
                  ) : (
                    <span
                      style={{
                        color: isActive ? "white" : undefined,
                      }}
                    >
                      {
                        TYPESOFORDERS.find((DATA, INDEX) => {
                          return DATA.value === data.orderType;
                        }).key
                      }
                    </span>
                  )}
                </div>
                <div className="col-md-2">
                  <span style={{ color: isActive ? "white" : undefined }}>
                    {data.items.length} Items
                  </span>
                </div>
                <div className="col-md-2 d-flex justify-content-end">
                  <span>
                    <a
                      href="javascript:void(0);"
                      onClick={() => deleteOrder(index)}
                    >
                      <i
                        class={`mdi mdi-close-circle font-16 ${isActive ? `text-primary` : " text-danger "
                          }`}
                      ></i>
                    </a>
                  </span>
                </div>

                {/* </div> */}
                <div className="col-md-12">
                  <span
                    className={
                      isActive ? "badge badge-dark" : "badge badge-primary"
                    }
                    style={{ color: isActive ? "white" : undefined }}
                  >
                    # {lastOrderNumber + index + 1}
                  </span>
                </div>
              </div>
            </a>
          </div>
          <Collapse in={isActive}>
            <div class=" mt-0 pt-0 pl-1 pr-1 ">
              {data.items.length > 0 ? (
                <table class="table table-sm mb-0 ordertable">
                  <tbody>
                    {data.items.map((item, index) => {
                      return (
                        <tr key={index}>
                          {/* <th scope="row">{index + 1}</th> */}
                          <td>{item.name}</td>
                          <td>
                            {Curreny} {item.salePrice}
                          </td>
                          <td>
                            <ItemQuantitySelector
                              quantity={item.quantity}
                              setQuantity={(quantity) =>
                                handleItemQuantity(quantity, index)
                              }
                              deleteItem={() => deleteItem(index)}
                            />
                          </td>

                          <td className="text-right">
                            {Curreny}
                            {item.itemTotal}
                          </td>

                          <td>
                            <a
                              href="javascript:void(0);"
                              onClick={() => deleteItem(index)}
                            >
                              <i class="mdi mdi-close-circle-outline text-danger font-16"></i>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p class="mb-0 text-muted p-2">No Items Selected</p>
              )}
              <ListItemSelector />
            </div>
          </Collapse>
        </div>
      </>
    );
  });
};

export default ActiveOrderSelector;