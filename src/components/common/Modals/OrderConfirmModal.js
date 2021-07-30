import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
const OrderConfirmModal = ({
  open,
  text,
  onConfirm,
  onCancel,
  enableRemarks,
}) => {
  // const [state, setState] = React.useState({
  //   userName: "Jamna",
  //   userMobile: "89888888888",
  //   remarks: undefined,
  // });
  const [state, setState] = React.useState({
    userName: undefined,
    userMobile: undefined,
    userEmail: undefined,

    remarks: undefined,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <SweetAlert
      info
      placeHolder="Customer Mobile Number"
      showCancel
      confirmBtnText="Confirm"
      confirmBtnBsStyle="success"
      title="Confirm Order?"
      onConfirm={() => onConfirm(state)}
      onCancel={() => onCancel()}
      focusCancelBtn
    >
      {text}

      <input
        type="text"
        name="userName"
        onChange={(e) => handleChange(e)}
        className="form-control mt-3 "
        style={{
          borderColor: "gray",
        }}
        placeholder="Customer Name"
        value={state.userName}
      />
      <input
        name="userMobile"
        type="number"
        max="10"
        maxLength="10"
        onChange={(e) => handleChange(e)}
        className="form-control mt-3 "
        style={{
          borderColor: "gray",
        }}
        value={state.userMobile}
        placeholder="Customer Mobile Number"
      />
      <input
        type="email"
        name="userEmail"
        onChange={(e) => handleChange(e)}
        className="form-control mt-3 "
        style={{
          borderColor: "gray",
        }}
        value={state.userEmail}
        placeholder="Customer Email"
      />
    </SweetAlert>
  );
};

export default OrderConfirmModal;
