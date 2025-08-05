import CommonUtil from "../util/CommonUtil";

const showMeValues = {
  AR: ["Accounts with credit", "Open Invoices"],
  BI: ["Inactive Inventory"],
  I: ["Inactive"],
  U: ["Items with zero usage in totals", "Totals", "Transactions"],
};

const groupByValues = {
  AR: ["Provider"],
  ES: ["Provider"],
};

const ReportsFormConfig = (formRequiredData, summaryValues, es) => [
  {
    label: "Type",
    type: "select",
    name: "reportType",
    span: 24,
    inputs: Object.values(CommonUtil.REPORT_TYPES),
    optionAttribute: { name: "name", value: "formValue" },
  },
  {
    label: "Report Date",
    type: "date-range",
    name: "reportDate",
    span: 24,
    required: true,
    allowed: ["AR", "U", "ES", "ST", "V"],
  },
  {
    label: "Name",
    type: "input",
    name: "name",
    requiredMessage: "Name is required",
    span: 24,
  },
  {
    label: "Minimum Balance",
    type: "input",
    inputType: "number",
    prefix: "$",
    precision: 2,
    name: "minimumBalance",
    span: 24,
    allowed: ["AR"],
  },
  // {
  //     label: 'Client Status',
  //     type: 'select',
  //     name: 'clientStatus',
  //     inputs:[],
  //     span:24,
  //     optionAttribute:{name:"name",value:"value"},
  //     allowed:["AR"]
  // },
  // {
  //     label: 'Reciept Number',
  //     type: 'input',
  //     name: 'recieptNumber',
  //     span:24,
  //     allowed:["ES"]
  // },
  // {
  //     label: 'Staff',
  //     type: 'input',
  //     name: 'staff',
  //     span:24,
  //     allowed:["ST"]
  // },
  // {
  //     label: 'Filter Report By',
  //     type: 'radio',
  //     name: 'filterBy',
  //     inputs: [{name:"Date Created",value:"DC"},{name:"Deposit Date",value:"DD"}],
  //     optionAttribute:{name:"name",value:"value"},
  //     span:24,
  //     allowed:["ST"]
  // },
  // {
  //     label: 'Species',
  //     type: 'select',
  //     name: 'species',
  //     inputs:[],
  //     optionAttribute:{name:"name",value:"value"},
  //     span:24,
  //     allowed:["V"]
  // },
  // {
  //     label: 'Client',
  //     type: 'select',
  //     name: 'client',
  //     inputs:[],
  //     optionAttribute:{name:"name",value:"value"},
  //     span:24,
  //     allowed:["V"]
  // },
  // {
  //     label: 'Vaccine',
  //     type: 'vaccine',
  //     name: 'vaccine',
  //     inputs:[{id:1,name:"Vaccine 1"},{id:2,name:"Vaccine 2"},{id:3,name:"Vaccine 3"}],
  //     span:24,
  //     allowed:["V"]
  // },
  {
    label: "Summary",
    type: "round-checks",
    name: "summary",
    inputs: formRequiredData.reportType === "ES" ? es : summaryValues,
    span: 24,
    allowed: ["ES", "ST"],
  },
  {
    label: "Include Breakdown",
    type: "round-checks",
    name: "includeBreakdown",
    span: 24,
    inputs: summaryValues,
    allowed: [],
  },
  {
    label: "Include",
    type: "round-checks",
    name: "types",
    span: 24,
    inputs: [
      "Inventory",
      "Procedure",
      "Internal Labs",
      "External Labs",
      "Package",
    ],
    allowed: ["BI"],
  },
  {
    label: "Show Also",
    type: "round-checks",
    name: "showMe",
    inputs: showMeValues[formRequiredData.reportType] ?? [],
    span: 24,
    allowed: ["BI", "I", "U"],
  },

  // {
  //     label: 'Group By',
  //     type: 'round-checks',
  //     name: 'groupBy',
  //     inputs:groupByValues[formRequiredData.reportType]??[],
  //     span:24,
  //     allowed:["ES"]
  // }
];

export default ReportsFormConfig;
