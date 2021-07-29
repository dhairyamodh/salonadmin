import React from "react";
import PageCreator from "../../components/PageCreator";

import AssignSubscriptionModal from "./AssignsubscriptionModal";

import {
  emailRegex,
  mobileRegex,
  yupEmail,
  yupMobile,
} from "../../helpers/regex";
import {
  getAllThemes,
  getAllSubscriptions,
  getAllCurrencies,
} from "../../redux/action/commonActions.js";

import TableRowCommonAction from "../../components/common/Actions/TableRowCommonAction";

import { useDispatch, useSelector } from "react-redux";
import { BASEIMAGEURL, ROOTURL } from "../../contants";
import {
  assignSalonSubScription,
  createSalon,
  deleteSalon,
  getAllSalons,
  removeSalonSubScription,
  updateSalon,
} from "../../redux/action/salonActions";
import DeleteModal from "../../components/common/Modals/DeleteModal";
const Salons = () => {
  const dispatch = useDispatch();

  const [assignData, setAssignData] = React.useState();
  const [subscriptionDelete, setSubscriptionDelete] = React.useState();

  const salons = useSelector((state) => state.all.salons);

  const { themes, subscriptions, currencies } = useSelector(
    (state) => state.all
  );
  console.log("currencies", currencies);
  const formData = [
    {
      type: "text",
      name: "name",
      label: "Salon Name",
      size: 4,
      placeholder: "Type a name",
      required: true,
      // disabledCondition: ({ mode }) => {
      //   return mode === "edit";
      // },
    },
    {
      type: "text",
      name: "domainName",
      label: "Domain Name",
      size: 4,

      placeholder: "Enter a Domain Name",
      required: true,
    },
    {
      type: "file",
      name: "logo",
      // hideAt: "Edit",
      label: "Salon Logo",
      size: 4,
      // disabled: disabled,
      // ...(open === "Add" && {
      //   required: true
      // }),
    },
    {
      type: "text",
      name: "email",
      label: "E-Mail",
      size: 4,

      placeholder: "Enter a valid e-mail",
      required: true,
      rules: {
        required: {
          value: true,
          message: "Email Address is required",
        },

        pattern: {
          value: emailRegex,
          message: "Invalid email address",
        },
      },
    },
    {
      type: "text",
      name: "contactPerson",
      label: "Contact Person",
      size: 4,

      placeholder: "Enter a Contact Person Name",
      required: true,
    },
    {
      type: "text",
      name: "contactNumber",
      label: "Contact Mobile Number",
      size: 4,

      placeholder: "Enter a Contact Mobile Number Name",
      required: true,

      rules: {
        required: {
          value: true,
          message: "Mobile Number is required",
        },

        pattern: {
          value: mobileRegex,
          message: "Invalid mobile number",
        },
      },
    },
    {
      type: "textarea",
      name: "address",
      label: "Address",
      size: 12,
      rows: "2",
      placeholder: "Type a address",
      required: true,
    },
    {
      type: "number",
      name: "balance",
      label: "Current Balance",
      size: 3,

      placeholder: "Enter Current Balance",
      required: true,
      //   disabled: disabled,
    },
    // {
    //   type: "text",
    //   name: "gstNumber",
    //   label: "GST Number",
    //   size: 3,

    //   placeholder: "Enter GST Number",
    //   required: true,
    // },
    {
      type: "number",
      name: "taxPercentage",
      label: "Tax Percentage",
      size: 3,

      placeholder: "Enter Tax Percentage",
      required: true,
    },

    {
      type: "text",
      name: "tagLine",
      label: "Tag Line",
      size: 12,

      placeholder: "Type a tag line",
      required: true,
    },

    {
      type: "select",
      name: "themeId",
      size: 4,

      label: "App Theme",
      options: themes,
      optionLabelProp: "themeName",
      required: true,

      optionValueProp: "id",
      defaultOption: () => (
        <option selected disabled>
          Choose theme
        </option>
      ),
      // disabled: disabled,
    },
    {
      type: "select",
      name: "currencyId",
      size: 4,

      label: "Currency",
      options: currencies,
      optionLabelProp: "currencyNameWithCybol",
      optionValueProp: "_id",
      required: true,

      defaultOption: () => (
        <option selected disabled>
          Choose Currency
        </option>
      ),
      // disabled: disabled,
    },
    {
      type: "select",
      name: "status",
      size: 4,

      label: "Status",
      options: [
        {
          title: "Active",
          value: true,
        },
        {
          title: "Inactive",
          value: false,
        },
      ],
      optionLabelProp: "title",
      optionValueProp: "value",

      required: true,
    },
  ];

  const handleAssign = (data) => {
    setAssignData(data);
  };
  const handleDeleteSubscription = (data) => {
    setSubscriptionDelete(data);
  };
  const AssignAction = (action) => (
    <TableRowCommonAction
      icon="mdi mdi-package-variant-closed"
      onClick={() => handleAssign(action.data)}
    />
  );

  const RemoveSubscriptionActionAssignAction = (action) => {
    return !action?.data?.endDate ? (
      <div></div>
    ) : (
      <TableRowCommonAction
        icon="dripicons-tag-delete"
        onClick={() => handleDeleteSubscription(action.data)}
      />
    );
  };

  React.useEffect(() => {
    dispatch(getAllThemes("true"));
    dispatch(getAllCurrencies("true"));
    dispatch(getAllSubscriptions("true"));
  }, []);

  const tableHeaders = [
    { title: "Logo", key: "logo", type: "image", sourceUrl: BASEIMAGEURL },
    { title: "Salon Name", key: "name" },

    { title: "Branches", key: "branchCount" },

    { title: "Total Users", key: "userCount" },

    { title: "Subscription Start Date", key: "startDate" },
    { title: "Subscription End Date", key: "endDate" },
    { title: "Status", key: "status" },
  ];

  const defaults = {};

  const pageProps = {
    title: "Salons",
    layout: "tabular",
    formData: formData,
    tableHeaders: tableHeaders,
    tableData: salons,
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
    tableRowActions: [RemoveSubscriptionActionAssignAction, AssignAction],
    tableOtherActions: [],

    defaultFormValues: defaults || {},
    deleteVariableTitle: undefined,
    onAdd: createSalon,
    onEdit: updateSalon,
    onDelete: deleteSalon,
    onImport: () => {},

    getData: getAllSalons,
    getImportData: () => {},
    afterAddSuccess: () => {},
    afterEditSuccess: () => {},
    afterDeleteSuccess: () => {},
    afterImportSuccess: () => {},
  };

  const onAddNewSubscription = (data) => {
    dispatch(
      assignSalonSubScription(
        {
          subscriptionId: data,
          restaurantId: assignData._id || assignData.id,
        },

        () => {
          setAssignData();
          dispatch(getAllSalons());
        }
      )
    );
  };

  const deleteCurrentSubscription = (data) => {
    dispatch(
      removeSalonSubScription(
        {
          subscriptionId: data,
          restaurantId: subscriptionDelete._id || subscriptionDelete.id,
        },

        () => {
          setAssignData();
          setSubscriptionDelete();

          dispatch(getAllSalons());
        }
      )
    );
  };

  return (
    <div>
      <AssignSubscriptionModal
        open={Boolean(assignData)}
        title="Assign Subscription"
        mode="Assign"
        data={assignData}
        onClose={() => setAssignData()}
        onSubmit={(data) => onAddNewSubscription(data.subscriptionId)}
      />
      <DeleteModal
        size="md"
        open={Boolean(subscriptionDelete)}
        title={`Current subscription of ${subscriptionDelete?.name}`}
        onClose={() => setSubscriptionDelete()}
        onConfirm={() => deleteCurrentSubscription()}
      />
      <PageCreator {...pageProps} />
    </div>
  );
};

export default Salons;
