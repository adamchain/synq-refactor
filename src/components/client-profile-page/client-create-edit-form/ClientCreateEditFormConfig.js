const ClientCreateEditFormConfig = (states) => [
  {
    mainLabel: "Primary Contact",
    formFields: [
      {
        label: "Active",
        type: "radio",
        inputs: [
          { name: "Yes", value: "A" },
          { name: "No", value: "N" },
        ],
        name: "clientStatus",
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "First Name",
        type: "input",
        placeholder: "Enter First Name",
        name: ["primary", "firstName"],
        requiredMessage: "First Name is required",
      },
      {
        label: "Last Name",
        type: "input",
        placeholder: "Enter Last Name",
        name: ["primary", "lastName"],
        requiredMessage: "Last Name is required",
      },
      {
        label: "Address",
        type: "address",
        placeholder: "Enter Address",
        name: ["primary", "address1"],
      },
      {
        label: "Apt / Suite / Unit",
        type: "input",
        placeholder: "Optional",
        name: ["primary", "address2"],
      },
      {
        label: "City",
        type: "input",
        placeholder: "Enter City",
        name: ["primary", "city"],
      },
      {
        label: "State",
        type: "select",
        inputs: Object.values(states),
        name: ["primary", "stateId"],
        optionAttribute: { name: "stateName", value: "stateId" },
      },
      {
        label: "Zip",
        type: "input",
        placeholder: "Enter Zip",
        name: ["primary", "zipCode"],
      },
      {
        label: "Primary Phone",
        type: "phone",
        placeholder: "000-000-0000",
        name: ["phones", "PH"],
        requiredMessage: "Phone is required",
      },
      {
        label: "Mobile Phone",
        type: "phone",
        placeholder: "000-000-0000",
        name: ["phones", "PM"],
      },
      {
        label: "Alt Phone",
        type: "phone",
        placeholder: "000-000-0000",
        name: ["phones", "PA"],
      },
      {
        label: "Preferred Phone",
        type: "select",
        inputs: [
          { name: "None", value: "none" },
          { name: "Primary Phone", value: "PH" },
          { name: "Mobile", value: "PM" },
          { name: "Alt", value: "PA" },
        ],
        name: "prefferedPhone",
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "Email",
        type: "input",
        placeholder: "Enter Email",
        name: ["primary", "email"],
        requiredMessage: "Email is required",
      },
      {
        label: "Ok to Email",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "allowEmail",
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "Ok to Text",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "allowText",
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "Opt in Client Reminders",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "optInReminder",
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "Client Alerts",
        type: "textarea",
        placeholder: "Enter Client Alerts",
        name: "clientAlerts",
      },
    ],
  },
  {
    mainLabel: "Secondary Contact",
    formFields: [
      {
        label: "First Name",
        type: "input",
        placeholder: "FirstName",
        name: ["secondary", "firstName"],
      },
      {
        label: "Last Name",
        type: "input",
        placeholder: "LastName",
        name: ["secondary", "lastName"],
      },
      {
        label: "Primary Phone",
        type: "input",
        placeholder: "(000) 000-0000",
        name: ["phones", "SM"],
      },
      {
        label: "Alt Phone",
        type: "input",
        placeholder: "(000) 000-0000",
        name: ["phones", "SA"],
      },
      {
        label: "Secondary Contact Email",
        type: "input",
        placeholder: "yourname@domain.com",
        name: ["secondary", "email"],
      },
    ],
  },
  {
    mainLabel: "Referrals & Discounts",
    formFields: [
      // {
      //     label: 'Referral Company',
      //     type: 'input',
      //     placeholder: 'Enter City',
      //     name: ['discount','referralName']
      // },
      {
        label: "Referrer Name",
        type: "input",
        placeholder: "Enter Name",
        name: ["discount", "referrerName"],
      },
      {
        label: "Discount Name",
        type: "input",
        placeholder: "Enter Discount Name",
        name: ["discount", "name"],
      },
      {
        label: "Discount Type",
        type: "select",
        inputs: [
          { name: "% Off", value: "%" },
          { name: "$ Off", value: "$" },
        ],
        name: ["discount", "type"],
        placeholder: "Select Type",
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "Discount Amount",
        type: "discount",
        placeholder: "Enter Amount",
        name: ["discount", "amount"],
      },
      // {
      //     label: 'Status',
      //     type: 'select',
      //     inputs: [{name:"% Off", value:"%"},{name:"$ Off",value:"$"}],
      //     name: ['discount','status'],
      //     optionAttribute:{name:"name",value:"value"}
      // },
      {
        label: "Tax Exempt",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "taxExempt",
        optionAttribute: { name: "name", value: "value" },
      },
    ],
  },
  {
    mainLabel: "Billing Info",
    formFields: [
      {
        label: "Credit Card",
        name: "creditCard",
        type: "card",
      },
    ],
  },
];

export default ClientCreateEditFormConfig;
