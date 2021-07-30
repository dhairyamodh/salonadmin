import moment from "moment";
import React from "react";
import { Card } from "react-bootstrap";
import SmartTable from "../common/SmartTable";
import {
  DATEFORMAT,
  DATEMONTHFORMAT,
  TIME24FORMAT,
  TIMEAMPMFORMAT,
} from "../../contants";

const CardDetails = ({ tabeleheaders, data, onClose, onConfirm }) => {
  const {
    userName,
    userEmail,
    userMobile,
    orderItems,
    paymentMethod,
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
  } = data;

  const orderDate = moment(startDate).format(DATEFORMAT);
  const orderTime = moment(startTime, [TIME24FORMAT]).format(TIMEAMPMFORMAT);
  const dangerClass = "border-warning text-warning";
  const successClass = "border-success text-success";
  const orderStatus = isPaid === "true";

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
          <div class="col-md-12 text-center mb-3">
            <h6 class="text-uppercase mt-2">{userName}</h6>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 border-right">
            {" "}
            <strong>Email</strong> <br />
            <p class="text-muted">
              <i class="icon-email"></i> {userEmail}
            </p>
          </div>
          <div class="col-md-6">
            {" "}
            <strong>Mobile</strong> <br />
            <p class="text-muted">
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
              class={`text-uppercase small border badge-pill  ${
                orderStatus ? successClass : dangerClass
              }`}
            >
              {orderStatus ? "Completed" : "Pending"}
            </span>
          </div>
        </div>
        <hr />
        <SmartTable headers={tabeleheaders} tableData={orderItems} />
        <div class="row">
          <div class="col-md-7 border-top">
            <div class="row">
              <div class="col-md-12">
                <table class="table table-condensed">
                  <tbody>
                    <tr class="h6">
                      <td class="border-top-0">Payment Method</td>
                      <td class="border-top-0 ">
                        <i class="fa fa-money"></i> {paymentMethod || "No"}
                      </td>
                    </tr>
                    <tr class="h6">
                      <td>Payment Status</td>
                      <td>
                        <span
                          class={` ${
                            orderStatus ? "text-success" : "text-warning"
                          }  font-weight-normal`}
                        >
                          <i class="fa fa-check-circle"></i>{" "}
                          {orderStatus ? "Completed" : "Pending"}
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
          {!orderStatus && (
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
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardDetails;
