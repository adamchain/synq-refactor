import CommonUtil from "../util/CommonUtil";
import { momentLocal } from "../util/TimeUtil";

const PrintLabelFormConfig = (inputValue) => [
  {
    mainLabel: " ",
    formFields: [
      {
        label: "Dispensable Name",
        type: "input",
        name: "name",
        placeholder: "Enter Dispensable Name",
        fullSize: true,
      },
      {
        label: "Start Date",
        type: "date",
        name: "stDate",
      },
      {
        label: "Strength",
        type: "input",
        name: "strength",
        placeholder: "Optional",
      },
      {
        label: "Refills Remaining",
        type: "input",
        name: "refills",
        disabled: inputValue.disableRefill,
        placeholder: "Set Refill",
      },
      {
        label: "Rx Expiration",
        type: "select",
        name: "inventoryExpirationId",
        // disabled: true,
        inputs: Object.values(CommonUtil.EXPIRATION_FIELD),
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "Expiration Date",
        type: inputValue.expirationType,
        name: "refillExpirationDate",
        value:
          inputValue.expirationType === "text"
            ? inputValue.refillExpirationDate
              ? inputValue.refillExpirationDate.format("MM/DD/YYYY")
              : "None"
            : "",
        fullSize: true,
      },
      // {
      //     label: 'Instruction Template',
      //     type: 'select',
      //     name: 'instructionTemplate',
      //     fullSize: true,
      //     inputs: [{name:"00ST2 - Start taking 2 per day by mouth", value:'00ST2'},{name:"00ST3 - Start taking 2 per day by mouth",value:'00ST3'}],
      //     optionAttribute:{name:"name",value:"value"}

      // },
      {
        label: "Rx Instructions",
        type: "textarea",
        name: "rxInstructions",
        fullSize: true,
      },
      {
        label: "Veterinarian",
        type: "select",
        name: "providerId",
        fullSize: true,
        inputs: inputValue.vets,
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "Lot Number",
        type: "input",
        name: "lotNumber",
      },
      {
        label: "RX Number",
        type: "input",
        name: "rxNumber",
      },
    ],
  },
];

export default PrintLabelFormConfig;
