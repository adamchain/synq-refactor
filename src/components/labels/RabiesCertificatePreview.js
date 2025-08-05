import React, { useEffect } from "react";
import { Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import RabiesCertificateHtml from "../static-files/RabiesCertificateHtml.js";
import { Row, Col, Typography, Image } from "antd";
import "./Rabies.scss";
import CommonUtil from "../util/CommonUtil.js";
import { momentLocal } from "../util/TimeUtil.js";

const RabiesCertificateContent = () => {
  return (
    <div
      className="estimate-preview"
      dangerouslySetInnerHTML={{ __html: RabiesCertificateHtml.getHtml() }}
    />
  );
  //return(RabiesCertificateHtml.getHtml());
};

const RabiesCertificatePreview = (props) => {
  let labelData = {
    ...JSON.parse(localStorage.getItem("whskr-print-rabiescertificate")),
  };
  let certificateData = {
    RabiesTagNumber: labelData.patient.patientRabiesTag ?? "-",
    Microchip: labelData.patient.patientMicrochip ?? "-",
    VaccinationDate:
      momentLocal(labelData.vaccine.vaccinatedDate).format("MM/DD/YYYY") ?? "-",
    VaccinationDue: labelData.vaccine.nextVaccinatedDate ?? "-",
    PatientFirstName: labelData.patient.patientFirstName ?? "-",
    PatientLastname: labelData.client.clientLastName ?? "-",
    PatientSpecies: labelData.patient.patientSpecies ?? "-",
    PatientBreed: labelData.patient.patientBreed ?? "-",
    PatientGender: labelData.patient.patientSex ?? "-",
    PatientColor: labelData.patient.patientColor ?? "-",
    PatientAge: CommonUtil.getAgeFromYear(labelData.patient.patientDob) ?? "-",
    PatientWeight:
      CommonUtil.fixedWeight(labelData.patient.patientWeight) ?? "-",
    PatientWeightUnit: labelData.patient.patientWeightUnit ?? "",
    ProductName: labelData.vaccine.inventoryProductName ?? "-",
    InventoryManufacturer: labelData.vaccine.inventoryManufacturer ?? "-",
    VaccineType: labelData.vaccine.inventoryVaccineType ?? "-",
    VaccineSerial: labelData.vaccine.inventorySerial ?? "-",
    ACLLicense: labelData.vaccine.inventoryAnimalControlLicensing ?? "-",
    USDALicense: labelData.vaccine.inventoryUsdaLicensing ?? "-",
    DocFirst: labelData.provider.providerFirstName
      ? "Dr." + labelData.provider.providerFirstName
      : " ",
    DocLast: labelData.provider.providerLastName ?? " ",
    signFirst: labelData.provider.providerFirstName
      ? "Dr." + labelData.provider.providerFirstName
      : " ",
    signLast: labelData.provider.providerLastName ?? " ",
    AppointmentDate: momentLocal(new Date()).format("MM/DD/YYYY"),
    VeterinarianLicence: labelData.provider.providerLicense ?? "-",
    ClinicName: labelData.clinic.branchName ?? "-",
    ClinicPhone: labelData.clinic.branchPhone ?? " ",
    ClinicAddressFormatted:
      labelData.clinic.branchAddress1 + " " + labelData.clinic.branchAddress2,
    ClinicCityFormatted:
      labelData.clinic.branchCity +
      ", " +
      labelData.clinic.branchState +
      " " +
      labelData.clinic.branchZipCode,
    ClientFirst: labelData.client.clientFirstName ?? "-",
    ClientLast: labelData.client.clientLastName ?? "-",
    ClientPhone: labelData.client.clientPhone ?? " ",
    ClientAddressFormatted:
      labelData.client.clientAddress1 + " , " + labelData.client.clientAddress2,
    ClientCityFormatted:
      labelData.client.clientCity +
      " , " +
      labelData.client.clientState +
      " " +
      labelData.client.clientZipCode,
  };

  document.title = "Rabies_Certificate";
  useEffect(() => {
    setTimeout(() => window.print(), 2000);
  }, []);
  return (
    <>
      <RabiesCertificateContent />
      <Button
        type="primary"
        size="large"
        onClick={() => window.print()}
        style={{ float: "right", marginTop: "10px" }}
        className="no-print-view"
        icon={<PrinterOutlined />}
      >
        Print
      </Button>
    </>
  );
};

export default RabiesCertificatePreview;
