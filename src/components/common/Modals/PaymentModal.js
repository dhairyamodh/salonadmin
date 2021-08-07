import React from "react";
import getFloat from "../../../helpers/getFloat";
import { Card, Col, Row, Form } from "react-bootstrap";

import { useSelector } from "react-redux";
import { CURRENCY, TYPESOFPAYMENTS } from "../../../contants";
import DeleteCommonAction from "../Actions/DeleteCommonAction";

import ModalContainer from "../ModalContainer";

const calculatePayment = (usermethods, cartTotal) => {
  let methods = {};
  methods.payment = 0;

  usermethods.forEach((item) => {
    methods.payment += item.amount;
  });
  methods.balance = cartTotal - methods.payment;
  return methods;
};

const PaymentModal = ({ open, onClose, onSubmit, data }) => {
  console.log("paymentModal", data);
  const isLoading = useSelector((state) => state.util.spinner);

  const [paymentMethods, setPaymentMethods] = React.useState([]);
  const [amount, setAmount] = React.useState(0);

  const handleClose = () => {
    setPaymentMethods([]);
    setAmount(0);
    onClose();
  };

  const handleChange = (e) => {
    const { value } = e.target;

    if (value > 0) {
      setAmount(value);
    } else {
      alert("Please enter valid amount");
    }
  };

  const handleAddMethod = (pay) => {
    if (getFloat(amount) > 0) {
      console.log("amount", amount);
      const dumbobj = {
        paymentMethodType: pay.type,
        paymentMethodId: pay.id,

        amount: getFloat(amount),
        handleAddMethod,
      };
      setPaymentMethods([...paymentMethods, dumbobj]);

      setAmount(0);
    } else {
      alert("Please enter valid amount");
    }
  };

  const handleDelete = ({ index }) => {
    setPaymentMethods(paymentMethods.filter((id, i) => i !== index));
  };

  const handleReceived = () => {
    onSubmit({
      paymentMethods,
      totalPayment: payment,
      totalBalance: balance,
      totalCashReturn: cashReturn,
    });
  };

  let totalDue = data?.grandTotal;

  let payment = getFloat(calculatePayment(paymentMethods, totalDue).payment);

  let dummybalance = getFloat(
    calculatePayment(paymentMethods, totalDue).balance
  );
  let disabled = dummybalance <= 0;
  let balance = disabled ? 0 : dummybalance;

  let cashReturn = disabled ? getFloat(payment - totalDue) : 0;

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

  const renderImageButton = (pay) => {
    return (
      <Card
        className="text-center bg-blue text-white border shadow-none"
        onClick={() => handleAddMethod(pay)}
        style={{
          opacity: disabled ? 0.5 : 1,
          cursor: "pointer",
        }}
      >
        <Card.Body>
          <i
            class={pay.icon}
            style={{ height: "10vh", width: "100%", fontSize: "45px" }}
          />
        </Card.Body>
        <Card.Footer className="text-center bg-light text-dark">
          {pay.type}
        </Card.Footer>
      </Card>
    );
  };

  const renderTotalTable = () => {
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-sm">
          <tbody>
            {renderUpTableRow("Total Due", totalDue)}
            {renderUpTableRow("Payment", payment)}
            {renderUpTableRow("Balance", balance)}
            {renderUpTableRow("Cash Return", cashReturn, "")}
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
              <th width="20%">Action</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.map((method, index) => {
              return (
                <tr key={index}>
                  <td>{method.paymentMethodType.toUpperCase()}</td>
                  <td>{method.amount}</td>
                  <td>
                    <DeleteCommonAction
                      onClick={() => handleDelete({ index })}
                    />
                  </td>
                </tr>
              );
            })}
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
      open={open}
      onClose={() => {
        handleClose();
      }}
      title={`Complete Order #${data?.orderNumber}`}
    >
      <Row>
        <Col md={6}>
          <ReceiveCard />
        </Col>
        <Col md={6}>
          <div>
            <Card>
              <Card.Header>Amount</Card.Header>
              <Card.Body>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Amount"
                  onChange={(e) => handleChange(e)}
                  value={amount}
                  disabled={disabled}
                  step="0.01"
                />
                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
              </Card.Body>
              <Card.Body style={{ height: "100%" }}>
                <Row>
                  {TYPESOFPAYMENTS.map((pay) => {
                    return <Col>{renderImageButton(pay)}</Col>;
                  })}
                  {/* <Col>{renderImageButton("icons/cash-icon.png", "cash")}</Col>
                  <Col>{renderImageButton("icons/creditcard.png", "card")}</Col> */}
                </Row>
              </Card.Body>
              <Card.Footer>
                <div class="form-group mb-0">
                  <button
                    onClick={() => handleReceived()}
                    disabled={!disabled}
                    class="btn btn-gradient-info waves-effect waves-light"
                  >
                    {isLoading && (
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Received
                  </button>
                  <button
                    type="reset"
                    class="btn btn-gradient-danger waves-effect ml-3"
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </button>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </Col>
      </Row>
    </ModalContainer>
  );
};

export default PaymentModal;
