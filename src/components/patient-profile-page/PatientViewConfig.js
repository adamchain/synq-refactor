import CommonUtil from "../util/CommonUtil";

const GENDER_MAP = {
  M: "Male",
  F: "Female",
  MN: "Male - Neutered",
  FS: "Female - Spayed",
};
export const PatientProfileConfig = (patientData, requiredInputData) => {
  return [
    {
      name: "petId",
      value: patientData?.patientId,
      label: "Pet ID",
    },
    {
      name: "status",
      value: patientData?.statusId
        ? requiredInputData.statusList.find(
            (k) => k.patientStatusId === patientData.statusId,
          )?.patientStatusName
        : "-",
      label: "Status",
    },
    {
      name: "status",
      value: patientData?.familyId
        ? requiredInputData.familyList.find(
            (k) => k.familyId === patientData.familyId,
          )?.familyName
        : "-",
      label: "Animal Family",
    },
    {
      name: "species",
      value: patientData?.speciesName ?? "-",
      label: "Species",
    },
    {
      name: "breed",
      value: patientData?.breedName ?? "-",
      label: "Breed",
    },
    {
      name: "color",
      value: patientData?.colorName ?? "-",
      label: "Color",
    },
    {
      name: "dob",
      value: patientData?.displayDOB ?? "-",
      label: "Date of Birth",
    },
    {
      name: "age",
      value: patientData?.age ?? "-",
      label: "Age",
    },
    {
      name: "sex",
      value: GENDER_MAP[patientData?.sexCd] ?? "-",
      label: "Sex",
    },
    {
      name: "microchip",
      value: patientData?.freeForm?.MC ?? "-",
      label: "Microchip",
    },
    {
      name: "rabies",
      value: patientData?.freeForm?.RT ?? "-",
      label: "Rabies Tag",
    },
    {
      name: "pydr",
      value: patientData?.pyDoctorFirstName
        ? patientData?.pyDoctorFirstName + " " + patientData?.pyDoctorLastName
        : "-",
      label: "Primary Doctor",
    },
    {
      name: "allergies",
      value: patientData?.freeForm?.AG ?? "None",
      label: "Allergies",
    },
    {
      name: "behaviorAlerts",
      value: patientData?.freeForm?.BA ?? "None",

      label: "Behavior Alerts",
    },
    {
      name: "insurance",
      value: patientData?.insurance === true ? "Yes" : "No",
      label: "Insurance",
    },
    {
      name: "insuranceName",
      value: patientData?.insuranceProvider ?? "-",
      label: "Insurance Name",
    },
    {
      name: "weight",
      value:
        patientData?.weight && patientData?.weightUnitCd
          ? CommonUtil.weightCoversion(
              patientData.weight,
              patientData.weightUnitCd,
              "LBS",
            ) +
            "LBS (" +
            CommonUtil.weightCoversion(
              patientData.weight,
              patientData.weightUnitCd,
              "KG",
            ) +
            "KG)"
          : "-",
      label: "Weight",
    },
  ];
};

export const ClientPrimaryConfig = (clientData, states) => [
  {
    name: "fullName",
    label: "Name",
    value: clientData?.primary?.firstName + " " + clientData?.primary?.lastName,
  },

  {
    name: "address",
    label: "Address",
    value: clientData?.primary,
  },
  {
    name: "email",
    value: clientData?.primary?.email ?? "-",
    label: "Email Address",
  },
  {
    name: "phone",
    value: clientData?.phones?.PA ?? "-",
    label: "Primary Phone",
  },
  {
    name: "mobile",
    value: clientData?.phones?.PM ?? "-",
    label: "Mobile Phone " + (clientData?.isPrefferred ? "(Preferred)" : ""),
  },
];

export const ClientSecondaryConfig = (clientData) => [
  {
    name: "fullName",
    value:
      (clientData?.secondary?.firstName ?? "") +
      " " +
      (clientData?.secondary?.lastName ?? ""),
    label: "Name",
  },
  {
    name: "address",
    value: "Same as Primary",
    label: "Address",
  },
  {
    name: "email",
    value: clientData?.secondary?.email ?? "-",
    label: "Email Address",
  },
  {
    name: "cell",
    value: clientData?.phones?.SM ?? "-",
    label: "Cell Phone (Preferred)",
  },
  {
    name: "phone",
    value: clientData?.phones?.SA ?? "-",
    label: "Phone",
  },
];
