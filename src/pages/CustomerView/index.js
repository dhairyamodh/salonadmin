import React, { useState, useCallback, useMemo, useRef } from "react";
import getFloat from "../../helpers/getFloat";
import { Card, Col, Row, Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { CURRENCY, TYPESOFPAYMENTS, SOCKETURL } from "../../contants/index";
import { setSoketConnectionStataus } from "../../redux/action/utilActions";
import DeleteCommonAction from "../../components/common/Actions/DeleteCommonAction";
// import useWebSocket, { ReadyState } from "react-use-websocket";
import useSocket from "../../hooks/useSocket";
const calculatePayment = (usermethods, cartTotal) => {
  let methods = {};
  methods.payment = 0;

  usermethods.forEach((item) => {
    methods.payment += item.amount;
  });
  methods.balance = cartTotal - methods.payment;
  return methods;
};

const PaymentModal = ({ open, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const { customerMessages: messageHistory, sendToAdmin } = useSocket("one");
  const isLoading = useSelector((state) => state.util.spinner);
  const connectionStatus = "open";
  const [paymentMethods, setPaymentMethods] = React.useState([]);
  // const [amount, setAmount] = React.useState("");
  const [customerState, setCustomerState] = React.useState({
    userName: undefined,
    userMobile: undefined,
    userEmail: undefined,

    remarks: undefined,
  });
  const [tipState, setTipState] = React.useState({
    tipAmount: undefined,
    tipPrecentage: undefined,
  });

  const data = messageHistory;
  const amount = data?.grandTotal;

  const handleClickSendMessage = () => {};

  const handleClose = () => {
    setPaymentMethods([]);
    // setAmount(0);
    onClose();
  };

  // const handleChange = (e) => {
  //   const { value } = e.target;

  //   if (value > 0) {
  //     setAmount(value);
  //   } else {
  //     alert("Please enter valid amount");
  //   }
  // };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerState({
      ...customerState,
      [name]: value,
    });
  };

  const handleTipChange = (val) => {
    const tipAmount = (amount * val) / 100;
    setTipState({
      tipAmount: getFloat(tipAmount),
      tipPrecentage: val,
    });
    // const { name, value } = e.target;
    // setTipState({
    //   ...tipState,
    //   [name]: value,
    // });
  };

  const handleDeleteTip = (val) => {
    setTipState({
      tipAmount: undefined,
      tipPrecentage: undefined,
    });
    // const { name, value } = e.target;
    // setTipState({
    //   ...tipState,
    //   [name]: value,
    // });
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

      // setAmount(0);
    } else {
      alert("Please enter valid amount");
    }
  };

  const handleDelete = ({ index }) => {
    setPaymentMethods(paymentMethods.filter((id, i) => i !== index));
  };

  let totalDue = data?.grandTotal;

  let payment = getFloat(calculatePayment(paymentMethods, totalDue).payment);

  let tipAmount = tipState?.tipAmount || 0;
  let totalPayment = payment + tipAmount;
  let dummybalance = getFloat(
    calculatePayment(paymentMethods, totalDue).balance
  );
  let disabled = dummybalance <= 0;
  let tipDisabled = tipState.tipAmount === undefined;

  let balance = disabled ? 0 : dummybalance;

  let cashReturn = disabled ? getFloat(payment - totalDue) : 0;

  const handleReceived = () => {
    // onSubmit({});
    sendToAdmin({
      ...messageHistory,

      ...customerState,
      ...tipState,
      paymentMethods,
      totalPayment: totalPayment,
      totalBalance: balance,
      totalCashReturn: cashReturn,
    });
  };

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
            {!tipDisabled && (
              <tr>
                <td>TIP</td>
                <td>{tipAmount}</td>
                <td>
                  <DeleteCommonAction onClick={() => handleDeleteTip()} />
                </td>
              </tr>
            )}

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

  const TipCard = () => {
    return (
      <div>
        <Card>
          <Card.Body>
            <div>
              <Row>
                {[5, 10, 15].map((a, i) => {
                  return (
                    <Col md={2} key={i}>
                      <Button onClick={() => handleTipChange(a)}>{a} %</Button>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <Row>
        <Col md={12}>
          <span>The WebSocket is currently {connectionStatus}</span>
        </Col>

        <Col md={6}>
          <ReceiveCard />
          <TipCard />
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
                    onChange={(e) => handleCustomerChange(e)}
                    className="form-control mt-3 "
                    style={{
                      borderColor: "gray",
                    }}
                    placeholder="Your Name"
                    value={customerState.userName}
                  />
                  <input
                    name="userMobile"
                    type="number"
                    max="10"
                    maxLength="10"
                    onChange={(e) => handleCustomerChange(e)}
                    className="form-control mt-3 "
                    style={{
                      borderColor: "gray",
                    }}
                    value={customerState.userMobile}
                    placeholder="Your Mobile Number"
                  />
                  <input
                    type="email"
                    name="userEmail"
                    onChange={(e) => handleCustomerChange(e)}
                    className="form-control mt-3 "
                    style={{
                      borderColor: "gray",
                    }}
                    value={customerState.userEmail}
                    placeholder="Your Email"
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
    </div>
  );
};

export default PaymentModal;

// import React, { useState, useCallback, useMemo, useRef } from "react";
// import getFloat from "../../helpers/getFloat";
// import { Card, Col, Row, Form, Button } from "react-bootstrap";

// import { useDispatch, useSelector } from "react-redux";
// import { CURRENCY, TYPESOFPAYMENTS, SOCKETURL } from "../../contants/index";
// import { setSoketConnectionStataus } from "../../redux/action/utilActions";
// import DeleteCommonAction from "../../components/common/Actions/DeleteCommonAction";
// import useWebSocket, { ReadyState } from "react-use-websocket";
// const calculatePayment = (usermethods, cartTotal) => {
//   let methods = {};
//   methods.payment = 0;

//   usermethods.forEach((item) => {
//     methods.payment += item.amount;
//   });
//   methods.balance = cartTotal - methods.payment;
//   return methods;
// };

// const PaymentModal = ({ open, onClose, onSubmit }) => {
//   const dispatch = useDispatch();
//   const isLoading = useSelector((state) => state.util.spinner);

//   const [messageHistory, setMessageHistory] = React.useState();
//   const [paymentMethods, setPaymentMethods] = React.useState([]);
//   // const [amount, setAmount] = React.useState("");
//   const [customerState, setCustomerState] = React.useState({
//     userName: undefined,
//     userMobile: undefined,
//     userEmail: undefined,

//     remarks: undefined,
//   });
//   const [tipState, setTipState] = React.useState({
//     tipAmount: undefined,
//     tipPrecentage: undefined,
//   });

//   const { sendMessage, lastMessage, readyState } = useWebSocket(SOCKETURL);
//   const data = messageHistory;
//   const amount = data?.grandTotal;

//   useMemo(() => {
//     console.log("lastMessage", lastMessage);
//     if (lastMessage !== null) {
//       const msg = JSON.parse(lastMessage?.data);
//       setMessageHistory(msg);
//     }
//   }, [lastMessage]);

//   const connectionStatus = {
//     [ReadyState.CONNECTING]: "Connecting",
//     [ReadyState.OPEN]: "Open",
//     [ReadyState.CLOSING]: "Closing",
//     [ReadyState.CLOSED]: "Closed",
//     [ReadyState.UNINSTANTIATED]: "Uninstantiated",
//   }[readyState];

//   React.useEffect(() => {
//     dispatch(setSoketConnectionStataus(connectionStatus));
//   }, [readyState]);

//   const handleClickSendMessage = useCallback(
//     () =>
//       sendMessage(
//         JSON.stringify({
//           ...data,

//           ...customerState,
//           ...tipState,
//           paymentMethods,
//           totalPayment: totalPayment,
//           totalBalance: balance,
//           totalCashReturn: cashReturn,
//         })
//       ),
//     []
//   );

//   const handleClose = () => {
//     setPaymentMethods([]);
//     // setAmount(0);
//     onClose();
//   };

//   // const handleChange = (e) => {
//   //   const { value } = e.target;

//   //   if (value > 0) {
//   //     setAmount(value);
//   //   } else {
//   //     alert("Please enter valid amount");
//   //   }
//   // };

//   const handleCustomerChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerState({
//       ...customerState,
//       [name]: value,
//     });
//   };

//   const handleTipChange = (val) => {
//     const tipAmount = (amount * val) / 100;
//     setTipState({
//       tipAmount: getFloat(tipAmount),
//       tipPrecentage: val,
//     });
//     // const { name, value } = e.target;
//     // setTipState({
//     //   ...tipState,
//     //   [name]: value,
//     // });
//   };

//   const handleDeleteTip = (val) => {
//     setTipState({
//       tipAmount: undefined,
//       tipPrecentage: undefined,
//     });
//     // const { name, value } = e.target;
//     // setTipState({
//     //   ...tipState,
//     //   [name]: value,
//     // });
//   };

//   const handleAddMethod = (pay) => {
//     if (getFloat(amount) > 0) {
//       console.log("amount", amount);
//       const dumbobj = {
//         paymentMethodType: pay.type,
//         paymentMethodId: pay.id,

//         amount: getFloat(amount),
//         handleAddMethod,
//       };
//       setPaymentMethods([...paymentMethods, dumbobj]);

//       // setAmount(0);
//     } else {
//       alert("Please enter valid amount");
//     }
//   };

//   const handleDelete = ({ index }) => {
//     setPaymentMethods(paymentMethods.filter((id, i) => i !== index));
//   };

//   const handleReceived = () => {
//     onSubmit({});
//   };

//   let totalDue = data?.grandTotal;

//   let payment = getFloat(calculatePayment(paymentMethods, totalDue).payment);

//   let tipAmount = tipState?.tipAmount || 0;
//   let totalPayment = payment + tipAmount;
//   let dummybalance = getFloat(
//     calculatePayment(paymentMethods, totalDue).balance
//   );
//   let disabled = dummybalance <= 0;
//   let tipDisabled = tipState.tipAmount === undefined;

//   let balance = disabled ? 0 : dummybalance;

//   let cashReturn = disabled ? getFloat(payment - totalDue) : 0;

//   const renderUpTableRow = (title, value, isCurrency) => {
//     return (
//       <tr>
//         <td>{title}</td>
//         <td>
//           {!isCurrency && CURRENCY}
//           {value}
//         </td>
//       </tr>
//     );
//   };

//   const renderImageButton = (pay) => {
//     return (
//       <Card
//         className="text-center bg-blue text-white border shadow-none"
//         onClick={() => handleAddMethod(pay)}
//         style={{
//           opacity: disabled ? 0.5 : 1,
//           cursor: "pointer",
//         }}
//       >
//         <Card.Body>
//           <i
//             class={pay.icon}
//             style={{ height: "10vh", width: "100%", fontSize: "45px" }}
//           />
//         </Card.Body>
//         <Card.Footer className="text-center bg-light text-dark">
//           {pay.type}
//         </Card.Footer>
//       </Card>
//     );
//   };

//   const renderTotalTable = () => {
//     return (
//       <div className="table-responsive">
//         <table className="table table-bordered table-sm">
//           <tbody>
//             {renderUpTableRow("Total Due", totalDue)}
//             {renderUpTableRow("Payment", payment)}
//             {/* {!tipDisabled && renderUpTableRow("Tip", tipState.tipAmount)} */}
//             {/* {renderUpTableRow("Balance", balance)}
//             {renderUpTableRow("Cash Return", cashReturn, "")} */}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderPaymentTable = () => {
//     return (
//       <div className="table-responsive">
//         <table className="table table-bordered ">
//           <thead>
//             <tr>
//               <th width="30%">Payment Method</th>

//               <th width="50%">Amount</th>
//               <th width="20%">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paymentMethods.map((method, index) => {
//               return (
//                 <tr key={index}>
//                   <td>{method.paymentMethodType.toUpperCase()}</td>
//                   <td>{method.amount}</td>
//                   <td>
//                     <DeleteCommonAction
//                       onClick={() => handleDelete({ index })}
//                     />
//                   </td>
//                 </tr>
//               );
//             })}
//             {!tipDisabled && (
//               <tr>
//                 <td>TIP</td>
//                 <td>{tipAmount}</td>
//                 <td>
//                   <DeleteCommonAction onClick={() => handleDeleteTip()} />
//                 </td>
//               </tr>
//             )}

//             <tr>
//               <td>You Pay</td>
//               <td>{totalPayment}</td>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const ReceiveCard = () => {
//     return (
//       <div>
//         <Card>
//           {/* <Card.Header>
//             <button className="btn btn-info btn-lg btn-block">Received</button>
//           </Card.Header> */}
//           <Card.Body>{renderTotalTable()}</Card.Body>
//           <Card.Body>{renderPaymentTable()}</Card.Body>
//         </Card>
//       </div>
//     );
//   };

//   const TipCard = () => {
//     return (
//       <div>
//         <Card>
//           <Card.Body>
//             <div>
//               <Row>
//                 {[5, 10, 15].map((a, i) => {
//                   return (
//                     <Col md={2} key={i}>
//                       <Button onClick={() => handleTipChange(a)}>{a} %</Button>
//                     </Col>
//                   );
//                 })}
//               </Row>
//             </div>
//           </Card.Body>
//         </Card>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Row>
//         <Col md={12}>
//           <span>The WebSocket is currently {connectionStatus}</span>
//         </Col>

//         <Col md={6}>
//           <ReceiveCard />
//           <TipCard />
//         </Col>
//         <Col md={6}>
//           <div>
//             <Card>
//               <Card.Header>Amount</Card.Header>
//               <Card.Body>
//                 <div>
//                   <input
//                     type="text"
//                     name="userName"
//                     onChange={(e) => handleCustomerChange(e)}
//                     className="form-control mt-3 "
//                     style={{
//                       borderColor: "gray",
//                     }}
//                     placeholder="Your Name"
//                     value={customerState.userName}
//                   />
//                   <input
//                     name="userMobile"
//                     type="number"
//                     max="10"
//                     maxLength="10"
//                     onChange={(e) => handleCustomerChange(e)}
//                     className="form-control mt-3 "
//                     style={{
//                       borderColor: "gray",
//                     }}
//                     value={customerState.userMobile}
//                     placeholder="Your Mobile Number"
//                   />
//                   <input
//                     type="email"
//                     name="userEmail"
//                     onChange={(e) => handleCustomerChange(e)}
//                     className="form-control mt-3 "
//                     style={{
//                       borderColor: "gray",
//                     }}
//                     value={customerState.userEmail}
//                     placeholder="Your Email"
//                   />
//                 </div>

//                 {/* <Form.Label>Amount</Form.Label>
//                 <Form.Control
//                   type="number"
//                   placeholder="Enter Amount"
//                   onChange={(e) => handleChange(e)}
//                   value={amount}
//                   disabled={disabled}
//                   step="0.01"
//                 /> */}
//                 {/* <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text> */}
//               </Card.Body>
//               <Card.Body style={{ height: "100%" }}>
//                 <Row>
//                   {TYPESOFPAYMENTS.map((pay) => {
//                     return <Col>{renderImageButton(pay)}</Col>;
//                   })}
//                   {/* <Col>{renderImageButton("icons/cash-icon.png", "cash")}</Col>
//                   <Col>{renderImageButton("icons/creditcard.png", "card")}</Col> */}
//                 </Row>
//               </Card.Body>
//               <Card.Footer>
//                 <div class="form-group mb-0">
//                   <button
//                     onClick={() => handleReceived()}
//                     disabled={!disabled || tipDisabled}
//                     class="btn btn-gradient-info waves-effect waves-light"
//                   >
//                     {isLoading && (
//                       <span
//                         class="spinner-border spinner-border-sm"
//                         role="status"
//                         aria-hidden="true"
//                       ></span>
//                     )}
//                     Confirm
//                   </button>
//                   {/* <button
//                     type="reset"
//                     class="btn btn-gradient-danger waves-effect ml-3"
//                     onClick={() => handleClose()}
//                   >
//                     Cancel
//                   </button> */}
//                 </div>
//               </Card.Footer>
//             </Card>
//           </div>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default PaymentModal;
