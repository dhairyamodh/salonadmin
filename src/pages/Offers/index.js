import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageCreator from "../../components/PageCreator";
import { BASEIMAGEURL, DATEFORMAT, dateRanges } from "../../contants";

import {
  getAllOffers,
  createOffer,
  updateOffer,
  deleteOffers,
} from "../../redux/action/salonActions";
import { getSalonServices } from "../../redux/action/serviceActions";

const Offers = () => {
  const dispatch = useDispatch();

  const { offers: data, salonServices } = useSelector((state) => state.all);

  const { role, salonId, branchId } = useSelector((state) => state.user);

  const tableHeaders = [
    { title: "Title", key: "offerTitle" },
    {
      title: "Sub Title",
      key: "offerSubTitle",
    },
    {
      title: "Image",
      key: "offerImage",
      type: "image",
      sourceUrl: BASEIMAGEURL,
    },
    {
      title: "Services",
      key: "servicesWithComa",
    },
  ];
  const formData = [
    {
      type: "text",
      name: "offerTitle",
      label: "Title",
      placeholder: "Type Title",
      required: true,
    },

    {
      type: "text",
      name: "offerSubTitle",
      label: "Sub Title",
      placeholder: "Type Sub Title",
      required: true,
    },
    {
      type: "file",
      name: "offerImage",
      label: "Image",
      placeholder: "Choose image",
      // required: open === "Add" && true,
    },
    {
      type: "multiselect",
      name: "services",
      label: "Services",
      placeholder: "Choose Services",
      options: salonServices,
      size: 6,
    },
    {
      type: "select",
      name: "status",
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
  const pageProps = {
    title: "Offers",
    layout: "tabular",
    tableHeaders: tableHeaders,
    tableData: data,
    formData: formData,
    searchByField: undefined,
    searchByLabel: undefined,

    sortable: true,

    paginated: true,

    enableImport: false,
    importHeaders: [],

    importData: [],

    tableRowActions: [],
    pageHeaderActions: [],

    defaultFormValues: { salonId, role: role },
    deleteVariableTitle: undefined,
    onAdd: createOffer,
    onEdit: updateOffer,
    onDelete: deleteOffers,
    onImport: () => {},

    getData: (e) => getAllOffers({ salonId }),
    getImportData: () => {},
    afterAddSuccess: () => {},
    afterEditSuccess: () => {},
    afterDeleteSuccess: () => {},
    afterImportSuccess: () => {},
  };

  React.useEffect(() => {
    dispatch(getSalonServices(salonId));
  }, []);
  return (
    <div>
      <PageCreator {...pageProps} />
    </div>
  );
};

export default Offers;
