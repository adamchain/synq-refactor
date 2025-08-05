import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import React from "react";
import CommonUtil from "../../util/CommonUtil";

const { Text } = Typography;

const InventoryCreateEditFormConfig = (
  avoidOptionalUnits,
  invData,
  invCatData,
  branchTypeId,
) => [
  {
    mainLabel: " ",
    formFields: [
      {
        label: "Active",
        type: "switch",
        name: "status",
        span: 4,
      },
      {
        label: "Item Type",
        type: "select",
        inputs:
          branchTypeId == 2
            ? [
                { name: "Inventory", value: 1 },
                { name: "Service", value: 2 },
              ]
            : [
                { name: "Inventory", value: 1 },
                { name: "Procedure", value: 2 },
                { name: "Internal Lab", value: 3 },
                { name: "External Lab", value: 4 },
              ],
        name: "type",
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I", "P", "IL", "EL"],
        span: 10,
        requiredMessage: "Item Type is required",
      },
      {
        label: "Item Code",
        type: "input",
        name: "code",
        itemType: ["I", "P", "IL", "EL"],
        span: 10,
        requiredMessage: "Item Code is required",
      },
      {
        label: "Product Name",
        type: "input",
        name: "pName",
        itemType: ["I", "IL", "EL"],
        span: 24,
        requiredMessage: "Product Name is required",
      },

      {
        label: branchTypeId == 2 ? "Service Name" : "Procedure Name",
        type: "input",
        name: "pName",
        itemType: ["P"],
        span: 24,
        requiredMessage: "Procedure Name is required",
      },

      {
        label: "Category",
        type: "category-select",
        inputs: invCatData,
        name: "categoryId",
        optionAttribute: { name: "name", value: "categoryId" },
        itemType: ["I", "P", "IL", "EL"],
        span: 24,
        requiredMessage: "Category is required",
      },
      {
        label: "Vendor",
        type: "input",
        name: "vendor",
        itemType: ["I", "IL", "EL"],
      },
      {
        label: "Manufacturer",
        type: "input",
        name: "mfr",
        disabled: avoidOptionalUnits.showLots,
        itemType: ["I", "IL", "EL"],
      },

      // {
      //     label: <><Text>Link Inventory Item</Text> &nbsp;<Tooltip title="If linked, the inventory item will automatically be added upon adding the procedure"><QuestionCircleOutlined/></Tooltip></>,
      //     type: 'radio',
      //     name: 'linkInventory',
      //     inputs: [{name:'Yes',value:true}, {name:'No',value:false}],
      //     optionAttribute:{name:"name",value:"value"},
      //     itemType:["P"]
      // },
      // {
      //     label: 'Linked Item',
      //     type: avoidOptionalUnits.showLinkedItem?'select':'dummy',
      //     placeholder: 'Search by Name',
      //     onSearch : true,
      //     inputs: invData,
      //     name: 'inventoryId',
      //     span : 24,
      //     optionAttribute:{name:"pName",value:"id"},
      //     itemType:["P"]
      // },
      {
        label: "Measurement",
        type: "select",
        placeholder: "Select",
        inputs: [
          { name: "Bag", value: 10 },
          { name: "Bottle", value: 1 },
          { name: "Box", value: 7 },
          { name: "Can", value: 12 },
          { name: "Capsule", value: 8 },
          { name: "Dose", value: 18 },
          { name: "Each", value: 2 },
          { name: "Gallon", value: 14 },
          { name: "Gram", value: 5 },
          { name: "mL", value: 6 },
          { name: "Ounce", value: 4 },
          { name: "Package", value: 17 },
          { name: "Packet", value: 15 },
          { name: "Roll", value: 13 },
          { name: "Tablet", value: 9 },
          { name: "Tub", value: 3 },
          { name: "Tube", value: 11 },
          { name: "Vial", value: 16 },
        ],
        name: ["detail", "measure"],
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I"],
        requiredMessage: "Measurement is required",
      },
      {
        label: (
          <>
            <Text>Enable Lot Control</Text> &nbsp;
            <Tooltip title="Enables a utility that controls the on-hand, cost and price of the item at an individual lot level">
              <QuestionCircleOutlined />
            </Tooltip>
          </>
        ),
        type: "radio",
        name: ["detail", "useLots"],
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I"],
      },
      {
        label: "On Hand",
        type: "on-hands",
        name: "lots",
        itemType: ["I"],
        placeholder: 0,
      },
      {
        label: (
          <>
            <Text>Low Stock Override</Text> &nbsp;
            <Tooltip title="This overides the default quantity trigger for low stock alerts. Leave blank for default">
              <QuestionCircleOutlined />
            </Tooltip>
          </>
        ),
        type: "input",
        inputType: "number",
        name: ["detail", "alertQty"],
        itemType: ["I"],
      },
      {
        label: "Description for Website",
        type: "textarea",
        name: "description",
        itemType: ["P"],
        span: 24,
      },
      {
        label: "Service Duration",
        type: "input",
        inputType: "number",
        name: "duration",
        placeholder: "(mins)",
        itemType: ["P"],
      },
      { type: "divider", name: "divider", span: 24 },
      {
        label: "Cost",
        type: "input",
        name: "cost",
        prefix: "$",
        disabled: avoidOptionalUnits.showLots,
        inputType: "number",
        itemType: ["I", "P", "IL", "EL"],
        requiredMessage: "Cost is required",
      },
      {
        label: "Retail Price Method",
        type: "radio",
        inputs: [
          { name: "Price", value: "$" },
          { name: "Markup %", value: "%" },
        ],
        name: "rMethod",
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I", "P", "IL", "EL"],
      },
      {
        label: "Price",
        type: "input",
        name: "price",
        disabled: avoidOptionalUnits.showLots || !avoidOptionalUnits.markup,
        prefix: "$",
        inputType: "number",
        itemType: ["I", "P", "IL", "EL"],
        requiredMessage: avoidOptionalUnits.markup ? "Price is required" : null,
      },
      {
        label: "Markup Percent",
        type: avoidOptionalUnits.markup ? "dummy" : "input",
        name: "markPer",
        suffix: "%",
        inputType: "number",
        itemType: ["I", "P", "IL", "EL"],
      },
      {
        label: "Min Price",
        type: "input",
        name: "minPrice",
        prefix: "$",
        inputType: "number",
        itemType: ["I", "P", "IL", "EL"],
      },
      {
        label: "Max Price",
        type: "input",
        name: "maxPrice",
        prefix: "$",
        inputType: "number",
        itemType: ["I", "P", "IL", "EL"],
      },
      {
        label: "Service Fee",
        type: "input",
        name: "sFee",
        prefix: "$",
        inputType: "number",
        itemType: ["I", "P", "IL", "EL"],
        placeholder: "0.00",
      },
      {
        label: "Sales Tax",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "sTax",
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I", "P", "IL", "EL"],
      },
      {
        label: "Discount",
        type: "radio",
        inputs: [
          { name: "None", value: "" },
          { name: "$ Off", value: "$" },
          { name: "% Off", value: "%" },
        ],
        name: "discountType",
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I", "P", "IL", "EL"],
      },
      {
        label: "Discount Amount",
        type: avoidOptionalUnits.discountType ? "input" : "escape",
        name: "discount",
        ...(avoidOptionalUnits.discountType === "%"
          ? { suffix: "%" }
          : { prefix: "$" }),
        inputType: "number",
        itemType: ["I", "P", "IL", "EL"],
      },

      { type: "divider", span: 24, itemType: ["I"], hidden: branchTypeId == 2 },
      {
        label: "Vaccine",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "isVaccine",
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I"],
        hidden: branchTypeId == 2,
      },
      {
        label: "Rabies Vaccine",
        type: avoidOptionalUnits.vaccineUnits ? "escape" : "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: ["vaccine", "rabies"],
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I"],
      },
      {
        label: "Vaccine Type",
        type: avoidOptionalUnits.vaccineUnits ? "escape" : "select",
        inputs: [
          { name: "Killed", value: 1 },
          { name: "Live", value: 2 },
          { name: "Modified Live", value: 3 },
          { name: "Recombinant", value: 4 },
        ],
        name: ["vaccine", "type"],
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I"],
        requiredMessage: "Vaccine Type is required",
      },
      {
        label: "Vaccine Dose Type",
        type: avoidOptionalUnits.vaccineUnits ? "escape" : "select",
        inputs: [
          { name: "Initial", value: "I" },
          { name: "Booster", value: "B" },
        ],
        name: ["vaccine", "dose"],
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I"],
        requiredMessage: "Vaccine Dose Type is required",
      },

      //    {
      //     label: 'Vaccine Species',
      //     type: avoidOptionalUnits.vaccineUnits?'escape':'select',
      //     inputs: allSpecies.speciesList,
      //     optionAttribute:{name:"familyName",value:"familyId"},
      //     name: ['vaccine','species'],
      //     itemType:["I"]

      // },
      {
        label: "Vaccine Expiration",
        type: avoidOptionalUnits.vaccineUnits ? "escape" : "select",
        inputs: Object.values(CommonUtil.EXPIRATION_FIELD),
        name: ["vaccine", "period"],
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I"],
        requiredMessage: "Vaccine Expiration is required",
      },

      {
        label: "Expiry Date",
        type: avoidOptionalUnits.vaccineUnits
          ? "dummy"
          : avoidOptionalUnits.showVaccineExpiry
            ? "date"
            : "dummy",
        name: ["vaccine", "expiryDate"],
        itemType: ["I"],
      },
      {
        label: "Vaccine Serial #",
        type: avoidOptionalUnits.vaccineUnits ? "escape" : "input",
        name: ["vaccine", "serial"],
        itemType: ["I"],
        span: 24,
        requiredMessage: "Vaccine serial # is required",
      },
      {
        label: "Lot #",
        type: avoidOptionalUnits.vaccineUnits ? "escape" : "input",
        name: ["vaccine", "lot"],
        itemType: ["I"],
        //requiredMessage: "Lot # is required",
        disabled: avoidOptionalUnits.showLots,
      },
      {
        label: "Lot Expiration",
        type: avoidOptionalUnits.vaccineUnits ? "escape" : "date",
        name: ["vaccine", "lotExpirationDate"],
        itemType: ["I"],
        disabled: avoidOptionalUnits.showLots,
      },
      {
        label: "USDA Licensing",
        type: avoidOptionalUnits.vaccineUnits ? "escape" : "select",
        inputs: [
          { name: "1 Month", value: 0 },
          { name: "1 Year", value: 1 },
          { name: "2 Year", value: 2 },
          { name: "3 Year", value: 3 },
          { name: "4 Year", value: 4 },
        ],
        name: ["vaccine", "usdaLicensing"],
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I"],
        requiredMessage: "USDA Licensing is required",
      },
      {
        label: "Animal Control Licensing",
        type: avoidOptionalUnits.vaccineUnits ? "escape" : "select",
        inputs: [
          { name: "1 Month", value: 0 },
          { name: "1 Year", value: 1 },
          { name: "2 Year", value: 2 },
          { name: "3 Year", value: 3 },
          { name: "4 Year", value: 4 },
        ],
        name: ["vaccine", "animalControlLicensing"],
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I"],
        requiredMessage: "Animal Control Licensing is required",
      },

      { type: "divider", span: 24, itemType: ["I"], hidden: branchTypeId == 2 },
      {
        label: "Rx Prescription",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "isRxPrescription",
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I"],
        hidden: branchTypeId == 2,
      },
      {
        label: "Strength",
        type: avoidOptionalUnits.rxUnits ? "escape" : "input",
        name: ["rxPrescription", "strength"],
        itemType: ["I"],
      },
      {
        label: "Rx Expiration Period",
        type: avoidOptionalUnits.rxUnits ? "escape" : "select",
        placeholder: "Select",
        inputs: [
          { name: "2 Weeks", value: 1 },
          { name: "90 Days", value: 2 },
          { name: "6 months", value: 3 },
          { name: "9 months", value: 4 },
          { name: "1 Year", value: 5 },
          { name: "2 Years", value: 6 },
          { name: "3 Years", value: 7 },
          { name: "Other", value: 8 },
        ],
        name: ["rxPrescription", "expirationId"],
        // disabled:avoidOptionalUnits.showLots,
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I"],
      },
      {
        label: "Other Rx Expiration",
        type: avoidOptionalUnits.rxUnits
          ? "dummy"
          : avoidOptionalUnits.showRxExpiryDate
            ? "input"
            : "dummy",
        name: ["rxPrescription", "expirationOtherDays"],
        suffix: "Days",
        // disabled:avoidOptionalUnits.showLots,
        itemType: ["I"],
      },
      {
        label: "Lot Number",
        type: avoidOptionalUnits.rxUnits ? "dummy" : "input",
        name: ["rxPrescription", "lot"],
        itemType: ["I"],
        disabled: avoidOptionalUnits.showLots,
      },
      {
        label: "Lot Expiration",
        type: avoidOptionalUnits.rxUnits ? "dummy" : "date",
        name: ["rxPrescription", "lotExpirationDate"],
        itemType: ["I"],
        disabled: avoidOptionalUnits.showLots,
      },
      {
        label: "Default Dosage Instructions",
        type: avoidOptionalUnits.rxUnits ? "escape" : "textarea",
        placeholder: "Add a Personalized Message",
        name: ["rxPrescription", "instructions"],
        itemType: ["I"],
        span: 24,
      },
      { type: "divider", span: 24, itemType: ["I"], hidden: branchTypeId == 2 },

      // {
      //     label: 'Item Dispensable',
      //     type: 'radio',
      //     inputs: [{name:'Yes',value:true}, {name:'No',value:false}],
      //     name: ['detail','dispensable'],
      //     optionAttribute:{name:"name",value:"value"},
      //     itemType:["I"]
      // },
      {
        label: "Controlled Substance",
        type: "select",
        placeholder: "Select",
        inputs: [
          { name: "None", value: 0 },
          { name: "Schedule I", value: 1 },
          { name: "Schedule II", value: 2 },
          { name: "Schedule III", value: 3 },
        ],
        name: ["detail", "cSub"],
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I"],
        hidden: branchTypeId == 2,
      },
      {
        label: "Is a Microchip?",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: ["detail", "microchip"],
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I"],
        hidden: branchTypeId == 2,
      },
      { type: "divider", span: 24, itemType: ["P"], hidden: branchTypeId == 2 },
      {
        label: (
          <>
            <Text>Spay or Neuter</Text> &nbsp;
            <Tooltip title="If yes, this procedure will alter patient's sex">
              <QuestionCircleOutlined />
            </Tooltip>
          </>
        ),
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "alterSex",
        optionAttribute: { name: "name", value: "value" },
        itemType: ["P"],
        hidden: branchTypeId == 2,
      },
      // {
      //     label: 'Vaccine',
      //     type: 'radio',
      //     inputs: [{name:'Yes',value:true}, {name:'No',value:false}],
      //     name: 'isVaccine',
      //     optionAttribute:{name:"name",value:"value"},
      //     itemType:["P"]
      // },
      {
        label: (
          <>
            <Text>Euthanasia</Text> &nbsp;
            <Tooltip title="If yes, this procedure will update pet status to euthanized and remove automated communications.">
              <QuestionCircleOutlined />
            </Tooltip>
          </>
        ),
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "euthanasia",
        optionAttribute: { name: "name", value: "value" },
        itemType: ["P"],
        hidden: branchTypeId == 2,
      },

      { type: "divider", span: 24, itemType: ["I", "P", "IL", "EL"] },
      {
        label: "Reminders",
        type: "reminder",
        name: "reminders",
        itemType: ["I", "P", "IL", "EL"],
      },
      { type: "divider", span: 24, itemType: ["I", "P", "IL", "EL"] },
      {
        label: "Hide on Invoice",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "hideOnInvoice",
        optionAttribute: { name: "name", value: "value" },
        itemType: ["I", "P", "IL", "EL"],
      },
      {
        label: "Show on Website",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "showonwebsite",
        optionAttribute: { name: "name", value: "value" },
        itemType: ["P"],
      },
      {
        label: "Show Duration on Website",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "showduration",
        optionAttribute: { name: "name", value: "value" },
        itemType: ["P"],
      },
      {
        label: "Show Price on Website",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "showprice",
        optionAttribute: { name: "name", value: "value" },
        itemType: ["P"],
      },
      {
        label: "Save as appointment type",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "saveAppointment",
        optionAttribute: { name: "name", value: "value" },
        itemType: ["P"],
      },

      //     {
      //         label: 'Internal Reminders',
      //         type: 'radio',
      //         inputs: [{name:'Yes',value:true}, {name:'No',value:false}],
      //         name: 'isInternalReminders',
      //         optionAttribute:{name:"name",value:"value"},
      //         itemType:["P","IL","EL"],
      //     },
      //     ...reminderFormItems("internalReminders","irUnits",avoidOptionalUnits),
      //     {type:"divider", span:24,itemType:["P","IL","EL"],
      // },
      //     {
      //         label: 'Callback Reminders',
      //         type: 'radio',
      //         inputs: [{name:'Yes',value:true}, {name:'No',value:false}],
      //         name: 'isCallbackReminders',
      //         optionAttribute:{name:"name",value:"value"},
      //         itemType:["P","IL","EL"],
      //     },
      //     ...reminderFormItems("callbackReminders","crUnits",avoidOptionalUnits),
      //     {type:"divider", span:24,itemType:["P","IL","EL"],
      // },
      { type: "divider", span: 24, itemType: ["I", "P", "IL", "EL"] },
      {
        label: "Customer Invoice Comments",
        type: "textarea",
        placeholder: "Add a Personalized Message",
        name: "invoiceComments",
        itemType: ["I", "P", "IL", "EL"],
        span: 24,
      },
    ],
  },
];

const reminderFormItems = (name, units, avoidOptionalUnits) => {
  return [
    {
      label: "Reminder Type",
      type: avoidOptionalUnits[units] ? "escape" : "select",
      //inputs: [{name:'Phone Call',value:1}, {name:'Manual Email',value:2},{name:'Task (Internal)',value:3}, {name:'Automated Email',value:4},{name:'Automated Text',value:5}, {name:'Callback',value:6},{name:'General',value:7}, {name:'Task',value:8},{name:'Wellness',value:9}],
      inputs: [
        { name: "Phone Call", value: 1 },
        { name: "Callback", value: 6 },
        { name: "General", value: 7 },
        { name: "Task", value: 8 },
        { name: "Wellness", value: 9 },
      ],
      name: [name, "reminderType"],
      optionAttribute: { name: "name", value: "value" },
      itemType: ["I", "P", "IL", "EL"],
    },
    {
      label: "Reminder Name",
      type: avoidOptionalUnits[units] ? "escape" : "input",
      placeholder: "Enter Reminder Name",
      name: [name, "name"],
      itemType: ["I", "P", "IL", "EL"],
      span: 24,
    },
    {
      label: "Reminder Due",
      type: avoidOptionalUnits[units] ? "escape" : "select",
      inputs: [
        { name: "Next Day", value: 1 },
        { name: "3 Days", value: 3 },
        { name: "1 Week", value: 7 },
        { name: "2 Weeks", value: 14 },
      ],
      name: [name, "reminderDue"],
      optionAttribute: { name: "name", value: "value" },
      itemType: ["I", "P", "IL", "EL"],
    },
    {
      type: avoidOptionalUnits[units] ? "escape" : "dummy",
      itemType: ["I", "P", "IL", "EL"],
    },
    {
      label: "Alert Starts",
      type: avoidOptionalUnits[units] ? "escape" : "select",
      inputs: [
        { name: "None", value: 0 },
        { name: "1 Day Before", value: 1 },
        { name: "3 Days Before", value: 3 },
        { name: "1 Week Before", value: 7 },
      ],
      name: [name, "alertStarts"],
      optionAttribute: { name: "name", value: "value" },
      itemType: ["I", "P", "IL", "EL"],
    },
    {
      type: avoidOptionalUnits[units] ? "escape" : "dummy",
      itemType: ["I", "P", "IL", "EL"],
    },
    {
      label: "Stop Alerts",
      type: avoidOptionalUnits[units] ? "escape" : "select",
      inputs: [
        { name: "Never", value: 0 },
        { name: "1 Day After", value: 1 },
        { name: "3 Days After", value: 3 },
        { name: "1 Week After", value: 7 },
      ],
      name: [name, "stopAlerts"],
      optionAttribute: { name: "name", value: "value" },
      itemType: ["I", "P", "IL", "EL"],
    },
    {
      type: avoidOptionalUnits[units] ? "escape" : "dummy",
      itemType: ["I", "P", "IL", "EL"],
    },
    {
      label: "Assigned to",
      type: avoidOptionalUnits[units] ? "escape" : "select",
      inputs: [],
      name: [name, "assignedTo"],
      optionAttribute: { name: "name", value: "value" },
      itemType: ["I", "P", "IL", "EL"],
      span: 24,
    },
  ];
};

export default InventoryCreateEditFormConfig;
