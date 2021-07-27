import { TYPESOFPAYMENTS, MONTHSARRAY } from "../../contants";
import { Curreny } from "../../redux/types";

export default {
  superadmin: {},
  salonadmin: {
    dailyreport: {
      title: "Daily Report",
      dataVariable: "table",
      dataType: "order",
      noPadding: true,
      selectorFormData: [
        {
          type: "dateRange",
          name: "date",
          size: 4,
          placeholder: "Type Table Number",
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
      ],
      layouts: [
        {
          type: "table",
          dataVariable: "table",
          width: 12,

          headers: [
            { title: "Order Number", key: "orderNumber" },
            { title: "Services", key: "itemsLength" },
            { title: "Amount", key: "grandTotal", isCurrency: true },
            { title: "Tax Charges", key: "taxCharges", isCurrency: true },
            { title: "Other Charges", key: "otherCharges", isCurrency: true },
          ],
        },
      ],
    },

    cashbook: {
      title: "Cash Book",
      dataVariable: "cashbook",
      noPadding: true,
      selectorFormData: [
        {
          type: "dateRange",
          name: "date",
          size: 4,
          placeholder: "Type Table Number",
          required: true,

          rules: {
            required: {
              value: true,
              message: "Date is required",
            },
          },
        },
      ],
      layouts: [
        {
          type: "iconsgrid",
          dataVariable: "iconsgrid",
          width: 12,
          isCurrency: true,

          headers: [
            {
              title: "Orders",
              key: "totalOrders",
              icon: "typcn typcn-printer",
            },
            {
              title: "Total Order Amount",
              key: "billingAmount",
              icon: "mdi mdi-cart-arrow-right",
            },

            {
              title: "Total Cash Amount",
              key: "cashAmount",
              icon: "mdi mdi-cart-arrow-right",
            },

            {
              title: "Tax",
              key: "totalTax",
              icon: "mdi mdi-home-currency-usd",
            },
            { title: "Expenses", key: "totalExpense", icon: "mdi mdi-wallet" },
          ],
        },
      ],
    },

    expensereport: {
      title: "Expense Report",
      dataVariable: "expensereport",
      noPadding: true,
      selectorFormData: [
        {
          type: "dateRange",
          name: "date",
          size: 4,
          placeholder: "Type Table Number",
          required: true,

          rules: {
            required: {
              value: true,
              message: "Date is required",
            },
          },
        },
      ],
      layouts: [
        {
          type: "table",
          dataVariable: "table",
          tableOptions: {
            sortable: true,
            paginated: true,
          },
          width: 12,

          headers: [
            { title: "Expense Title", key: "expenseTitle" },
            {
              title: "Quantity",
              key: "quantity",
            },
            {
              title: "Expense Amount",
              key: "expensePrice",
            },
          ],
        },
      ],
    },
    servicereport: {
      title: "Service Report",
      dataVariable: "servicereport",
      dataType: "order",
      noPadding: true,
      selectorFormData: [
        {
          type: "dateRange",
          name: "date",
          size: 4,
          placeholder: "Type Table Number",
          required: true,

          rules: {
            required: {
              value: true,
              message: "Date is required",
            },
          },
        },
      ],
      layouts: [
        {
          type: "table",
          dataVariable: "table",
          tableOptions: {
            sortable: true,
            paginated: true,
          },
          width: 12,

          headers: [
            { title: "Service Name", key: "name" },
            { title: "Total Revenue", key: "totalSold", isCurrency: true },
            { title: "Total Quantity Sold", key: "quantity" },
            { title: "Price", key: "price", isCurrency: true },
          ],
        },
      ],
    },
    salesreport: {
      title: "Sales Report",
      dataVariable: "itemreport",
      dataType: "order",
      noPadding: true,
      selectorFormData: [
        {
          type: "select",
          name: "branchId",

          optionLabelProp: "branchName",
          optionValueProp: "_id",
          hasOptions: true,
          hideAt: ["branchadmin"],
          required: true,
          //   option: branches,
          getOptionLabel: (opt) => opt.branchName,
          defaultOption: () => (
            <option selected value="all">
              All Branches
            </option>
          ),

          size: 4,
          rules: {
            required: {
              value: true,
              message: "Branch Name is required",
            },
          },
        },

        // {
        //   type: "dateRange",
        //   name: "date",
        //   size: 4,
        //   placeholder: "Type Table Number",
        //   required: true,

        //   rules: {
        //     required: {
        //       value: true,
        //       message: "Date is required",
        //     },
        //   },
        // },
      ],
      layouts: [
        {
          type: "chart",
          dataVariable: "chart",
          showCard: true,
          width: 12,
          headers: [
            {
              name: "Sale",
              key: "revenue",
              dataVariable: "Revenue",
            },
            {
              name: "Expense",
              key: "expense",
              dataVariable: "expense",
            },
            {
              name: "Profit",
              key: "profit",
              dataVariable: "profit",
            },
          ],

          chartOptions: {
            type: "bar",

            options: {
              title: {
                text: "Monthly revenue",
                align: "left",
              },
              chart: {
                type: "bar",
                height: 350,
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "55%",
                  endingShape: "rounded",
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
              },
              xaxis: {
                categories: MONTHSARRAY,
              },
              yaxis: {
                title: {
                  text: `${Curreny} Rupees`,
                },
              },
              fill: {
                opacity: 1,
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return Curreny + " " + val;
                  },
                },
              },
            },
          },
        },
      ],
    },
  },
};
