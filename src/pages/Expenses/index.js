import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageCreator from "../../components/PageCreator";
import { BASEIMAGEURL, DATEFORMAT, dateRanges } from "../../contants";
import {
  deleteExpense,
  createExpense,
  updateExpense,
  getAllexpense,
} from "../../redux/action/expenseActions";

import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
const Expenses = () => {
  const dispatch = useDispatch();
  const salonExpenses = useSelector((state) => state.all.expenses);
  const [state, setState] = React.useState({
    start: moment(),
    end: moment(),
  });
  const { start, end } = state;

  const handleCallback = (start, end) => {
    // props.setValue({ start, end });
    // onChange(setState({ start, end }));
    setState({ start, end });

    dispatch(getAllexpense({ salonId, start, end }));
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
    { title: "Expense Title", key: "expenseTitle" },
    {
      title: "Quantity",
      key: "quantity",
    },
    {
      title: "Expense Amount",
      key: "expensePrice",
    },
  ];
  const formData = [
    // {
    //   type: isSalonAdmin ? "select" : "none",
    //   name: "branchId",
    //   label: "Branch",
    //   options: branches,
    //   optionLabelProp: "branchName",
    //   optionValueProp: "_id",
    //   hideAt: "Edit",
    //   required: true,
    //   rules: {
    //     required: {
    //       value: true,
    //       message: "Branch Name is required",
    //     },
    //   },
    // },

    {
      type: "text",
      name: "expenseTitle",
      label: "Expense Title",
      placeholder: "Type Expense Title",
      required: true,
    },
    {
      type: "number",
      name: "quantity",
      label: "Quantity (If Applicable)",
      placeholder: "Type Expense Price",
      required: true,
    },
    {
      type: "number",
      name: "expensePrice",
      label: "Expense Price",
      placeholder: "Type Expense Price",
      required: true,
    },
  ];

  const pageProps = {
    title: "Expenses",
    layout: "tabular",
    formData: formData,
    tableHeaders: tableHeaders,
    tableData: salonExpenses,
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
    tableRowActions: [],
    pageHeaderActions: [DatePicker],

    defaultFormValues: { salonId, role: role },
    deleteVariableTitle: undefined,
    onAdd: createExpense,
    onEdit: updateExpense,
    onDelete: deleteExpense,
    onImport: () => {},

    getData: (e) => getAllexpense({ salonId, ...state }),
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

export default Expenses;
