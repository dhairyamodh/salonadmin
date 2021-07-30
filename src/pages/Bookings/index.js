import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "../../redux/action/snackActions";

import DeleteCommonAction from "../../components/common/Actions/DeleteCommonAction";

import { deleteService } from "../../redux/action/serviceActions";

import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import { DATEFORMAT, ORDERSTATUS, TYPESOFPAYMENTS } from "../../contants";
import {
  getFilteredOrders,
  updateOrder,
} from "../../redux/action/orderActions";
import ListCard from "../../components/BookingCards/cards";

import CardDetails from "../../components/BookingCards/cardDetails";

import ReportSelector from "../../components/ReportSelector";

const selectorData = [
  {
    type: "dateRange",
    name: "date",
    size: 4,
    showPlaceHolder: true,
    label: "Booking Date",
    required: true,
    options: {
      singleDatePicker: true,
      hideRanges: true,
    },
    rules: {
      required: {
        value: true,
        message: "Date is required",
      },
    },
  },
  {
    type: "select",
    name: "orderStatus",
    label: "Booking Status",
    optionLabelProp: "key",
    optionValueProp: "value",
    required: true,
    hasOptions: true,
    getOptionLabel: (opt) => opt.key,
    defaultOption: () => (
      <option selected value="all">
        All
      </option>
    ),

    size: 4,
    rules: {
      required: {
        value: true,
        message: "Booking status is required",
      },
    },
  },
  {
    type: "select",
    name: "paymentTypeId",
    label: "Payment Type",
    optionLabelProp: "type",
    optionValueProp: "id",
    hasOptions: true,
    required: true,

    getOptionLabel: (opt) => opt.type,
    defaultOption: () => (
      <option selected value="all">
        All
      </option>
    ),

    size: 4,
    rules: {
      required: {
        value: true,
        message: "Payment Type is required",
      },
    },
  },
];

const tabeleheaders = [
  {
    title: "Service",
    key: "name",
  },
  { title: "Estimated Time", key: "estimatedTime" },
  { title: "Amount", key: "salePrice" },
];

const OrderHistory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.all.bookings);
  const { role, salonId, branchId } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState();

  const handleCardClick = (data) => {
    setOpen(data);
  };

  const handleCloseCard = (data) => {
    setOpen();
  };
  const handleConfirm = () => {
    dispatch(updateOrder(open));
  };

  // const handleDelete = (data) => {
  //   toggleAdd("Delete");
  //   setActionData(data);
  // };

  // const confirmDelete = (data) => {
  //   dispatch(deleteService({ role, id: actionData.id || actionData._id })).then(
  //     (res) => {
  //       if (res.payload.status === 200) {
  //         toggleAdd();
  //         dispatch(showSnackBar("Item Deleted succesfully"));
  //       }
  //     }
  //   );
  // };

  // React.useEffect(() => {
  //   dispatch(getAllOrders({ salonId, ...state }));
  // }, [state]);
  const initialEffectFunction = () => {};

  const optionData = {
    orderStatus: ORDERSTATUS,
    paymentTypeId: TYPESOFPAYMENTS,
  };
  return (
    <>
      <div class="row" style={{ marginBottom: 50 }}>
        <div class="col-12">
          <ReportSelector
            getReportData={(data) => {
              // getData(data);
              // console.log("report data", data);
              dispatch(getFilteredOrders(data));
            }}
            formData={selectorData}
            initialEffectFunction={initialEffectFunction}
            optionData={optionData}
            noPadding={true}
          />
        </div>
        <div
          class="col-6 mt-2"
          style={{ maxHeight: "100vh", overflow: "auto" }}
        >
          {data.map((item) => (
            <ListCard data={item} onClick={(data) => handleCardClick(data)} />
          ))}
        </div>
        {open && (
          <div class="col-6 mt-2">
            <CardDetails
              data={open}
              onClose={() => handleCloseCard()}
              onConfirm={() => handleConfirm()}
              tabeleheaders={tabeleheaders}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
