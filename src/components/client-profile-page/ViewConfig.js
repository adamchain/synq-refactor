import PriceUtil from "../util/PriceUtil";

export const ClientPrimaryConfig = (clientData, states) => [
  {
    name: "fullName",
    label: "Name",
    value: clientData?.primary?.firstName + " " + clientData?.primary?.lastName,
  },
  {
    name: "clientStatus",
    label: "Status",
    value: clientData?.clientStatus === "A" ? "Active" : "InActive",
  },
  {
    name: "address",
    label: "Address",
    value: clientData?.primary,
  },
  {
    name: "email",
    value: clientData?.primary?.email ?? "-",
    label: "Email Address",
  },
  {
    name: "phone",
    value: clientData?.phones?.PH ?? "-",
    label:
      "Primary Phone " +
      (clientData.prefferedPhone === "PH" ? "(Preferred)" : ""),
  },
  {
    name: "mobile",
    value: clientData?.phones?.PM ?? "-",
    label:
      "Mobile Phone " +
      (clientData.prefferedPhone === "PM" ? "(Preferred)" : ""),
  },
  {
    name: "altphone",
    value: clientData?.phones?.PA ?? "-",
    label:
      "Alt Phone " + (clientData.prefferedPhone === "PA" ? "(Preferred)" : ""),
  },
];

export const ClientSecondaryConfig = (clientData) => [
  {
    name: "fullName",
    value:
      (clientData?.secondary?.firstName ?? "-") +
      " " +
      (clientData?.secondary?.lastName ?? ""),
    label: "Name",
  },
  // {
  //     name: "address",
  //     value: clientData?.secondary?.address? clientData?.secondary?.address: "Same as Primary",
  //     label: "Address"
  // },
  {
    name: "email",
    value: clientData?.secondary?.email ? clientData.secondary.email : "-",
    label: "Email Address",
  },
  {
    name: "cell",
    value: clientData?.phones?.SM ?? "-",
    label: "Cell Phone (Preferred)",
  },
  {
    name: "phone",
    value: clientData?.phones?.SA ?? "-",
    label: "Phone",
  },
];

export const ClientDiscounts = (clientData) => [
  {
    name: "DiscountName",
    value: clientData?.discount?.name ?? "-",
    label: "Discount Name",
  },

  {
    name: "amount",
    value: clientData?.discount?.amount
      ? PriceUtil.dollarOrPercentValue(
          clientData?.discount?.amount,
          clientData?.discount?.type,
        )
      : "-",
    label: "Discount Amount",
  },
  {
    name: "taxExempt",
    value: clientData?.taxExempt ? "Yes" : "No",
    label: "Tax Exempt",
  },
];
