import { Typography } from "antd";
import CommonUtil from "../util/CommonUtil";
const Text = { Typography };

const StaffViewConfig = (staffData = {}) => [
  {
    name: "name",
    value: (staffData?.firstName ?? "") + " " + (staffData?.lastName ?? ""),
    label: "Name",
  },
  {
    label: "ID",
    value: staffData.userId ?? "-",
    name: "userId",
  },
  {
    label: "Active",
    value: staffData.status,
    name: "active",
  },
  {
    label: "Role",
    value: staffData.STAFF_ROLES[staffData?.permission] ?? "-",
    name: "role",
  },
  {
    label: "Address",
    value: {
      address1: staffData.address1,
      address2: staffData.address2,
      city: staffData.city,
      stateId: staffData.stateId,
      zip: staffData.zip,
    },
    name: "address",
  },
  {
    label: "Email Address",
    value: staffData.email ?? "-",
    name: "email",
  },
  {
    label: "Mobile Phone",
    value: staffData.mobilePhone
      ? CommonUtil.formatPhoneNumber(staffData.mobilePhone)
      : "-",
    name: "mobilePhone",
  },
  {
    label: "Alt Phone",
    value: staffData.altPhone
      ? CommonUtil.formatPhoneNumber(staffData.altPhone)
      : "-",
    name: "altPhone",
  },
  {
    label: "Pay Type",
    value: staffData.pay && staffData.pay === "H" ? "Hourly" : "Salary",
    name: "pay",
  },
];

export { StaffViewConfig };
