const PatientCreateEditFormConfig = (inputData) => [
  {
    mainLabel: " ",
    formFields: [
      {
        label: "Patient Name",
        type: "input",
        name: "patientName",
        requiredMessage: "Patient Name is required",
      },
      {
        label: "Client Last Name",
        type: "input",
        name: "clientLastName",
        disabled: true,
      },
      {
        label: "Date of Birth",
        type: "date",
        name: "dob",
        requiredMessage: "Date of Birth is required",
      },
      {
        label: "Status",
        type: "select",
        inputs: inputData.statusList,
        name: "statusId",
        optionAttribute: {
          name: "patientStatusName",
          value: "patientStatusId",
        },
        requiredMessage: "Status is required",
      },
      {
        label: "Animal Family",
        type: "select",
        inputs: inputData.familyList,
        name: "familyId",
        requiredMessage: "Animal Family is required",
        optionAttribute: { name: "familyName", value: "familyId" }, //provide Name and Value
      },
      {
        label: "Species",
        type: "select",
        inputs: inputData.speciesList,
        name: "speciesId",
        requiredMessage: "Species is required",
        optionAttribute: { name: "speciesName", value: "speciesId" },
      },
      {
        label: "Breed",
        type: "select",
        inputs: inputData.breedList,
        name: "breedId",
        requiredMessage:
          inputData.breedList?.length > 0 ? "Breed is required" : "",
        optionAttribute: { name: "breedName", value: "breedId" },
      },
      {
        label: "Mixed Breed",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "mixedBreed",
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "Sex",
        type: "select",
        inputs: [
          { name: "Male", value: "M" },
          { name: "Female", value: "F" },
          { name: "Male - Neutered", value: "MN" },
          { name: "Female - Spayed", value: "FS" },
        ],
        name: "sexCd",
        requiredMessage: "Gender is required",
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "Color",
        type: "select",
        inputs: inputData.colorList,
        name: "colorId",
        //requiredMessage: "Color is required",
        optionAttribute: { name: "patientColorName", value: "patientColorId" },
      },
      {
        type: "divider",
      },
      {
        label: "Weight",
        type: "weight",
        name: "weight",
        requiredMessage: "Weight is required",
        weightTypeField: {
          type: "select",
          inputs: [
            { value: "LBS" },
            { value: "KG" },
            { value: "G" },
            { value: "OZ" },
          ],
          name: "weightUnitCd",
          optionAttribute: { name: "value", value: "value" },
        },
      },
      // {
      //     label: 'Weight Unit',
      //     type: 'radio',
      //     inputs: ['LBS','KG','G','OZ'],
      //     name: 'weightUnitCd'
      // },
      {
        label: "Weight Estimated?",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "weightEstimated",
        optionAttribute: { name: "name", value: "value" },
      },
      {
        type: "divider",
      },
      {
        label: "Allergies",
        type: "textarea",
        placeholder: "Add Allergy Details",
        name: ["freeForm", "AG"],
      },

      {
        label: "Rabies Tag #",
        type: "input",
        name: ["freeForm", "RT"],
      },
      {
        label: "Microchip #",
        type: "input",
        name: ["freeForm", "MC"],
      },
      {
        label: "Tattoo",
        type: "input",
        name: ["freeForm", "TT"],
      },
      {
        label: "Markings",
        type: "input",
        name: ["freeForm", "MK"],
      },
      {
        label: "Behavioral Alerts",
        type: "textarea",
        placeholder: "Behavioral Alerts",
        name: ["freeForm", "BA"],
      },
      {
        label: "Others Authorized to Initiate Care",
        type: "textarea",
        placeholder: "Others Authorized to Initiate Cares",
        name: ["freeForm", "OA"],
      },
      {
        type: "divider",
      },
      {
        label: "Primary Doctor",
        type: "select",
        inputs: inputData.doctorsList,
        name: "pyDoctorId",
        optionAttribute: { name: "fullName", value: "userId" },
      },
      {
        type: "divider",
      },
      {
        label: "Has Insurance",
        type: "radio",
        inputs: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        name: "insurance",
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "Insurance Provider",
        type: inputData.insurance ? "input" : "dummy",
        name: "insuranceProvider",
        requiredMessage: "Insurance Provider is required",
      },
    ],
  },
];

export default PatientCreateEditFormConfig;
