import { FORM_FIELDS } from "./Constant";
// import mockData from "./mock";

export const getGridSpan = (config, index, label) => {
  if (index <= 16 && config.mainLabel === FORM_FIELDS.VITALS) {
    return "8";
  } else if (config.mainLabel === FORM_FIELDS.OBJECTIVE && index % 2 === 0) {
    return label === "history" ? "24" : "18";
  } else if (
    config.mainLabel === FORM_FIELDS.ASSESSMENT ||
    config.mainLabel === FORM_FIELDS.PLAN ||
    config.mainLabel === FORM_FIELDS.SURGERY ||
    config.mainLabel === FORM_FIELDS.SUBJECTIVE
  ) {
    return "23";
  } else {
    return 6;
    // return label === 'history' ? '24' : '6'
  }
};

export const getHistoryValue = (data, field) => {
  //console.log('NAME', name)
  let value = "-";
  // if (data[name]) {
  //     value = data[name]
  // } else {
  //     (data.healthAttrList??[]).map((attr, index) => {
  //         //console.log('attr.healthAttrName', attr.healthAttrName)
  //         if (attr.healthAttrName === name) {
  //             console.log('attr.healthAttrValue', attr.healthAttrValue)
  //             value = attr.healthAttrValue
  //         } else if (name.replace('-status', '') === attr.healthAttrName) {
  //             value = attr.healthAttrStatusId
  //         }

  //     })
  // }
  //.replace(/<br\s*[\/]?>/gi, "\n")

  let historyValue = "-";
  if (field.history) {
    historyValue = field.history(data, field.inputs);
  }
  return (historyValue ? historyValue : "-")
    .toString()
    .replace(/<br\s*[\/]?>/gi, "\n");
  //return value;
};
