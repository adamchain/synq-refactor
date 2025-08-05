const MedicationFormConfig = (inputData) => {
  return [
    {
      label: "Item Type",
      type: "select",
      name: "inventory",
      span: 24,
      inputs: inputData.inventoryData,
      optionAttribute: { name: "pName", value: "id" },
      requiredMessage: "Item Type is required",
    },
    {
      label: "Dose",
      type: "input",
      name: "dose",
      placeholder: "Enter Dose",
      span: 12,
      requiredMessage: "Dose is required",
    },
    {
      label: "Bottle #",
      type: "input",
      name: "bottle",
      placeholder: "Enter Bottle #",
      span: 12,
    },
    {
      label: "Concentration",
      type: "input",
      name: "concentration",
      placeholder: "Enter Concentration",
      span: 12,
      requiredMessage: "Concentration is required",
    },
    {
      label: "Volume",
      type: "input",
      name: "volume",
      placeholder: "Enter Volume",
      span: 12,
      requiredMessage: "Volume is required",
    },
    {
      label: "Route",
      type: "select",
      name: "route",
      span: 12,
      inputs: [
        { name: "IV (Intravenous)", value: 1 },
        { name: "IM (Intramuscular)", value: 2 },
        { name: "Oral (Per OS)", value: 3 },
        { name: "Subcutaneous", value: 4 },
        { name: "Transdermal", value: 5 },
      ],
      optionAttribute: { name: "name", value: "value" },
      requiredMessage: "Route is required",
    },
  ];
};

export default MedicationFormConfig;
