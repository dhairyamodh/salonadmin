import ModalContainer from "../../../components/common/ModalContainer";

import React, { useState, useCallback, useMemo, useRef } from "react";
import getFloat from "../../../helpers/getFloat";
import { Card, Col, Row, Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { CURRENCY, TYPESOFPAYMENTS, SOCKETURL } from "../../../contants/index";
import { setSoketConnectionStataus } from "../../../redux/action/utilActions";

import { confirmOrder } from "../../../redux/action/orderActions";
import useSocket from "../../../hooks/useSocket";

const renderUpTableRow = (title, value, isCurrency) => {
  return (
    <tr>
      <td>{title}</td>
      <td>
        {!isCurrency && CURRENCY}
        {value}
      </td>
    </tr>
  );
};

const calculatePayment = (usermethods, cartTotal) => {
  let methods = {};
  methods.payment = 0;

  usermethods.forEach((item) => {
    methods.payment += item.amount;
  });
  methods.balance = cartTotal - methods.payment;
  return methods;
};

const PaymentPortion = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.util.spinner);

  const {
    messages: messageHistory,
    sendToCustomer,
    clearMessages,
  } = useSocket("one");

  // const handleClickSendMessage = useCallback(() =>
  //   //   sendMessage(
  //   //     JSON.stringify({
  //   //       ...data,

  //   //       ...customerState,
  //   //       ...tipState,
  //   //       paymentMethods,
  //   //       totalPayment: totalPayment,
  //   //       totalBalance: balance,
  //   //       totalCashReturn: cashReturn,
  //   //     })
  //   //   ),
  //   []
  // );

  const handleReceived = () => {
    dispatch(
      confirmOrder(messageHistory, () => {
        clearMessages();
      })
    );
  };
  const data = messageHistory;

  const paymentMethods = messageHistory?.paymentMethods || [];
  let totalDue = messageHistory?.grandTotal || 0;

  let payment = getFloat(calculatePayment(paymentMethods, totalDue).payment);

  let tipAmount = messageHistory?.tipAmount || 0;

  let tipDisabled = messageHistory?.tipAmount === undefined;

  let totalPayment = messageHistory?.totalPayment || 0;
  let dummybalance = getFloat(
    calculatePayment(paymentMethods, totalDue).balance
  );
  let disabled = dummybalance <= 0;

  let balance = disabled ? 0 : dummybalance;

  const renderTotalTable = () => {
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-sm">
          <tbody>
            {renderUpTableRow("Total Due", totalDue)}
            {renderUpTableRow("Payment", payment)}
            {/* {!tipDisabled && renderUpTableRow("Tip", tipState.tipAmount)} */}
            {/* {renderUpTableRow("Balance", balance)}
            {renderUpTableRow("Cash Return", cashReturn, "")} */}
          </tbody>
        </table>
      </div>
    );
  };

  const renderPaymentTable = () => {
    return (
      <div className="table-responsive">
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th width="30%">Payment Method</th>

              <th width="50%">Amount</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.map((method, index) => {
              return (
                <tr key={index}>
                  <td>{method.paymentMethodType.toUpperCase()}</td>
                  <td>{method.amount}</td>
                </tr>
              );
            })}
            <tr>
              <td>TIP</td>
              <td>{tipAmount}</td>
            </tr>

            <tr>
              <td>You Pay</td>
              <td>{totalPayment}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const ReceiveCard = () => {
    return (
      <div>
        <Card>
          {/* <Card.Header>
            <button className="btn btn-info btn-lg btn-block">Received</button>
          </Card.Header> */}
          <Card.Body>{renderTotalTable()}</Card.Body>
          <Card.Body>{renderPaymentTable()}</Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <ModalContainer
      open={Boolean(messageHistory)}
      onClose={() => {
        //   handleClose();
      }}
      title={`Complete Order #${data?.orderNumber}`}
    >
      <div>
        {messageHistory && (
          <Row>
            <Col md={12}>
              <span>The WebSocket is currently open</span>
            </Col>

            <Col md={6}>
              <ReceiveCard />
            </Col>
            <Col md={6}>
              <div>
                <Card>
                  <Card.Header>Amount</Card.Header>
                  <Card.Body>
                    <div>
                      <input
                        type="text"
                        name="userName"
                        className="form-control mt-3 "
                        style={{
                          borderColor: "gray",
                        }}
                        placeholder="Your Name"
                        value={messageHistory?.userName}
                        readOnly
                      />
                      <input
                        name="userMobile"
                        type="number"
                        max="10"
                        maxLength="10"
                        className="form-control mt-3 "
                        style={{
                          borderColor: "gray",
                        }}
                        placeholder="Your Mobile Number"
                        value={messageHistory?.userMobile}
                        readOnly
                      />
                      <input
                        type="email"
                        name="userEmail"
                        className="form-control mt-3 "
                        style={{
                          borderColor: "gray",
                        }}
                        placeholder="Your Email"
                        value={messageHistory?.userEmail}
                        readOnly
                      />
                    </div>

                    {/* <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Amount"
              onChange={(e) => handleChange(e)}
              value={amount}
              disabled={disabled}
              step="0.01"
            /> */}
                    {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
                  </Card.Body>

                  <Card.Footer>
                    <div class="form-group mb-0">
                      <button
                        onClick={() => handleReceived()}
                        disabled={!disabled || tipDisabled}
                        class="btn btn-gradient-info waves-effect waves-light"
                      >
                        {isLoading && (
                          <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        Confirm
                      </button>
                      {/* <button
                type="reset"
                class="btn btn-gradient-danger waves-effect ml-3"
                onClick={() => handleClose()}
              >
                Cancel
              </button> */}
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </ModalContainer>
  );
};

export default PaymentPortion;
