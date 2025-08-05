import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Row, Col } from "antd"; // Ant Design's Card component for layout
import { CommonContext } from "../../context/CommonContext";
import CreateEditPatientDrawer from "../patient-profile-page/CreateEditPatientDrawer";
import CreatEditClientDrawer from "../client-profile-page/CreateEditClientDrawer";
import { HeaderLogo } from "../util/SvgUtil";
import ClientServices from "../../services/ClientServices";
import CommonServices from "../../services/CommonServices";
import PatientServices from "../../services/PatientServices";
import "./ClientIntakeForm.scss"; // SCSS file for styling

const ClientIntakeForm = () => {
  const context = useContext(CommonContext);
  let allStates = context.allStates;
  console.log("allStates", allStates);
  const [showPatient, setShowPatient] = useState(false);
  const [showThanku, setShowThanku] = useState(false);
  const [clientDetails, setClientDetails] = useState({});
  const [patientDetails, setPatientDetails] = useState({});
  let patientId;

  const handleClientData = (data) => {
    console.log("Client data:", data);
    console.log("setClientDetails", clientDetails);
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      primary: {
        ...prevDetails.primary,
        firstName: data?.primary?.firstName,
        lastName: data?.primary?.lastName,
      },
    }));
    if (
      data?.primary?.address1 != undefined &&
      data?.primary?.city != undefined
    ) {
      setShowPatient(true);
    }
  };

  const handlePatientData = (data) => {
    console.log("Patient data:", data);
    console.log("setPatientDetails", patientDetails);
    setPatientDetails((prevDetails) => ({
      ...prevDetails,
      clientLastName: data.clientLastName,
      patientName: data.patientName,
    }));

    if (data?.sexCd != undefined && data?.speciesId != undefined) {
      setShowThanku(true);
    }
  };

  const handleStates = (states) => {
    context.updateStateFields({
      allStates: states.reduce((total, current) => {
        total[current.stateId] = current;
        return total;
      }, {}),
    });
  };

  useEffect(() => {
    // Get the query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Create the JSON input payload if necessary
      const urljson = { token: token };
      // Call the API with the token
      ClientServices.decodeJWTtoken(urljson)
        .then((response) => {
          console.log("JWT decoded successfully:", response);
          setClientDetails({
            clientId: response.clientId,
            primary: { email: response.email },
          });
          setPatientDetails({
            clientId: response.clientId,
            patientId: response.patientId,
          });
          patientId = response.patientId;
          return ClientServices.fetchClientById(
            response.clientId,
            handleClientData,
          );
        })
        .then((response2) => {
          console.log("clientfetch:", response2);
          return PatientServices.fetchPatientById(patientId, handlePatientData);
        })
        .then((response3) => {
          console.log("patientfetch:", response3);
          return CommonServices.getAllStatesInUS(handleStates);
        })
        .then((response4) => {
          console.log("resp:", response4);
        })
        .catch((error) => {
          console.error("Failed to complete the process:", error);
        });
    } else {
      console.error("No token found in the URL");
    }
  }, [showPatient]);

  return (
    <div className="ant-layout-content clientIntake">
      <div className="ant-card-cover ant-page-header">
        <HeaderLogo />
      </div>
      <div className="form-container">
        <Card
          className="form-card"
          bordered={true}
          title={
            showPatient
              ? showThanku
                ? "THANK YOU FOR UPDATING THE DETAILS!"
                : "Patient Intake Form"
              : "Client Intake Form"
          }
        >
          {!showThanku ? (
            <>
              {!showPatient && (
                <CreatEditClientDrawer
                  noDrawer={true}
                  clientData={clientDetails}
                  isEdit={true}
                  allStates={allStates}
                  onSuccessReturn={(isSuccess, showlist) => {
                    if (isSuccess) {
                      setShowPatient(true);
                    }
                    console.log("test", isSuccess);
                  }}
                />
              )}

              {showPatient && (
                <CreateEditPatientDrawer
                  noDrawer={true}
                  onClose={() => console.log("test")}
                  onSuccessReturn={() => {
                    console.log("testst");
                    setShowThanku(true);
                  }}
                  patientData={patientDetails}
                  isEdit={true}
                  patientDelete={() => {
                    console.log("delete");
                  }}
                  clientLastName={clientDetails?.primary?.lastName}
                />
              )}
            </>
          ) : (
            <div></div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ClientIntakeForm;
