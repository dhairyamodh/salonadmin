import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageCreator from "../../components/PageCreator";
import { BASEIMAGEURL, DATEFORMAT, dateRanges } from "../../contants";

import { getAllCustomers } from "../../redux/action/salonActions";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";

const Customers = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.all.customers);
  const [state, setState] = React.useState({
    start: moment(),
    end: moment(),
  });
  const { start, end } = state;

  const handleCallback = (start, end) => {
    // props.setValue({ start, end });
    // onChange(setState({ start, end }));
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
    { title: "Customer Name", key: "userName" },
    {
      title: "Customer Email",
      key: "userEmail",
    },
    { title: "Customer Mobile", key: "userMobile" },

    {
      title: "Services",
      key: "services",
      renderRow: (data) => data.orderItems.length,
    },

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
    title: "Customers",
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

    getData: (e) => getAllCustomers({ salonId, ...state }),
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

export default Customers;
