import _ from "lodash";
import CommonUtil from "../util/CommonUtil";
import { momentLocal } from "../util/TimeUtil";

export default class LabelUtil {
  static getValidDate = (expiryId, expiryDays) => {
    let expiryDetail = CommonUtil.EXPIRATION_FIELD[expiryId];
    if (expiryId === 8 && expiryDays > 0) {
      expiryDetail = { count: expiryDays, type: "days" };
    }
    return expiryDetail
      ? momentLocal()
          .add(expiryDetail.count, expiryDetail.type)
          .format("MM/DD/YYYY")
      : "None";
  };

  static printLabel = (itemData, patientName, providerName, commonContext) => {
    let expiryDate = "";
    if (itemData.inventoryExpirationId || itemData.inventoryExpiryId) {
      expiryDate = this.getValidDate(
        itemData.inventoryExpirationId || itemData.inventoryExpiryId,
        itemData.inventoryExpirationDays || itemData.inventoryExpiryDays,
      );
    }
    localStorage.setItem(
      "whskr-print-label",
      JSON.stringify({
        ...itemData,
        patientName: patientName,
        doctorName:
          itemData.providerFirstName + " " + itemData.providerFirstName,
        quantity: itemData.qty ?? "",
        refillExpirationDate: expiryDate ?? "",
        rxInstructions: itemData.instructions ?? "",
        refills: itemData.refillRemaining ?? "",
        clientName: itemData.clientLastName
          ? itemData.clientFirstName + " " + itemData.clientLastName
          : "",
        animalFamily: itemData.patientFamilyName ?? "",
        veterinarian: providerName,
        dispensableName: itemData.name,
        companyName: commonContext.defaultBranch?.name,
        addressLine: `${(commonContext.defaultBranch?.address1 ?? "") + " " + (commonContext.defaultBranch?.address2 ?? "")}, ${commonContext.defaultBranch?.city + " ," + commonContext.allStates[commonContext.defaultBranch?.stateId]?.stateCd + " " + commonContext.defaultBranch?.zipCode}`,
        clientAddress: `${(itemData?.cAddress1 ?? "") + " " + (itemData?.cAddress2 ?? "")}, ${itemData?.cCity + " ," + itemData?.cState + " " + itemData?.cZipCode}`,
        mobile: commonContext.defaultBranch?.mobile
          ? commonContext.defaultBranch?.mobile
          : commonContext.defaultBranch?.phone,
      }),
    );
    window.open("/label/preview", "_blank", "noreferrer");
  };
}
