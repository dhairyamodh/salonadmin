import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageCreator from "../../components/PageCreator";
import { BASEIMAGEURL, DATEFORMAT, dateRanges } from "../../contants";

import { getAllOrders } from "../../redux/action/orderActions";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";

const Bookings = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.all.bookings);
  const [state, setState] = React.useState({
    start: moment(),
    end: moment(),
  });
  const { start, end } = state;

  const handleCallback = (start, end) => {
    // props.setValue({ start, end });
    // onChange(setState({ start, end }));
    dispatch(getAllOrders({ salonId, start, end }));

    setState({ start, end });
  };

  const { role, salonId, branchId } = useSelector((state) => state.user);

  const DatePicker = (action) => (
    <div class="">
      <DateRangePicker
        initialSettings={{
          startDate: start.toDate(),
          endDate: end.toDate(),

          locale: {
            format: DATEFORMAT,
          },
          maxDate: new Date(),

          ranges: dateRanges,
        }}
        onCallback={handleCallback}
      >
        <input type="text" class="form-control" />
      </DateRangePicker>
    </div>
  );

  const tableHeaders = [
    { title: "Order Number", key: "orderNumber" },
    {
      title: "Services",
      key: "itemsLength",
      renderRow: (child) => child.orderItems.length,
    },
    { title: "Net Amount", key: "itemsTotal", isCurrency: true },

    { title: "Taxes", key: "taxCharges", isCurrency: true },

    // { title: "CGST", key: "cgstCharges", isCurrency: true },
    // { title: "Discount", key: "discount", isCurrency: true },

    { title: "Other Charges", key: "otherCharges", isCurrency: true },
    { title: " Total Amount", key: "grandTotal", isCurrency: true },
    {
      title: "Paid",
      key: "isPaid",
      renderRow: (data) => {
        return data.isPaid === "true" ? " Yes" : "No";
      },
    },
  ];

  const pageProps = {
    title: "Bookings",
    layout: "tabular",
    tableHeaders: tableHeaders,
    tableData: data,
    searchByField: undefined,
    searchByLabel: undefined,

    sortable: true,

    paginated: true,

    enableImport: false,
    importHeaders: [],

    importData: [],

    // hideEdit,
    // hideDelete,
    // hideAdd,
    // hideView,
    hideEdit: true,
    hideDelete: true,
    hideAdd: true,
    hideView: true,
    tableRowActions: [],
    pageHeaderActions: [DatePicker],

    defaultFormValues: { salonId, role: role },
    deleteVariableTitle: undefined,
    onAdd: () => {},
    onEdit: () => {},
    onDelete: () => {},
    onImport: () => {},

    getData: (e) => getAllOrders({ salonId, ...state }),
    getImportData: () => {},
    afterAddSuccess: () => {},
    afterEditSuccess: () => {},
    afterDeleteSuccess: () => {},
    afterImportSuccess: () => {},
  };

  return (
    <div>
      <PageCreator {...pageProps} />
    </div>
  );
};

export default Bookings;
