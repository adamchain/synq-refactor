import React from "react";
import ClientEmailHtml from "../static-files/ClientEmailHtml.js";
import { momentLocal, utcToLocal } from "../util/TimeUtil.js";

const ClientEmailContent = (props) => {
  const allReplace = (str, obj) => {
    let invoiceData = {
      "##message": obj.message,
      "##staffName": obj.staffName,
      "##clientFirstName": obj.clientFirstName,
      "##date": obj.invoiceDate
        ? utcToLocal(obj.invoiceDate, "YYYY-MM-DDTHH:mm:ss").format(
            "MM/DD/YYYY",
          )
        : "TO DO",
      "##appointmentTime": obj.stTime
        ? utcToLocal(obj.stTime, "YYYY-MM-DDTHH:mm").format("hh:mm A")
        : "TO DO",
      "##subject": obj.subject,
      "##branchName": obj.branchObject.branchName,
      "##branchAddress": obj.branchObject.branchAddress,
      "##branchMobile": obj.branchObject.branchMobile,
      "##branchWebsite": obj.branchObject.branchWebsite,
      "##branchEmail": obj.branchObject.branchEmail,
    };

    for (let x in invoiceData) {
      str = str.replaceAll(x, invoiceData[x]);
    }
    return str;
  };

  let tempHtml = allReplace(ClientEmailHtml.getHtml(), props.previewData);

  return (
    <div
      className="estimate-preview"
      dangerouslySetInnerHTML={{ __html: tempHtml }}
    />
  );
};

export default ClientEmailContent;
