import moment from "moment";
import React from "react";
import { Card } from "react-bootstrap";
import SmartTable from "../common/SmartTable";
import {
  DATEFORMAT,
  DATEMONTHFORMAT,
  ORDERSTATUS,
  TIME24FORMAT,
  TIMEAMPMFORMAT,
} from "../../contants";
import DeleteCommonAction from "../common/Actions/DeleteCommonAction";
import ListItemSelector from "./ListItemSelector";

const getPaymentString = (methos) => {
  return methos
    .map((data, index) => {
      return data.paymentMethodType;
    })
    .join(", ");
};

const getTextClass = (st) => {
  const dangerbgClass = "border-danger text-danger";
  const warningbgClass = "border-warning text-warning";

  const successbgClass = "border-success text-success";
  const confirmedgClass = "border-primary text-primary";

  switch (st) {
    case ORDERSTATUS[0].value:
      return warningbgClass;

      break;

    case ORDERSTATUS[1].value:
      return confirmedgClass;

      break;

    case ORDERSTATUS[2].value:
      return successbgClass;

      break;

    case ORDERSTATUS[3].value:
      return dangerbgClass;

      break;

    default:
      break;
  }
};

const getBTNClass = (st) => {
  const dangerbgClass = "btn-gradient-danger";
  const warningbgClass = "btn-gradient-warning";

  const successbgClass = "btn-gradient-info";
  const confirmedgClass = "btn-gradient-primary";

  switch (st) {
    case ORDERSTATUS[0].value:
      return warningbgClass;

      break;

    case ORDERSTATUS[1].value:
      return confirmedgClass;

      break;

    case ORDERSTATUS[2].value:
      return successbgClass;

      break;

    case ORDERSTATUS[3].value:
      return dangerbgClass;

      break;

    default:
      break;
  }
};



const CardDetails = ({
  tabeleheaders,
  onClose,
  data,
  onConfirm,
  onUpdate,
  onPushItem,
  onDeleteItem,
  onOrderConfirm,
}) => {
  const {
    userName,
    userEmail,
    userMobile,
    orderItems,
    paymentMethod,
    paymentMethods,

    isPaid,
    itemsTotal,
    taxCharges,
    grandTotal,
    discount,
    otherCharges,
    startDate,
    startTime,
    orderNumber,
    taxPercentage,
    instruction,
    orderStatus,
    employeeName,
  } = data;
  console.log('orderItems', orderItems);
  const DeleteGroupAction = (action) => (
    <DeleteCommonAction
      onClick={() => {
        // handleDelete(action.data);
        onDeleteItem(action.data)
      }}
    />
  );
  const orderDate = moment(startDate).format(DATEFORMAT);
  const orderTime = moment(startTime, [TIME24FORMAT]).format(TIMEAMPMFORMAT);
  const paidStatus = isPaid === "true";
  const isCanceled = orderStatus === ORDERSTATUS[3].value;

  const methosOfPayment =
    paymentMethods && paymentMethods.length > 0
      ? getPaymentString(paymentMethods)
      : "No";
  const bottomButtons = (orderStatus) => {
    switch (orderStatus) {
      case ORDERSTATUS[0].value:
        return (
          <div class="row">
            <div class="col-md-4 mt-2 mb-2">
              <button
                onClick={() => onConfirm("confirmed")}
                class={`btn waves-effect waves-light ${getBTNClass(
                  "confirmed"
                )}`}
                data-row-id="1"
                type="button"
              >
                Confirm Booking
              </button>
            </div>
            <div class="col-md-4 mt-2 mb-2">
              <button
                onClick={() => onConfirm("canceled")}
                class={`btn waves-effect waves-light ${getBTNClass(
                  "canceled"
                )}`}
                data-row-id="1"
                type="button"
              >
                Cancel Booking
              </button>
            </div>
            <div class="col-md-4 mt-2 mb-2">
              <button
                onClick={() => onUpdate()}
                class={`btn waves-effect waves-light btn-success shadow-none`}
                data-row-id="1"
                type="button"
              >
                Update Booking
              </button>
            </div>
          </div>
        );

        break;

      case ORDERSTATUS[1].value:
        return (
          <div class="row">
            <div class="col-md-4 mt-2 mb-2">
              <button
                onClick={() => onOrderConfirm(data)}
                class={`btn  waves-effect waves-light ${getBTNClass(
                  "completed"
                )}`}
                data-row-id="1"
                type="button"
              >
                Complete Payment
              </button>
            </div>
            <div class="col-md-4 mt-2 mb-2">
              <button
                onClick={() => onConfirm("canceled", { isPaid: false })}
                class={`btn waves-effect waves-light ${getBTNClass(
                  "canceled"
                )}`}
                data-row-id="1"
                type="button"
              >
                Cancel Booking
              </button>
            </div>
            <div class="col-md-4 mt-2 mb-2">
              <button
                onClick={() => onUpdate()}
                class={`btn waves-effect waves-light btn-success shadow-none`}
                data-row-id="1"
                type="button"
              >
                Update Booking
              </button>
            </div>
          </div>
        );

        break;

      case ORDERSTATUS[2].value:
        return <>
          <div class="col-md-4 mt-2 mb-2">
            <button
              onClick={() => onUpdate()}
              class={`btn waves-effect waves-light btn-success shadow-none`}
              data-row-id="1"
              type="button"
            >
              Update Booking
            </button>
          </div>
        </>;

        break;

      case ORDERSTATUS[3].value:
        return <></>;

        break;

      default:
        break;
    }
  };

  return (
    <Card>
      <Card.Body className="booking-details" style={{ color: "black" }}>
        <div class="row">
          <div class="col-md-12 text-right mt-2 mb-2">
            <button
              onClick={onClose}
              class="btn btn-sm btn-outline-danger delete-row"
              data-row-id="1"
              type="button"
            >
              <i class="fa fa-close"></i> Close
            </button>
          </div>
          {employeeName && (
            <div class="col-md-12 text-center mb-3">
              <h6 class="text-uppercase mt-2">Employee : {employeeName}</h6>
            </div>
          )}
        </div>
        <div class="row">
          <div class="col-md-4 border-right">
            {" "}
            <strong>Booking Number</strong> <br />
            <p class="text">#{orderNumber}</p>
          </div>
          <div class="col-md-4 border-right">
            {" "}
            <strong>Email</strong> <br />
            <p class="text">
              <i class="icon-email"></i> {userEmail}
            </p>
          </div>

          <div class="col-md-4">
            {" "}
            <strong>Mobile</strong> <br />
            <p class="text">
              <i class="icon-mobile"></i>
              {userMobile}
            </p>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-sm-4 border-right">
            {" "}
            <strong>Booking Date</strong> <br />
            <p class="text-primary">
              <i class="icon-calendar"></i>
              {orderDate}
            </p>
          </div>
          <div class="col-sm-4 border-right">
            {" "}
            <strong>Booking Time</strong> <br />
            <p class="text-primary">
              <i class="icon-alarm-clock"></i>
              {orderTime}
            </p>
          </div>
          <div class="col-sm-4">
            {" "}
            <strong>Booking Status</strong> <br />
            <span
              class={`text-uppercase small border badge-pill  ${getTextClass(
                orderStatus
              )}`}
            >
              {orderStatus}
            </span>
          </div>
        </div>
        <hr />
        <SmartTable headers={tabeleheaders} tableData={orderItems} actions={[DeleteGroupAction]} />
        <ListItemSelector onPushItem={onPushItem} onDeleteItem={onDeleteItem} />
        <div class="row">
          <div class="col-md-7 border-top">
            <div class="row">
              <div class="col-md-12">
                <table class="table table-condensed">
                  <tbody>
                    <tr class="h6">
                      <td class="border-top-0">Payment Method</td>
                      <td class="border-top-0 ">
                        <i class="fa fa-money"></i> {methosOfPayment || "No"}
                      </td>
                    </tr>
                    <tr class="h6">
                      <td>Payment Status</td>
                      <td>
                        <span
                          class={` ${isCanceled
                            ? "text-danger"
                            : paidStatus
                              ? "text-success"
                              : "text-warning"
                            }  font-weight-normal`}
                        >
                          {paidStatus ? (
                            <i class="fa fa-check-circle"></i>
                          ) : (
                            <i class="fa fa-close"></i>
                          )}{" "}
                          {isCanceled
                            ? "Canceled"
                            : paidStatus
                              ? "Completed"
                              : "Pending"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-md-5 border-top amountDetail">
            <div class="row">
              <div class="col-md-12">
                <table class="table table-condensed">
                  <tbody>
                    <tr class="h6">
                      <td class="border-top-0 text-right">Sub Total</td>
                      <td class="border-top-0">$ {itemsTotal}</td>
                    </tr>

                    <tr class="h6">
                      <td class="text-right">Tax (%) </td>
                      <td>{taxPercentage}</td>
                    </tr>

                    <tr class="h6">
                      <td class="text-right">Tax Charges</td>
                      <td>$ {taxCharges}</td>
                    </tr>
                    <tr class="h6">
                      <td class="text-right">Discount</td>
                      <td>$ {discount}</td>
                    </tr>

                    <tr class="h5">
                      <td class="text-right">Grand Total</td>
                      <td>$ {grandTotal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {instruction && (
            <div class="col-md-12 font-italic">
              <h4 class="text-info">Customer Message</h4>
              <p class="text-lg">{instruction}</p>
            </div>
          )}
          <div class="col-md-12">{bottomButtons(orderStatus)}</div>
          {/* {!orderStatus && (
            <div class="col-md-12 mt-2 mb-2">
              <button
                onClick={onConfirm}
                class="btn btn-gradient-primary waves-effect waves-light"
                data-row-id="1"
                type="button"
              >
                <i class="fa fa-close"></i> Confirm Order
              </button>
            </div>
          )} */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardDetails;
