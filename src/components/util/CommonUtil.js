import _ from "lodash";
import { momentLocal } from "./TimeUtil";

const weightFormats = {
  "KG-LBS": (x) => 2.205 * x,
  "LBS-KG": (x) => x / 2.205,
  "LBS-OZ": (x) => 16 * x,
  "OZ-LBS": (x) => x / 16,
  "LBS-G": (x) => 453.592 * x,
  "G-LBS": (x) => x / 453.592,
};

export default class CommonUtil {
  static isEmpty = (input) => {
    let isEmpty = true;
    if (_.isBoolean(input)) {
      return false;
    }
    if (input) {
      isEmpty = _.isObjectLike(input) ? _.isEmpty(input) : false;
    }
    return isEmpty;
  };

  static isAllValuesFilled = (anyJsObject, ...excludedFields) => {
    let isAnyValueIsEmpty = false;
    if (_.isPlainObject(anyJsObject)) {
      isAnyValueIsEmpty = Object.keys(anyJsObject)
        .filter((k) => !excludedFields.includes(k))
        .some((k) => this.isEmpty(anyJsObject[k]));
    } else {
      isAnyValueIsEmpty = true;
    }
    return !isAnyValueIsEmpty;
  };

  static getWeightFromLbs = (wt) => {
    return wt ? (wt * 2.205).toFixed(2) : "";
  };

  static fixedWeight = (wt) => {
    return wt ? wt.toFixed(2) : "";
  };

  static weightCoversion = (inputWeight, inputWeightType, outputWeightType) => {
    let inputValue = inputWeight;
    let inputType = inputWeightType;
    let outputType = outputWeightType;
    let outputValue = "-";
    if (inputType === outputType || !inputValue) {
      return inputValue ? inputValue.toFixed(2) : "-";
    }

    // if (outputType !== "LBS"){
    //     let formula = weightFormats[inputType.trim()+"-"+"LBS"];
    //     inputValue= formula? formula(inputValue).toFixed(2):"-";
    //     inputType = "LBS";

    // }

    let formula = weightFormats[inputType.trim() + "-" + outputType.trim()];
    outputValue = formula ? formula(inputValue).toFixed(2) : "-";

    return outputValue;
  };

  static computeWeight = () => {};
  static getAgeFromYear = (DOB) => {
    if (DOB) {
      let currentDay = momentLocal();
      let dob = momentLocal(DOB, "YYYY-MM-DD");
      let age = momentLocal.duration(currentDay.diff(dob));
      let years = age.years();
      let months = age.months();
      if (months > 0) return age.years() + "YR " + age.months() + "MO";
      else return age.years() + "YR";
    } else {
      return " ";
    }
  };
  static STATUS_OBJECT_COLOR = {
    "NOT STARTED": "#F59A23",
    READY: "#1890FF",
    PROCESSING: "#1890FF",
    "SAMPLE ARRIVED": "#1890FF",
    COMPLETED: "#00A878",
    UPDATED: "#D9001B",
    PARTIAL: "#ec7f8d",
    COMPLETED: "#00A878",
    CONFIRMED: "#00A878",
    UNCONFIRMED: "#D9001B",
    CANCELLED: "#D9001B",
    CANCELED: "#D9001B",
    "NO SHOW": "#D9001B",
    ERROR: "#D9001B",
    BLOCKED: "#D9001B",
    DECLINED: "#D9001B",
    UNPAID: "#D9001B",
    INACTIVE: "#D9001B",
    PAID: "#00A878",
    AVAILABLE: "#00A878",
    ACTIVE: "#00A878",
    PARTIAL: "#F59A23",
    "CHECKED IN": "#00A878",
    "CHECKED OUT": "#00A878",
    APPROVED: "#14BC49",
    WELLNESS: "#008489",
    DENTAL: "#9966FF",
    EXAM: "#14BC49",
    SURGERY: "#0483DD",
    EMERGENCY: "#FF8F00",
    EUTHANASIA: "#E83151",
    GROOMING: "#00B7E0",
    BOARDING: "#2F4D86",
    BLOCK: "#717171",
    MIGRATED: "#717171",
    OTHER: "#717171",
  };

  static STATUS_OBJECT_BG_COLOR = {
    "NOT STARTED": "#feeedc",
    READY: "#dcedfe",
    PROCESSING: "#dcedfe",
    "SAMPLE ARRIVED": "#dcedfe",
    COMPLETED: "#dbf1e9",
    UPDATED: "#dbf1e9",
    CONFIRMED: "#dbf1e9",
    UNCONFIRMED: "#fadcda",
    CANCELLED: "#fadcda",
    CANCELED: "#fadcda",
    "NO SHOW": "#fadcda",
    ERROR: "#fadcda",
    BLOCKED: "#fadcda",
    DECLINED: "#fadcda",
    UNPAID: "#fadcda",
    INACTIVE: "#fadcda",
    PAID: "#dbf1e9",
    AVAILABLE: "#dbf1e9",
    ACTIVE: "#dbf1e9",
    PARTIAL: "#feeedc",
    "CHECKED IN": "#dbf1e9",
    "CHECKED OUT": "#dbf1e9",
    APPROVED: "#cff4df",
    WELLNESS: "#EBFEFF",
    DENTAL: "#e1e3fe",
    EXAM: "#cff4df",
    SURGERY: "#cde8f8",
    EMERGENCY: "#FFF8E1",
    EUTHANASIA: "#f4dedf",
    GROOMING: "#ADF0FF",
    BOARDING: "#C8D4EA",
    BLOCK: "#D7D7D7",
    MIGRATED: "#D7D7D7",
    OTHER: "#D7D7D7",
  };

  static status_messages = {
    create_success: "successfully created",
    update_success: "updated successfully",
    complete_success: "completed successfully",
    delete_success: "successfully deleted",
    upload_success: "uploaded successfully",
    error: "Error occured , please contact support@whskr.com",
    email_success: "email sent successfully",
    lab_post_success: "posted successfully",
  };

  static APPOINTMEN_TYPES_BRANCH_TYPE_2 = {
    1: {
      name: "Nail Trim",
      value: 12,
      presetTime: 30,
      color: "#8B008B", // Dark Magenta
    },
    2: {
      name: "Hair Cut",
      value: 13,
      presetTime: 60,
      color: "#1E90FF", // Dodger Blue
    },
    3: {
      name: "Bath",
      value: 14,
      presetTime: 90,
      color: "#20B2AA", // Light Sea Green
    },
    4: {
      name: "Ear Cleaning",
      value: 15,
      presetTime: 30,
      color: "#FF8C00", // Dark Orange
    },
    5: {
      name: "Blowout",
      value: 16,
      presetTime: 30,
      color: "#228B22", // Forest Green
    },
    6: {
      name: "Teeth Brushing",
      value: 17,
      presetTime: 30,
      color: "#9932CC", // Dark Orchid
    },
    7: {
      name: "Brush",
      value: 18,
      presetTime: 30,
      color: "#A52A2A", // Brown
    },
  };

  static APPOINTMEN_TYPES = {
    1: {
      name: "WELLNESS",
      value: 2,
      presetTime: 30,
      color: "#008489",
    },
    2: {
      name: "EXAM",
      value: 1,
      presetTime: 45,
      color: "#14BC49",
    },
    3: {
      name: "DENTAL",
      value: 3,
      presetTime: 45,
      isDropOff: true,
      color: "#9966FF",
    },
    4: {
      name: "SURGERY",
      value: 4,
      presetTime: 45,
      isDropOff: true,
      color: "#0483DD",
    },
    5: {
      name: "EMERGENCY",
      value: 5,
      presetTime: 0,
      color: "#FF8F00",
    },
    6: {
      name: "EUTHANASIA",
      value: 6,
      presetTime: 0,
      color: "#E83151",
    },
    7: {
      name: "BOARDING",
      value: 7,
      presetTime: 0,
      color: "#2F4D86",
    },
    10: {
      name: "GROOMING",
      value: 10,
      presetTime: 30,
      color: "#00B7E0",
    },
    // 8:{
    //     name: "Block",
    //     value: "8",
    //     presetTime: 0,
    //     color:"gray"
    // },
    // 9:{
    //     name: "OTHER",
    //     value: 9,
    //     presetTime: 0,
    //     color:"gray"
    // }
  };

  static CALENDAR_INTERVAL_OBJECT = {
    D: { name: "Days", value: "D" },
    W: { name: "Weeks", value: "W" },
    M: { name: "Months", value: "M" },
    Y: { name: "Years", value: "Y" },
  };

  static APPOINTMENT_STATUS = {
    Unconfirmed: {
      color: "#D9001B",
      name: "Unconfirmed",
      value: "Unconfirmed",
      status: 1,
    },
    Confirmed: {
      color: "#00A878",
      name: "Confirmed",
      value: "Confirmed",
      status: 2,
    },
    Cancelled: {
      color: "#D11B45",
      name: "Canceled",
      value: "Cancelled",
      status: 3,
    },
    "Checked In": {
      color: "#00A878",
      name: "Checked In",
      value: "Checked In",
      status: 4,
    },
    "Checked Out": {
      color: "#00A878",
      name: "Checked Out",
      value: "Checked Out",
      status: 5,
    },
    Completed: {
      color: "#00A878",
      name: "Complete",
      value: "Completed",
      status: 11,
    },
    "Ready to Check Out": {
      color: "#00A878",
      name: "Ready To Check Out",
      value: "Ready to Check Out",
      status: 6,
    },
    "Boarding Check In": {
      color: "#2F4D86",
      name: "Boarding Check In",
      value: "Boarding Check In",
      status: 7,
    },
    "Boarding Check Out": {
      color: "#2F4D86",
      name: "Boarding Check Out",
      value: "Boarding Check Out",
      status: 8,
    },
    Unknown: { color: "#717171", name: "Unknown", value: "Unknown", status: 9 },
    "No-Show": {
      color: "#D9001B",
      name: "No Show",
      value: "No-Show",
      status: 10,
    },
    "Block Off": {
      color: "#717171",
      name: "Block Off",
      value: "Block Off",
      status: -1,
    },
  };

  static APPOINTMENT_MODAL_STATUS = {
    Unconfirmed: {
      color: "#D9001B",
      name: "Unconfirmed",
      value: "Unconfirmed",
      status: 1,
    },
    Confirmed: {
      color: "#00A878",
      name: "Confirmed",
      value: "Confirmed",
      status: 2,
    },
    Cancelled: {
      color: "#D11B45",
      name: "Canceled",
      value: "Cancelled",
      status: 3,
    },
    "Checked In": {
      color: "#00A878",
      name: "Checked In",
      value: "Checked In",
      status: 4,
    },
    "Checked Out": {
      color: "#00A878",
      name: "Checked Out",
      value: "Checked Out",
      status: 5,
    },
    Completed: {
      color: "#00A878",
      name: "Completed",
      value: "Completed",
      status: 11,
    },
    // "Ready to Check Out":{color:"#D11B45",name:"Ready To Check Out",value:"Ready to Check Out",status:6},
    //"Boarding Check In":{color:"#2F4D86",name:"Boarding Check In",value:"Boarding Check In",status:7},
    //"Boarding Check Out":{color:"#2F4D86",name:"Boarding Check Out",value:"Boarding Check Out",status:8},
    // "Unknown":{color:"#717171",name:"Unknown",value:"Unknown",status:9},
    "No-Show": {
      color: "#D9001B",
      name: "No Show",
      value: "No-Show",
      status: 10,
    },
    //"Block Off":{color:"#D7D7D7",name:"Block Off",value:"Block Off",status:-1},
  };

  static FREEFORM_ID_STRING_CONV = {
    1: { name: "Rabies Tag", value: "RT" },
    2: { name: "Microchip", value: "MC" },
    3: { name: "Tattoo", value: "TT" },
    4: { name: "Markings", value: "MK" },
    5: { name: "Behavioral Alerts", value: "BA" },
    6: { name: "Allergies", value: "AG" },
    7: { name: "Others Authorized", value: "OA" },
  };

  static FREEFORM_STRING_ID_CONV = {
    RT: { name: "Rabies Tag", value: 1 },
    MC: { name: "Microchip", value: 2 },
    TT: { name: "Tattoo", value: 3 },
    MK: { name: "Markings", value: 4 },
    BA: { name: "Behavioral Alerts", value: 5 },
    AG: { name: "Allergies", value: 6 },
    OA: { name: "Others Authorized", value: 7 },
  };

  static EXPIRATION_FIELD = {
    1: { name: "2 Weeks", value: 1, count: 2, type: "weeks" },
    9: { name: "3 Weeks", value: 9, count: 3, type: "weeks" },
    2: { name: "90 Days", value: 2, count: 90, type: "days" },
    3: { name: "6 Months", value: 3, count: 6, type: "months" },
    4: { name: "9 Months", value: 4, count: 9, type: "months" },
    5: { name: "1 Year", value: 5, count: 1, type: "years" },
    6: { name: "2 Years", value: 6, count: 2, type: "years" },
    7: { name: "3 Years", value: 7, count: 3, type: "years" },
    8: { name: "Specific Date", value: 8, count: 0, type: "" },
  };

  static STAFF_ROLES = {
    frontDesk: { name: "FRONTDESK", value: "frontDesk" },
    vettech: { name: "TECHNICIAN", value: "vettech" },
    leadership: { name: "LEADERSHIP", value: "leadership" },
    doctors: { name: "DOCTOR", value: "doctors" },
  };

  static formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ("" + str).replace(/\D/g, "");

    //Check if the input is of correct
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      //Remove the matched extension code
      //Change this to format for any country code.
      let intlCode = match[1] ? "+1 " : "";
      return [match[2], "-", match[3], "-", match[4]].join("");
    }

    return null;
  };

  static genderBasedColor = (sexCd) => {
    return sexCd === "M" || sexCd === "MN"
      ? "#588BF8"
      : sexCd === "F" || sexCd === "FS"
        ? "#E36397"
        : "";
  };

  static REPORT_TYPES = {
    AR: { name: "Accounts Receivable", formValue: "AR", value: 1 },
    BI: { name: "Billable Items", formValue: "BI", value: 2 },
    ES: { name: "End of Shift", formValue: "ES", value: 3 },
    I: { name: "Inventory", formValue: "I", value: "inventory" },
    ST: { name: "Sales & Sales Tax", formValue: "ST", value: 5 },
    U: { name: "Usage", formValue: "U", value: 6 },
    V: { name: "Vaccine", formValue: "V", value: 7 },
  };
}
