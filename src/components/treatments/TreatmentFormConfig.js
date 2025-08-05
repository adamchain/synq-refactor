import PriceUtil from "./../util/PriceUtil";

const TreatmentFormConfig = (inputData) => {
  if (inputData.isVaccine) {
    return [
      {
        label: inputData.typeLabel("Vaccine"),
        type: inputData.doesExist ? "select" : "input",
        placeholder: inputData.doesExist
          ? "Select Vaccine"
          : "Please Enter Vaccine",
        span: 24,
        name: "inventoryId",
        inputs: inputData.inventoryData,
        optionAttribute: { name: "pName", value: "id" },
        requiredMessage: "Vaccine is required",
      },
      {
        label: inputData.administerdLabel("Administered"),
        type: "date",
        ftype: inputData.isVaccine
          ? (current) => current.valueOf() > Date.now()
          : false,
        name: "administered",
        span: 12,
        requiredMessage: "Administered date is required",
      },
      {
        label: "Vaccine Expiration",
        type: "select",
        name: "expirationSelect",
        span: 12,
        inputs: [
          { name: "1 Year", value: 1 },
          { name: "2 Year", value: 2 },
          { name: "3 Year", value: 3 },
          { name: "Other", value: "OT" },
        ],
        optionAttribute: { name: "name", value: "value" },
        requiredMessage: "Vaccine expiration is required",
      },
      {
        label: "Expiration",
        type: inputData.isExpiryManual ? "date" : "",
        name: "expiry",
        span: 12,
        value: inputData.expiryDate
          ? inputData.expiryDate.format("MM/DD/YYYY")
          : "",
      },
      inputData.doesExist
        ? {
            label: "Price",
            name: "price",
            span: 12,
            value: inputData.itemPrice
              ? PriceUtil.dollarValue(inputData.itemPrice)
              : "",
          }
        : {},
      // inputData.doesExist?{
      //     label: 'Add to Invoice',
      //     type: 'radio',
      //     name: 'addToInvoice',
      //     span: 12,
      //     inputs: [{name:"Yes",value:true},{name:"No",value:false}],
      //     optionAttribute:{name:"name",value:"value"}
      // }:{}]
    ];
  }
  return [
    {
      label: inputData.typeLabel("Medication"),
      type: inputData.doesExist ? "select" : "input",
      placeholder: inputData.doesExist
        ? "Select Medication"
        : "Please Enter Medication",
      name: "inventoryId",
      span: 24,
      inputs: inputData.inventoryData,
      optionAttribute: { name: "pName", value: "id" },
      requiredMessage: "Medication is required",
    },
    {
      label: inputData.administerdLabel("Administered"),
      type: "date",
      ftype: (current) => current.valueOf() > Date.now(),
      name: "administered",
      span: 12,
      requiredMessage: "Administered date is required",
    },
    {
      label: "Status",
      type: "select",
      name: "status",
      span: 12,
      inputs: [
        { name: "Active", value: "A" },
        { name: "Inactive", value: "I" },
      ],
      optionAttribute: { name: "name", value: "value" },
      requiredMessage: "Status  is required",
    },
    inputData.doesExist
      ? {
          label: "Price",
          name: "price",
          span: 12,
          value: inputData.itemPrice
            ? PriceUtil.dollarValue(inputData.itemPrice)
            : "",
        }
      : {},
    // inputData.doesExist?{
    //     label: 'Add to Invoice',
    //     type: 'radio',
    //     name: 'addToInvoice',
    //     span: 12,
    //     inputs: [{name:"Yes",value:true},{name:"No",value:false}],
    //     optionAttribute:{name:"name",value:"value"}
    // }:{}
  ];
};

export default TreatmentFormConfig;
