import moment from "moment";
import React from "react";
import {
  DATEMONTHFORMAT,
  ORDERSTATUS,
  TIME24FORMAT,
  TIMEAMPMFORMAT,
} from "../../contants";

const getStatus = (st) => {
  if (st) {
    if (st === "confirmed " || st === "completed ") {
      return true;
    }
  }
  return false;
};

const getBgClass = (st) => {
  const dangerbgClass = "bg-danger";
  const warningbgClass = "bg-warning";

  const successbgClass = "bg-success";
  const confirmedgClass = "bg-primary";

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

const Card = ({ data, onClick }) => {
  const {
    startDate,
    startTime,
    orderNumber,

    userName,
    userMobile,
    userEmail,
    isPaid,
    orderItems,
    orderStatus: status,
  } = data;

  const orderDate = moment(startDate).format(DATEMONTHFORMAT);
  const orderTIme = moment(startTime, [TIME24FORMAT]).format(TIMEAMPMFORMAT);
  const dangerClass = "border-warning text-warning";
  const successClass = "border-success text-success";

  const orderStatus = getStatus(status);
  return (
    <div class="row mb-3 mr-0 ml-0 list-card-left rounded">
      <div
        class={`py-2 col-md-2 text-center rounded-left d-flex align-items-center justify-content-center ${getBgClass(
          status
        )}`}
      >
        <div>
          <h5 class="h5">{orderDate}</h5>
          <span class="badge border  font-weight-normal">{orderTIme}</span>
          <br />

          <small class="text-uppercase"># {orderNumber}</small>
        </div>
      </div>
      <div
        class="col-md-9 bg-white p-2 text-uppercase"
        style={{ color: "black" }}
      >
        <h6 class="h5" class="font-weight-bold" style={{ color: "black" }}>
          {userName}
        </h6>

        <div class="row mb-2">
          <div class="col-md-5 text-lowercase">
            <i class="fa fa-envelope-o"></i>
            {userEmail}
          </div>
          <div class="col-md-4">
            {userMobile && <i class="fa fa-phone"></i>} {userMobile}
          </div>
          <div class="col-md-3">
            <span
              class={`text-uppercase small border badge-pill ${getTextClass(
                status
              )}`}
            >
              {status?.toUpperCase()}
            </span>
          </div>
        </div>
        {orderItems.slice(0, 5).map((item) => (
          <span class="small text-primary">{item.name} •</span>
        ))}
      </div>
      <div class="col-md-1 text-right border-left bg-white rounded-right d-flex align-items-center justify-content-center">
        <button
          type="button"
          data-booking-id="1"
          onClick={() => onClick(data)}
          class="btn bg-transparent text-primary p-3 btn-social-icon rounded-right view-booking-detail"
        >
          <i class="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Card;
