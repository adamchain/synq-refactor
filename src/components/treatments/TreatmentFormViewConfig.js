import { momentLocal } from "../util/TimeUtil";
import React from "react";
import { Typography } from "antd";
import CommonUtil from "../util/CommonUtil";

const { Text } = Typography;
const getValidDate = (expiryId, expiryDays) => {
  let expiryDetail = CommonUtil.EXPIRATION_FIELD[expiryId];
  if (expiryId === 8 && expiryDays > 0) {
    expiryDetail = { count: expiryDays, type: "days" };
  }
  return expiryDetail
    ? momentLocal()
        .add(expiryDetail.count, expiryDetail.type)
        .format("MM/DD/YYYY")
    : "-";
};
export default class TreatmentFormViewConfig {
  static medication = (inputData) => [
    [
      // {
      //     label: "Status",
      //     type: "switch",
      //     span: 12,
      //     value:inputData.status === 'A' ? "Active" : "Inactive",
      //     name:'active'
      // },
      {
        label: "Start Date",
        type: "readOnly",
        span: 12,
        name: "startDate",
        value: inputData.startDate
          ? momentLocal(inputData.startDate, "YYYY-MM-DD").format("MM/DD/YYYY")
          : "-",
      },
      // {
      //     label: "Expiration Period",
      //     type: "readOnly",
      //     span: 12,
      //     name:'expiry',
      //     value:inputData.inventoryExpiryId ?   CommonUtil.EXPIRATION_FIELD [inputData.inventoryExpiryId].name : "-"
      // },
      {
        label: "Rx Expiration Date",
        type: "readOnly",
        span: 12,
        name: "expirationDate",
        value: inputData.inventoryExpirationDate
          ? momentLocal(inputData.inventoryExpirationDate, "YYYY-MM-DD").format(
              "MM/DD/YYYY",
            )
          : getValidDate(
              inputData.inventoryExpiryId,
              inputData.inventoryExpiryDays,
            ),
      },
      {
        label: "Refills Remaining",
        type: "readOnly",
        span: 12,
        name: "refillRemaining",
        value: inputData.refillRemaining ? (
          inputData.refillRemaining
        ) : (
          <Text style={{ color: "red" }}>0</Text>
        ),
      },
      {
        label: "Rx Number",
        type: "readOnly",
        span: 12,
        name: "rxNumber",
        value: inputData.rxNumber ? inputData.rxNumber : "-",
      },

      {
        label: "Lot #",
        type: "readOnly",
        span: 24,
        name: "lot",
        value: inputData.lot ? inputData.lot : "-",
      },

      {
        label: "Rx Instructions",
        type: "readOnly",
        span: 24,
        name: "instructions",
        value: inputData.instructions ? inputData.instructions : "-",
      },
      {
        label: "Prescribed by",
        type: "readOnly",
        span: 24,
        name: "prescribedBy",
        value: inputData.providerFirstName
          ? inputData.providerFirstName + " " + inputData.providerLastName
          : "-",
      },
    ],

    [
      // {
      //     label: "Strength",
      //     type: "readOnly",
      //     span: 12,
      //     name:'strength',
      //     value:inputData.strength? inputData.strength:"-"
      // },
      // {
      //     label: "Dose Type",
      //     type: "readOnly",
      //     span: 12,
      //     name:'doseType',
      //     value:inputData.doseType?inputData.doseType:"-"
      // },
      // {
      //     label: "Refill Expiration",
      //     type: "readOnly",
      //     span: 12,
      //     name:'refillExpiration',
      //     value:inputData.refillExpirationId? getValidDate(inputData.refillExpirationId):"-"
      // },
    ],
  ];

  static vaccine = (inputData) => [
    [
      {
        label: "Administered",
        type: "readOnly",
        span: 24,
        name: "administered",
        value: inputData.administered
          ? momentLocal(inputData.administered, "YYYY-MM-DD").format(
              "MM/DD/YYYY",
            )
          : "-",
      },
      {
        label: "Expiration Period",
        type: "readOnly",
        span: 12,
        name: "period",
        value: inputData.period ?? "-",
      },
      {
        label: "Expiration Date",
        type: "readOnly",
        span: 12,
        name: "expiry",
        value: inputData.expiry
          ? momentLocal(inputData.expiry, "YYYY-MM-DD").format("MM/DD/YYYY")
          : "-",
      },
      {
        label: "Vaccine Type",
        type: "readOnly",
        span: 12,
        name: "type",
        value: inputData.type ?? "-",
      },
      {
        label: "Dose Type",
        type: "readOnly",
        span: 12,
        name: "dose",
        value: inputData.dose ?? "-",
      },
      {
        label: "Vaccine Serial #",
        type: "readOnly",
        span: 12,
        name: "serial",
        value: inputData.serial ?? "-",
      },
      {
        label: "Lot #",
        type: "readOnly",
        span: 12,
        name: "lot",
        value: inputData.lot ?? "-",
      },
      {
        label: "Lot Expiration",
        type: "readOnly",
        span: 24,
        name: "lot",
        value: inputData.lotExpiration ?? "-",
      },
      {
        label: inputData.rabiesTag ? "Rabies Tag #" : " ",
        type: "readOnly",
        span: 12,
        name: "rabies",
        value: inputData.rabiesTag ?? "-",
      },
    ],
    [
      // {
      //     label: "Vaccine Type",
      //     type: "readOnly",
      //     span: 12,
      //     name:'type',
      //     value:inputData.type??"-"
      // },
      // {
      //     label: "Dose Type",
      //     type: "readOnly",
      //     span: 12,
      //     name:'dose',
      //     value:inputData.dose??"-"
      // },
      // {
      //     label: "Vaccine Serial #",
      //     type: "readOnly",
      //     span: 12,
      //     name:'serial',
      //     value:inputData.serial??"-"
      // },
      // {
      //     label: "Lot #",
      //     type: "readOnly",
      //     span: 12,
      //     name:'lot',
      //     value:inputData.lot??"-"
      // },
      // {
      //     label: inputData.rabiesTag ? "Rabies Tag #" : " ",
      //     type: "readOnly",
      //     span: 12,
      //     name:'rabies',
      //     value:inputData.rabiesTag??"-"
      // }
    ],
  ];
}
