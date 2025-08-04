const formDefaultInput = (label, name) => ({
  label,
  type: "input",
  name,
  span: 12,
});

const VitalFormConfig = (inputData = {}) => {
  return [
    {
      mainLabel: " ",
      formFields: [
        {
          label: "Status",
          type: "select",
          name: "status",
          span: 24,
          inputs: [
            { name: "Induction", value: 1 },
            { name: "Before Surgery", value: 2 },
            { name: "During Surgery", value: 3 },
            { name: "End Surgery", value: 4 },
            { name: "Extubation", value: 5 },
          ],
          optionAttribute: { name: "name", value: "value" },
          requiredMessage: "Status is required",
        },
        {
          label: "Start Time",
          type: "date",
          name: "stTime",
          span: 12,
          requiredMessage: "Start time is required",
        },
        {
          type: "dummy",
          span: 12,
        },
        {
          label: "Heart Rate",
          type: "input",
          name: ["attr", 1],
          span: 12,
          requiredMessage: "Heart rate is required",
          suffix: "BPM",
        },
        //  formDefaultInput("Heart Rate",["attr",1]),
        formDefaultInput("Oxygen Saturation (Sp O2)", ["attr", 2]),
        formDefaultInput("Systolic Blood Pressure", ["attr", 3]),
        formDefaultInput("Diastolic Blood Pressure", ["attr", 4]),
        formDefaultInput("Mean Arterial Pressure", ["attr", 5]),
        formDefaultInput("Temperature", ["attr", 6]),
        formDefaultInput("IV Fluid Rate", ["attr", 7]),
        formDefaultInput("Gas Level", ["attr", 8]),
        formDefaultInput("Vent Rate", ["attr", 9]),
        formDefaultInput("Mucous Membrane", ["attr", 10]),
        formDefaultInput("Perfusion Index", ["attr", 11]),
        formDefaultInput("Pleth Variability Index", ["attr", 12]),
        formDefaultInput("Mas Oxygen Saturation", ["attr", 13]),
        formDefaultInput("Doppler", ["attr", 14]),
        formDefaultInput("ETCO2", ["attr", 15]),
      ],
    },
  ];
};

export default VitalFormConfig;
