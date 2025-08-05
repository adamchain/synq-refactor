import CommonUtil from "../util/CommonUtil";

const ReminderFormConfig = (inputValue) => [
  {
    mainLabel: " ",
    formFields: [
      ...(inputValue.isToDo
        ? []
        : [
            {
              label: "Reminder Type",
              type: "select",
              name: "reminderType",
              inputs: [
                { name: "Phone Call", value: 1 },
                { name: "Email", value: 2 },
                // {name:"Task",value:3,disabled:inputValue.patientId},
                //{name:"Automated Email",value:4},{name:"Automated Text",value:5}
              ],
              optionAttribute: { name: "name", value: "value" },
              fullSize: true,
              requiredMessage: "Reminder Type  is required",
            },
          ]),
      {
        label: inputValue.isToDo ? "Task Name" : "Reminder Name",
        type: "input",
        name: "name",
        placeholder: "Reminder Title Here",
        fullSize: true,
        requiredMessage: "Reminder Name  is required",
      },
      ...(inputValue.isToDo
        ? [
            {
              label: "Task Description",
              type: "textarea",
              name: "descr",
              placeholder: "Add Task Description",
              fullSize: true,
            },
          ]
        : []),

      ...(inputValue.isShowRelatingToPatient
        ? [
            {
              label: "Relating to Client",
              type: "select",
              name: "patientId",
              inputs: inputValue.patientList,
              optionAttribute: { name: "name", value: "id" },
              fullSize: true,
              requiredMessage: "Relating to Client  is required",
            },
          ]
        : []),
      {
        label: inputValue.isToDo ? "Due Date" : "Reminder Date",
        type: "date",
        name: "reminderDate",
        requiredMessage: "Reminder Date  is required",
      },
      {
        label: "Repeat (Optional)",
        type: "select",
        name: ["repeat", "type"],
        inputs: [
          { name: "Does Not Repeat", value: "DNR" },
          { name: "Daily", value: "D" },
          { name: "Weekly", value: "W" },
          { name: "Monthly", value: "M" },
          { name: "Yearly", value: "Y" },
        ],
        optionAttribute: { name: "name", value: "value" },
      },
      ...addRepeatTypes(inputValue.repeat.type, inputValue.onDayList),
      ...addRepeatEnds(inputValue.repeat.type, inputValue.repeat.repeatEnds),
      {
        label: "Assigned to",
        type: "select",
        name: "users",
        mode: "multiple",
        inputs: inputValue.staffList,
        optionAttribute: { name: "displayName", value: "userId" },
        fullSize: true,
        requiredMessage: "Please assign staff",
      },
    ],
  },
];

function addRepeatEnds(repeatType, repeatEnds) {
  return repeatType !== "DNR"
    ? [
        {
          label: "Repeat Ends",
          type: "select",
          name: ["repeat", "repeatEnds"],
          inputs: [
            { name: "Never", value: "N" },
            { name: "On Date", value: "O" },
            { name: "After Occurence", value: "A" },
          ],
          optionAttribute: { name: "name", value: "value" },
          isVisible: repeatType !== "DNR",
        },
        {
          label: "Ends on Date",
          type: "date",
          name: ["repeat", "endDate"],
          isVisible: repeatEnds === "O",
        },
        {
          label: "Occurrences",
          type: "input",
          name: ["repeat", "maxRepeat"],
          inputType: "number",
          isVisible: repeatEnds === "A",
        },
      ]
    : [];
}

function addRepeatTypes(repeatType, onDayList) {
  return repeatType !== "DNR"
    ? [
        {
          label: "Repeat Every",
          type: "input",
          name: ["repeat", "interval"],
          inputType: "number",
          suffix: CommonUtil.CALENDAR_INTERVAL_OBJECT[repeatType]?.name ?? " ",
        },
        {
          label: "On",
          name: ["repeat", "onDay"],
          type: repeatType === "M" ? "select" : "dummy",
          inputs: onDayList,
          optionAttribute: { name: "name", value: "value" },
        },
        {
          label: "Recurrence Days",
          type: "days",
          name: "days",
          fullSize: true,
          isVisible: repeatType === "W",
        },
      ]
    : [];
}

export default ReminderFormConfig;
