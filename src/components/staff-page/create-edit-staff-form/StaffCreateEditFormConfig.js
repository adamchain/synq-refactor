import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import React from "react";

const { Text } = Typography;

const StaffCreateEditFormConfig = (
  states,
  inputData,
  role,
  isEdit,
  defaultBranchTypeId,
) => [
  {
    mainLabel: " ",
    formFields: [
      {
        label: "Active",
        type: "radio",
        inputs: [
          { name: "Yes", value: "A" },
          { name: "No", value: "I" },
        ],
        name: "status",
        visible: true,
        isLeader: true,
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "Permissions",
        type: role === "LD" ? "select" : "dummy",
        inputs: [
          {
            name:
              !defaultBranchTypeId || defaultBranchTypeId !== 2
                ? "Front Desk"
                : "Groomer",
            value: "FD",
          },
          { name: "Technician", value: "TN" },
          { name: "Doctor", value: "DR" },
          { name: "Leadership", value: "LD" },
        ],
        name: "permission",
        visible: true,
        isLeader: true,
        //disabled: isEdit,
        optionAttribute: { name: "name", value: "value" },
        requiredMessage: "Permission is required",
      },
      {
        label: "First Name",
        type: "input",
        name: "firstName",
        visible: true,
        requiredMessage: "First Name is required",
      },
      {
        label: "Last Name",
        type: "input",
        name: "lastName",
        visible: true,
        requiredMessage: "Last Name is required",
      },
      {
        label: "Designation",
        type: "input",
        name: "title",
        visible: true,
        requiredMessage: "Last Name is required",
      },
      {
        label: "Primary Phone",
        type: "phone",
        placeholder: "Enter Phone",
        name: "mobilePhone",
        visible: true,
      },
      {
        label: "Alt Phone",
        type: "phone",
        placeholder: "Enter Alt Phone",
        name: "altPhone",
        visible: true,
      },
      {
        label: "Email",
        type: "input",
        placeholder: "Enter Email",
        name: "email",
        visible: true,
      },
      {
        label: "Address",
        type: "input",
        placeholder: "Enter Address",
        name: "address1",
        visible: true,
        span: 24,
      },
      {
        label: "Apt / Suite / Unit",
        type: "input",
        placeholder: "Optional",
        name: "address2",
        visible: true,
      },
      {
        label: "City",
        type: "input",
        placeholder: "Enter City",
        name: "city",
        visible: true,
      },
      {
        label: "State",
        type: "select",
        placeholder: "Select State",
        inputs: states,
        name: "stateId",
        visible: true,
        optionAttribute: { name: "stateName", value: "stateId" },
      },
      {
        label: "Zip",
        type: "input",
        placeholder: "Enter Zip",
        name: "zip",
        visible: true,
      },
      {
        label: "Licensed Veterinarian",
        type: "radio",
        visible: !defaultBranchTypeId || defaultBranchTypeId !== 2,

        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "doctor",
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "License #",
        type: inputData?.doctor ? "input" : "dummy",
        name: "license",
        visible: !defaultBranchTypeId || defaultBranchTypeId !== 2,
      },
      {
        label: "Pay Structure",
        type: role === "LD" ? "radio" : "dummy",
        inputs: [
          { name: "Hourly", value: "H" },
          { name: "Salary", value: "S" },
        ],
        name: "pay",
        visible: true,
        isLeader: true,
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: (
          <>
            <Text>Takes Appointment</Text> &nbsp;
            <Tooltip title="By Selecting yes, this person can be booked for appointments and will be viewable on this calendar">
              <QuestionCircleOutlined />
            </Tooltip>
          </>
        ),
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "takeAppt",
        isLeader: true,
        visible: true,
        optionAttribute: { name: "name", value: "value" },
      },
      {
        type: "divider",
        isLeader: true,
        visible: true,
      },
      {
        label: "Adanced Actions",
        type: "action",
        isLeader: true,
        visible: true,
      },
    ],
  },
];

export default StaffCreateEditFormConfig;
