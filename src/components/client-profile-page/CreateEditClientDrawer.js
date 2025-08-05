import React, { useEffect, useContext, useState } from "react";
import { Button, Drawer, Form, Checkbox } from "antd";
import ClientProfileForm from "./client-create-edit-form/ClientCreateEditForm";
import ClientServices from "../../services/ClientServices";
import { CommonContext } from "../../context/CommonContext";
import AppointmentServices from "../../services/AppointmentServices";
import config from "../../config";

const CreatEditClientDrawer = (props) => {
  const [sendMail, setSendMail] = useState(false);
  const [form] = Form.useForm();
  const commonContext = useContext(CommonContext);
  let patientId, clientId;

  useEffect(() => {
    form.setFieldsValue({
      allowEmail: true,
      clientStatus: "A",
      allowText: true,
      optInReminder: true,
      taxExempt: false,
      discount: { type: "$" },
    });
    if (props.clientData) {
      form.setFieldsValue({ ...props.clientData });
    }
  }, [props.clientData]);

  const onClose = () => props.onClose();
  const handleSubmit = (submitData) => {
    if (submitData.phones) {
      submitData.phones = Object.keys(submitData.phones)
        .filter((k) => submitData.phones[k])
        .map((k) => ({
          type: k,
          nbr: submitData.phones[k],
          preferred: submitData.prefferedPhone === k,
        }));
    }
    if (props?.clientData?.clientId) {
      ClientServices.updateClient(
        { ...submitData, clientId: props.clientData.clientId },
        (isSuccess) =>
          isSuccess === true
            ? props.onSuccessReturn(isSuccess, false)
            : () => {},
      );
    } else {
      if (sendMail) {
        console.log("submitData--", submitData);
        const newPatient = {
          email: submitData.primary.email,
          clientName: submitData.primary.firstName,
          patientName: submitData.primary.lastName,
        };
        console.log("newPatient", newPatient);
        AppointmentServices.createClientPatient(newPatient)
          .then((response) => {
            patientId = response.patientId;
            clientId = response.clientId;

            return AppointmentServices.createClientRegister(newPatient);
          })
          .then((registerResponse) => {
            const jwtPayload = {
              email: newPatient.email,
              patientId: patientId,
              clientId: clientId,
              url: `${config.base_url}/client-intake`,
            };
            return AppointmentServices.createJWTtoken(jwtPayload);
          })
          .then((jwtResponse) => {
            console.log("Patient added successfully", jwtResponse);
            onClose();
          })
          .catch((error) => {
            console.error("Failed to complete the process:", error);
          });
      } else {
        let inputData = submitData;
        inputData.branchId = commonContext?.defaultBranch?.branchId;
        inputData.orgId = commonContext?.defaultBranch?.orgId;
        ClientServices.createClientAsPatient(
          inputData,
          (isSuccess) =>
            isSuccess === true
              ? props.onSuccessReturn(isSuccess, false)
              : () => {},
          commonContext.updateStateFields,
        );
        let clientData = {
          email: submitData.primary.email,
          name: submitData.primary.firstName,
          branchId: commonContext?.defaultBranch?.branchId,
          orgId: commonContext?.defaultBranch?.orgId,
        };
        ClientServices.registerNewClient(clientData, () => {
          console.log("success!");
        });
      }
    }
    //alert(JSON.stringify(submitData))
  };

  return (
    <>
      {props?.noDrawer ? (
        <>
          <ClientProfileForm
            noDrawer={props?.noDrawer}
            clientData={props.clientData}
            clientform={form}
            handleSubmit={handleSubmit}
            isEdit={props.isEdit}
            allStates={props.allStates}
            clientDelete={() => {
              ClientServices.deleteClient(
                props.clientData.clientId,
                (isSuccess) => props.onSuccessReturn(isSuccess, true),
                commonContext.updateStateFields,
              );
            }}
          ></ClientProfileForm>
          <div className="footer-button">
            <Button
              className="ant-btn ant-btn-primary ant-btn-lg"
              htmlType="submit"
              form="client-form-id"
              type="primary"
              size="large"
            >
              Submit and Add Patient
            </Button>
          </div>
        </>
      ) : (
        <Drawer
          className="client-edit-profile"
          title={props.isEdit ? "Edit Client" : "Add Client"}
          width={473}
          onClose={onClose}
          visible={true}
          bodyStyle={{ paddingBottom: 50 }}
          footer={
            <div>
              {/* {!props.isEdit && <Checkbox onChange={()=>{setSendMail(sendMail=> !sendMail)}} style={{ marginBottom: 16,width: "100%", justifyContent: "flex-end" }}>Send Email</Checkbox>} */}
              <div className="footer-button">
                {/* <Button
                        type="link"
                        size="large"
                        className="drawerAltButton"
                                style={{marginRight: 8}}>
                            Merge Profile
                        </Button> */}
                <Button
                  shape="round"
                  size="large"
                  onClick={onClose}
                  style={{ marginRight: 16 }}
                >
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  form="client-form-id"
                  type="primary"
                  size="large"
                  shape="round"
                >
                  {props.isEdit ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          }
        >
          {/* <ProfileImageUpload/> */}
          <ClientProfileForm
            sendMail={sendMail}
            clientData={props.clientData}
            clientform={form}
            handleSubmit={handleSubmit}
            isEdit={props.isEdit}
            allStates={props.allStates}
            clientDelete={() => {
              ClientServices.deleteClient(
                props.clientData.clientId,
                (isSuccess) => props.onSuccessReturn(isSuccess, true),
                commonContext.updateStateFields,
              );
            }}
          ></ClientProfileForm>
        </Drawer>
      )}
    </>
  );
};

export default CreatEditClientDrawer;
