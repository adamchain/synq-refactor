import React from "react";
import { Typography, Tooltip } from "antd";
import {
  QuestionCircleFilled,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const GeneralAnestheticFormConfig = (inputData) => {
  return [
    {
      mainLabel: " ",
      formFields: [
        {
          label: "Surgeon",
          type: "select",
          name: "surgeon",
          span: 8,
          //inputs: [{name:'Dr.Carla Polite',value:15}, {name:'Dr.James',value:15},{name:'Dr.Wendy',value:15}, {name:'Dr.Winston',value:15}],
          inputs: inputData,
          optionAttribute: { name: "fullName", value: "userId" },
        },
        // {
        //     label: 'State',
        //     type: 'select',
        //     inputs: Object.values(states),
        //     name: ['primary','stateId'],
        //     optionAttribute:{name:"stateName",value:"stateId"},
        //     requiredMessage: "State is required"
        // },
        {
          label: "Diagnostic Test",
          type: "radio",
          inputs: [
            { name: "Yes", value: "Y" },
            { name: "No", value: "N" },
          ],
          name: "diagTest",
          span: 8,
          optionAttribute: { name: "name", value: "value" },
        },
        {
          label: "Procedure Verified",
          type: "radio",
          inputs: [
            { name: "Yes", value: "Y" },
            { name: "No", value: "N" },
          ],
          name: "procVerified",
          span: 8,
          optionAttribute: { name: "name", value: "value" },
        },
        {
          label: "Catheter",
          type: "radio",
          inputs: [
            { name: "Yes", value: "Y" },
            { name: "No", value: "N" },
          ],
          name: "catheter",
          span: 8,
          optionAttribute: { name: "name", value: "value" },
        },
        {
          label: "Catheter Size",
          type: "select",
          name: "catheterSize",
          span: 8,
          inputs: [
            { name: "14G", value: "14G" },
            { name: "16G", value: "16G" },
            { name: "18G", value: "18G" },
            { name: "20G", value: "20G" },
            { name: "22G", value: "22G" },
            { name: "24G", value: "24G" },
          ],
          optionAttribute: { name: "name", value: "value" },
        },
        {
          label: "Location",
          type: "select",
          name: "location",
          span: 8,
          inputs: [
            { name: "Left Cephalic", value: 1 },
            { name: "Right Cephalic", value: 2 },
            { name: "Right Lateral Saphenous", value: 3 },
            { name: "Left Lateral Saphenous", value: 6 },
            { name: "Right Jugular", value: 4 },
            { name: "Left Jugular", value: 7 },
            { name: "Other", value: 5 },
          ],
          optionAttribute: { name: "name", value: "value" },
        },
        {
          label: "IV Fluids",
          type: "radio",
          inputs: [
            { name: "Yes", value: "Y" },
            { name: "No", value: "N" },
          ],
          name: "ivfluid",
          span: 8,
          optionAttribute: { name: "name", value: "value" },
        },
        {
          label: "IV Fluid Type",
          type: "select",
          name: "ivfluidType",
          span: 8,
          inputs: [
            { name: "LRS", value: 1 },
            { name: "NaCI", value: 2 },
            { name: "D5W", value: 3 },
            { name: "Other", value: 4 },
          ],
          optionAttribute: { name: "name", value: "value" },
        },
        {
          label: "Rate",
          type: "input",
          name: "rate",
          inputType: "number",
          placeholder: "Enter Rate",
          span: 8,
        },
        {
          label: "Breathing Circuit",
          type: "radio",
          inputs: [
            { name: "Rebreathing", value: "R" },
            { name: "Non Rebreathing", value: "NR" },
          ],
          name: "breathCircuit",
          span: 16,
          optionAttribute: { name: "name", value: "value" },
        },
        {
          label: "02 Flow Rate (L/min)",
          type: "input",
          inputType: "number",
          name: "o2Flow",
          placeholder: "Type Amount",
          span: 8,
        },
        {
          type: "divider",
          span: 24,
        },
        {
          label: "Sterile Surgery Pack?",
          type: "radio",
          inputs: [
            { name: "Yes", value: "Y" },
            { name: "No", value: "N" },
          ],
          name: "sterilePack",
          span: 8,
          optionAttribute: { name: "name", value: "value" },
        },
        {
          label: "Anesthesia Start Time",
          type: "date",
          name: "anesStTime",
          span: 8,
        },
        {
          label: "Anesthesia End Time",
          type: "date",
          name: "anesEndTime",
          span: 8,
        },
        {
          label: "Surgery Start Time",
          type: "date",
          name: "surgeryStTime",
          span: 8,
        },
        {
          label: "Surgery End Time",
          type: "date",
          name: "surgeryEndTime",
          span: 8,
        },
        {
          type: "dummy",
          span: 8,
        },
        {
          label: "Gas",
          type: "select",
          name: "gas",
          span: 8,
          inputs: [
            { name: "None", value: 0 },
            { name: "ISO", value: 1 },
            { name: "SEVO", value: 2 },
          ],
          optionAttribute: { name: "name", value: "value" },
        },
        {
          label: "ASA",
          type: "select",
          name: "asa",
          span: 8,
          inputs: [
            { name: "1", value: 1 },
            { name: "2", value: 2 },
            { name: "3", value: 3 },
            { name: "4", value: 4 },
            { name: "5", value: 5 },
          ],
          optionAttribute: { name: "name", value: "value" },
        },
        {
          label: "Endotracheal Tube Size",
          type: "select",
          name: "endotrachealTubeSize",
          span: 8,
          inputs: [
            { name: "None", value: 0 },
            { name: "2", value: 2 },
            { name: "2.5", value: 2.5 },
            { name: "3", value: 3 },
            { name: "3.5", value: 3.5 },
            { name: "4", value: 4 },
            { name: "4.5", value: 4.5 },
            { name: "5", value: 5 },
            { name: "5.5", value: 5.5 },
            { name: "6", value: 6 },
            { name: "6.5", value: 6.5 },
            { name: "7", value: 7 },
            { name: "7.5", value: 7.5 },
            { name: "8", value: 8 },
            { name: "8.5", value: 8.5 },
            { name: "9", value: 9 },
            { name: "9.5", value: 9.5 },
            { name: "10", value: 10 },
            { name: "10.5", value: 10.5 },
            { name: "11", value: 11 },
            { name: "11.5", value: 11.5 },
            { name: "12", value: 12 },
            { name: "12.5", value: 12.5 },
            { name: "13", value: 13 },
            { name: "13.5", value: 13.5 },
            { name: "14", value: 14 },
            { name: "14.5", value: 14.5 },
            { name: "15", value: 15 },
            { name: "15.5", value: 15.5 },
            { name: "16", value: 16 },
          ],
          optionAttribute: { name: "name", value: "value" },
        },
        {
          type: "divider",
          span: 24,
        },
        {
          label: (
            <>
              <Text>Surgery Notes</Text> &nbsp;
              <Tooltip title="Notes entered here will be added to the medical record under 'Surgery Notes'">
                <QuestionCircleOutlined />
              </Tooltip>
            </>
          ),
          type: "textarea",
          placeholder: "Enter Notes",
          name: "surgeryNote",
          span: 24,
        },
      ],
    },
  ];
};
//         {
//             label: 'Client Last Name',
//             type: 'input',
//             name: 'clientLastName',

//         },
//         {
//             label: 'Date of Birth',
//             type: 'date',
//             name: 'dob'
//         },
//         {
//             label: 'Species',
//             type: 'select',
//             inputs: inputData.speciesList,
//             name: 'speciesId',
//             optionAttribute:{name:"speciesName",value:"speciesId"} //provide Name and Value
//         },
//         {
//             label: 'Breed',
//             type: 'select',
//             inputs: inputData.breedList,
//             name: 'breedId',
//             optionAttribute:{name:"breedName",value:"breedId"}
//         },
//         {
//             label: 'Mixed Breed',
//             type: 'radio',
//             inputs: [{name:'Yes',value:true}, {name:'No',value:false}],
//             name: 'mixedBreed',
//             optionAttribute:{name:"name",value:"value"}

//         },
//         {
//             label: 'Sex',
//             type: 'select',
//             inputs: [{name:'Male',value:"M"}, {name:'Female',value:"F"},{name:'Male - Neutered',value:"MN"}, {name:'Female - Spayed',value:"FS"}],
//             name: 'sexCd',
//             optionAttribute:{name:"name",value:"value"}

//         },
//         {
//             label: 'Color',
//             type: 'select',
//             inputs: inputData.colorList,
//             name: 'colorId',
//             optionAttribute:{name:"patientColorName" ,value:"patientColorId"}
//         },
//         {
//             label: 'Weight',
//             type: 'input',
//             name: 'weight'
//         },
//         {
//             label: 'Weight Unit',
//             type: 'radio',
//             inputs: ['LBS','KG','G','OZ'],
//             name: 'weightUnitCd'
//         },
//         {
//             label: 'Weight Estimated?',
//             type: 'radio',
//             inputs: [{name:'Yes',value:true}, {name:'No',value:false}],
//             name: 'weightEstimated',
//             optionAttribute:{name:"name",value:"value"}
//         },
//         {
//            type: 'dummy'
//         },
//         {
//             label: 'Status',
//             type: 'select',
//             inputs: inputData.statusList,
//             name: 'statusId',
//             optionAttribute:{name:"patientStatusName",value:"patientStatusId"}

//         },
//         {
//             type: 'dummy'
//          },
//         {
//             label: 'Rabies Tag #',
//             type: 'input',
//             name: ['freeForm','RT']
//         },
//         {
//             label: 'Microchip #',
//             type: 'input',
//             name: ['freeForm','MC']
//         },
//         {
//             label: 'Tattoo',
//             type: 'input',
//             name: ['freeForm','TT']
//         },{
//             label: 'Markings',
//             type: 'input',
//             name: ['freeForm','MK']
//         },
//         {
//             label: 'Behavioral Alerts',
//             type: 'textarea',
//             placeholder: 'Behavioral Alerts',
//             name: ['freeForm','BA']
//         },
//         {
//             label: 'Allergies',
//             type: 'textarea',
//             placeholder: 'Add Allergy Details',
//             name: ['freeForm','AG']
//         },
//         {
//             label: 'Others Authorized to Initiate Care',
//             type: 'textarea',
//             placeholder: 'Others Authorized to Initiate Cares',
//             name: ['freeForm','OA']
//         },
//         {
//             label: 'Primary Doctor',
//             type: 'select',
//             inputs: inputData.doctorsList,
//             name: 'pyDoctorId',
//             optionAttribute:{name:"fullName",value:"userId"}

//         }
//     ]
// }

export default GeneralAnestheticFormConfig;
