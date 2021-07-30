import moment from "moment";
import React from "react";
import { DATEMONTHFORMAT, TIME24FORMAT, TIMEAMPMFORMAT } from "../../contants";

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
  } = data;

  const orderDate = moment(startDate).format(DATEMONTHFORMAT);
  const orderTIme = moment(startTime, [TIME24FORMAT]).format(TIMEAMPMFORMAT);
  const dangerClass = "border-warning text-warning";
  const successClass = "border-success text-success";

  const dangerbgClass = "bg-warning";
  const successbgClass = "bg-success";
  const orderStatus = isPaid === "true";
  return (
    <div class="row mb-3 mr-0 ml-0 list-card-left rounded">
      <div
        class={`py-2 col-md-2 text-center rounded-left d-flex align-items-center justify-content-center ${
          orderStatus ? successbgClass : dangerbgClass
        }`}
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
          {userMobile && (
            <div class="col-md-4">
              <i class="fa fa-phone"></i> {userMobile}
            </div>
          )}
          <div class="col-md-3">
            <span
              class={`text-uppercase small border badge-pill ${
                orderStatus ? successClass : dangerClass
              }`}
            >
              {orderStatus ? "Completed" : "Pending"}
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
