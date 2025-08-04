import React from "react";
import {
  AssesmentIcon,
  ObjectiveIcon,
  PlanIcon,
  SmallProcedureIcon,
  SubjectiveIcon,
  VitalsIcon,
} from "../util/SvgUtil";

const AppointmentDetailsFormConfig = (branchTypeId) => [
  {
    mainLabel: "Vitals",
    maninIcon: <VitalsIcon />,
    formFields: [
      {
        label: "Weight",
        type: "number",
        placeholder: "Enter Weight",
        name: ["numeric", 6],
        history: (data) =>
          data.numeric.Weight
            ? data.numeric.Weight.value +
              data.numeric.Weight.unitCd +
              `(${data.categorical["Weight Estimated"]?.value == "1" ? "" : "Not "}Estimated)`
            : "-",
      },
      {
        label: "Weight Unit",
        type: "select",
        inputs: [
          { name: "LBS", value: "LBS" },
          { name: "KG", value: "KG" },
          { name: "G", value: "G" },
          { name: "OZ", value: "OZ" },
        ],
        name: "WTUnit",
        className: "aptWeightUnitField",
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "Weight Estimated?",
        type: "radio",
        inputs: [
          { name: "Yes", value: 1 },
          { name: "No", value: 2 },
        ],
        name: ["categorical", 1],
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "Temperature",
        type: "number",
        placeholder: "Enter Temperature",
        name: ["numeric", 5],
        history: (data) =>
          data.numeric["Temperature"]
            ? data.numeric["Temperature"].value +
              data.numeric["Temperature"].unitCd
            : "-",
        hidden: branchTypeId == 2,
      },
      {
        label: "Temperature Unit",
        type: "radio",

        inputs: [
          { name: "°F", value: "F" },
          { name: "°C", value: "C" },
        ],
        name: "TMUnit",
        optionAttribute: { name: "name", value: "value" },
      },
      {
        label: "Temperature Route",
        type: "select",
        inputs: [
          { name: "Axillary", value: 4 },
          { name: "Ear", value: 5 },
          { name: "Rectal", value: 3 },
          { name: "Microchip Scan", value: 70 },
        ],
        name: ["categorical", 2],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          data.categorical["Temperature Route"]
            ? inputs.find(
                (k) => k.value == data.categorical["Temperature Route"].value,
              )?.name
            : "-",
        hidden: branchTypeId == 2,
      },
      {
        label: "Heart Rate",
        type: "number",
        placeholder: "Enter Heart Rate",
        name: ["numeric", 3],
        suffix: "BPM",
        history: (data) =>
          data.numeric["Heart Rate"]
            ? data.numeric["Heart Rate"].value + "BPM"
            : "-",
        hidden: branchTypeId == 2,
      },
      {
        label: "Respiratory Rate",
        type: "input",
        placeholder: "Enter Respiratory Rate",
        name: ["freeform", 18],
        history: (data) =>
          data.freeform["Respiratory Rate"]
            ? data.freeform["Respiratory Rate"].value
            : "-",
        hidden: branchTypeId == 2,
      },
      {
        label: "Pulse Quality",
        type: "select",
        inputs: [
          { name: "Strong/Normal", value: 6 },
          { name: "Fair", value: 7 },
          { name: "Weak", value: 8 },
          { name: "Bounding", value: 9 },
        ],

        name: ["categorical", 3],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          data.categorical["Pulse Quality"]
            ? inputs.find(
                (k) => k.value == data.categorical["Pulse Quality"].value,
              )?.name
            : "-",
        hidden: branchTypeId == 2,
      },
      {
        label: "CRT",
        type: "input",
        placeholder: "Enter CRT",
        name: ["freeform", 20],
        suffix: "sec",
        history: (data) =>
          data.freeform["CRT"] ? data.freeform["CRT"].value : "-",
        hidden: branchTypeId == 2,
      },
      {
        label: "Mucous Membrane",
        type: "input",
        placeholder: "Enter Detail",
        name: ["freeform", 19],
        history: (data) =>
          data.freeform["Mucous Membrane"]
            ? data.freeform["Mucous Membrane"].value
            : "-",
        hidden: branchTypeId == 2,
      },
      {
        label: "Hydration",
        type: "select",
        inputs: [
          { name: "Euhydrated", value: 10 },
          { name: "Mild Dehydration", value: 11 },
          { name: "Moderate Dehydration", value: 12 },
          { name: "Severe Dehydration", value: 13 },
        ],

        name: ["categorical", 4],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          data.categorical["Hydration"]
            ? inputs.find((k) => k.value == data.categorical["Hydration"].value)
                ?.name
            : "-",
        hidden: branchTypeId == 2,
      },
      {
        label: "Systolic Blood Pressure",
        type: "input",
        placeholder: "Enter Systolic",
        name: ["numeric", 4],
        history: (data) =>
          data.numeric["Systolic Blood Pressure"]
            ? data.numeric["Systolic Blood Pressure"].value
            : "-",
        hidden: branchTypeId == 2,
      },
      {
        label: "Diastolic Blood Pressure",
        type: "input",
        placeholder: "Enter Diastolic",
        name: ["numeric", 2],
        history: (data) =>
          data.numeric["Diastolic Blood Pressure"]
            ? data.numeric["Diastolic Blood Pressure"].value
            : "-",
        hidden: branchTypeId == 2,
      },
      {
        label: "Body Condition Score",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 14 },
          { name: "1 - Emaciated", value: 15 },
          { name: "2 - Very Thin", value: 16 },
          { name: "3 - Underweight", value: 17 },
          { name: "4 - Ideal / Slim", value: 18 },
          { name: "5 - Ideal", value: 19 },
          { name: "6 - Overweight", value: 20 },
          { name: "7 - Heavy", value: 21 },
          { name: "8 - Obese", value: 22 },
          { name: "9 -Grossly Obese", value: 23 },
        ],

        name: ["categorical", 5],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          data.categorical["Body Condition Score"]
            ? inputs.find(
                (k) =>
                  k.value == data.categorical["Body Condition Score"].value,
              )?.name
            : "-",
        hidden: branchTypeId == 2,
      },
      {
        label: "Pain Score",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 24 },
          { name: "0 - None", value: 25 },
          { name: "1 - Minimal", value: 26 },
          { name: "2 - Mild", value: 27 },
          { name: "3 - Mild to Moderate", value: 28 },
          { name: "4 - Moderate", value: 29 },
          { name: "5 - Moderate to Severe", value: 30 },
        ],
        name: ["categorical", 6],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          data.categorical["Pain Score"]
            ? inputs.find(
                (k) => k.value == data.categorical["Pain Score"].value,
              )?.name
            : "-",
        hidden: branchTypeId == 2,
      },
      {
        label: "FAS Score",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 77 },
          { name: "0 - None", value: 71 },
          { name: "1 - Mild", value: 72 },
          { name: "2 - Mild to Moderate", value: 73 },
          { name: "3 - Moderate", value: 74 },
          { name: "4 - Moderate to Severe", value: 75 },
          { name: "5 - Severe", value: 76 },
        ],
        name: ["categorical", 20],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          data.categorical["FAS Score"]
            ? inputs.find((k) => k.value == data.categorical["FAS Score"].value)
                ?.name
            : "-",
        hidden: branchTypeId == 2,
      },
    ],
  },
  {
    mainLabel: "Subjective",
    maninIcon: <SubjectiveIcon />,
    hidden: branchTypeId == 2,
    formFields: [
      {
        label: "Subjective",
        type: "textarea",
        placeholder: "Add Subjective Details",
        name: ["freeform", 1],
        history: (data) =>
          data.freeform["Subjective"] ? data.freeform["Subjective"].value : "-",
      },
    ],
  },

  // {
  //     mainLabel: 'Objective',
  //     maninIcon: <ObjectiveIcon />,
  //     type: 'Qsoap',
  //     formFields: [{
  //         label: 'Objective',
  //         type: 'textarea',
  //         placeholder: 'Add Objective Details',
  //         name: ['freeform',2]

  //     },
  //     ]
  // },

  {
    mainLabel: "Objective",
    maninIcon: <ObjectiveIcon />,
    type: "Fsoap",
    hidden: branchTypeId == 2,
    formFields: [
      {
        label: "General Appearance",
        type: "textarea",
        placeholder: "Bright, alert and responsive.",
        name: ["freeform", 5],
        history: (data) => data.freeform["General Appearance"]?.value ?? "-",
      },
      {
        label: "Status",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 33 },
          { name: "Normal", value: 31 },
          { name: "Abnormal", value: 32 },
        ],
        name: ["categorical", 7],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          inputs.find(
            (k) =>
              k.value == data.categorical["General Appearance Status"]?.value,
          )?.name ?? "-",
      },
      {
        label: "Oral Health",
        type: "textarea",
        placeholder: "0/4 Dental calculus with no appreciable gingivitis",
        name: ["freeform", 6],
        history: (data) => data.freeform["Oral Health"]?.value ?? "-",
      },
      {
        label: "Status",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 36 },
          { name: "Normal", value: 34 },
          { name: "Abnormal", value: 35 },
        ],
        name: ["categorical", 8],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          inputs.find(
            (k) => k.value == data.categorical["Oral Health Status"]?.value,
          )?.name ?? 34,
      },
      {
        label: "Eyes",
        type: "textarea",
        placeholder: "Eyes are quiet and comfortable. Normal vision.",
        name: ["freeform", 7],
        history: (data) => data.freeform["Eyes"]?.value ?? "-",
      },
      {
        label: "Status",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 39 },
          { name: "Normal", value: 37 },
          { name: "Abnormal", value: 38 },
        ],
        name: ["categorical", 9],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          inputs.find((k) => k.value == data.categorical["Eyes Status"]?.value)
            ?.name ?? "-",
      },
      {
        label: "Ears",
        type: "textarea",
        placeholder:
          "Ears are clean and free of debris. No evidence of pain or pruritus.",
        name: ["freeform", 8],
        history: (data) => data.freeform["Ears"]?.value ?? "-",
      },
      {
        label: "Status",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 42 },
          { name: "Normal", value: 40 },
          { name: "Abnormal", value: 41 },
        ],
        name: ["categorical", 10],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          inputs.find((k) => k.value == data.categorical["Ears Status"]?.value)
            ?.name ?? "-",
      },
      {
        label: "Integumentary",
        type: "textarea",
        placeholder:
          "Skin and coat appear normal.  No skin masses, alopecia or skin lesions noted.  No fleas or ticks present.",
        name: ["freeform", 9],
        history: (data) => data.freeform["Integumentary"]?.value ?? "-",
      },
      {
        label: "Status",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 45 },
          { name: "Normal", value: 43 },
          { name: "Abnormal", value: 44 },
        ],
        name: ["categorical", 11],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          inputs.find(
            (k) => k.value == data.categorical["Integumentary Status"]?.value,
          )?.name ?? "-",
      },
      {
        label: "Musculoskeletal",
        type: "textarea",
        placeholder:
          "Normal posture and gait. Pet is fully weight bearing on all four limbs.  Normal range of motion in all joints.  Normal body condition with healthy musculature.",
        name: ["freeform", 10],
        history: (data) => data.freeform["Musculoskeletal"]?.value ?? "-",
      },
      {
        label: "Status",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 48 },
          { name: "Normal", value: 46 },
          { name: "Abnormal", value: 47 },
        ],
        name: ["categorical", 12],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          inputs.find(
            (k) => k.value == data.categorical["Musculoskeletal Status"]?.value,
          )?.name ?? "-",
      },
      {
        label: "Gastrointestinal",
        type: "textarea",
        placeholder:
          "Abdomen is soft and non painful on palpation. Normal borborgymi on auscultation.",
        name: ["freeform", 11],
        history: (data) => data.freeform["Gastrointestinal"]?.value ?? "-",
      },
      {
        label: "Status",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 51 },
          { name: "Normal", value: 49 },
          { name: "Abnormal", value: 50 },
        ],
        name: ["categorical", 13],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          inputs.find(
            (k) =>
              k.value == data.categorical["Gastrointestinal Status"]?.value,
          )?.name ?? "-",
      },
      {
        label: "Cardiac",
        type: "textarea",
        placeholder:
          "Heart auscults clearly with no murmur.  Normal rate and rhythm. Pulses are strong and synchronous.",
        name: ["freeform", 12],
        history: (data) => data.freeform["Cardiac"]?.value ?? "-",
      },
      {
        label: "Status",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 54 },
          { name: "Normal", value: 52 },
          { name: "Abnormal", value: 53 },
        ],
        name: ["categorical", 14],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          inputs.find(
            (k) => k.value == data.categorical["Cardiac Status"]?.value,
          )?.name ?? "-",
      },
      {
        label: "Respiratory",
        type: "textarea",
        placeholder:
          "Lung fields auscult clearly in all fields. Normal respiratory rate and effort.",
        name: ["freeform", 13],
        history: (data) => data.freeform["Respiratory"]?.value ?? "-",
      },
      {
        label: "Status",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 57 },
          { name: "Normal", value: 55 },
          { name: "Abnormal", value: 56 },
        ],
        name: ["categorical", 15],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          inputs.find(
            (k) => k.value == data.categorical["Respiratory Status"]?.value,
          )?.name ?? "-",
      },
      {
        label: "Neural Systems",
        type: "textarea",
        placeholder:
          "No abnormalities noted.  Mentation is normal, and pet is fully ambulatory with no proprioceptive deficits.",
        name: ["freeform", 14],
        history: (data) => data.freeform["Neural Systems"]?.value ?? "-",
      },
      {
        label: "Status",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 60 },
          { name: "Normal", value: 58 },
          { name: "Abnormal", value: 59 },
        ],
        name: ["categorical", 16],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          inputs.find(
            (k) => k.value == data.categorical["Neural Systems Status"]?.value,
          )?.name ?? "-",
      },
      {
        label: "Genitourinary",
        type: "textarea",
        placeholder: "No evidence of pain, swelling or inflammation.",
        name: ["freeform", 15],
        history: (data) => data.freeform["Genitourinary"]?.value ?? "-",
      },
      {
        label: "Status",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 63 },
          { name: "Normal", value: 61 },
          { name: "Abnormal", value: 62 },
        ],
        name: ["categorical", 17],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          inputs.find(
            (k) => k.value == data.categorical["Genitourinary Status"]?.value,
          )?.name ?? "-",
      },
      {
        label: "Lymph Nodes",
        type: "textarea",
        placeholder: "All peripheral lymph nodes palpate normally.",
        name: ["freeform", 16],
        history: (data) => data.freeform["Lymph Nodes"]?.value ?? "-",
      },
      {
        label: "Status",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 66 },
          { name: "Normal", value: 64 },
          { name: "Abnormal", value: 65 },
        ],
        name: ["categorical", 18],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          inputs.find(
            (k) => k.value == data.categorical["Lymph Nodes Status"]?.value,
          )?.name ?? "-",
      },
      {
        label: "Rectal",
        type: "textarea",
        placeholder:
          "Normal rectal exam. Anal sacs are not full, and no masses palpated.",
        name: ["freeform", 17],
        history: (data) => data.freeform["Rectal"]?.value ?? "-",
      },
      {
        label: "Status",
        type: "select",
        inputs: [
          { name: "Not Evaluated", value: 69 },
          { name: "Normal", value: 67 },
          { name: "Abnormal", value: 68 },
        ],
        name: ["categorical", 19],
        optionAttribute: { name: "name", value: "value" },
        history: (data, inputs) =>
          inputs.find(
            (k) => k.value == data.categorical["Rectal Status"]?.value,
          )?.name ?? "-",
      },
    ],
  },

  {
    mainLabel: "Assessment",
    maninIcon: <AssesmentIcon />,
    hidden: branchTypeId == 2,
    formFields: [
      {
        label: ["Assessment"],
        type: "textarea",
        placeholder: "Add Assessment Details",
        name: ["freeform", 3],
        history: (data) => data.freeform["Assesment"]?.value ?? "-",
      },
    ],
  },
  {
    mainLabel: "Plan",
    maninIcon: <PlanIcon />,
    formFields: [
      {
        label: ["Plan"],
        type: "textarea",
        placeholder: "Add Plan Details",
        name: ["freeform", 4],
        history: (data) => data.freeform["Plan"]?.value ?? "-",
      },
    ],
  },
  {
    mainLabel: "Surgery Notes",
    type: "History",
    maninIcon: <SmallProcedureIcon />,
    formFields: [
      {
        label: ["Sugery Notes"],
        type: "textarea",
        placeholder: "Add surgeryNote Details",
        name: "surgeryNote",
        history: (data) => data.surgeryNote ?? "-",
      },
    ],
  },
  {
    mainLabel: "Services",
    maninIcon: <ObjectiveIcon />,
    type: "History",
    formFields: [
      {
        label: "services",
        type: "table",
        name: ["freeform", "Services"],
      },
    ],
  },
];

export default AppointmentDetailsFormConfig;
