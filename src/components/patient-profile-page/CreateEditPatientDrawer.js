import React, { useState, useEffect, useContext } from "react";
import { Button, Drawer, Form, Alert, message, Checkbox } from "antd";
import PatientCreateEditForm from "./patient-create-edit-form/PatientCreateEditForm";

import PatientServices from "./../../services/PatientServices";

import ProfileImageUpload from "../generic-components/profile-image/ProfileImageUpload";
import CommonUtil from "../util/CommonUtil";
import { CommonContext } from "../../context/CommonContext";
import PriceUtil from "../util/PriceUtil";
import NewUploadModal from "../appointment-details/upload/NewUploadModal";
import AppointmentServices from "../../services/AppointmentServices";
import config from "../../config";

const CreateEditPatientDrawer = (props) => {
  const [requiredInputData, setRequiredInputData] = useState({
    familyList: [],
    speciesList: [],
    breedList: [],
    colorList: [],
    statusList: [],
    doctorsList: [],
    clientLastName: "",
  });
  const [form] = Form.useForm();
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const commonContext = useContext(CommonContext);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploadDone, setIsUploadDone] = useState(false);
  const [sendMail, setSendMail] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      weightUnitCd: "LBS",
      insurance: false,
      weightEstimated: false,
      clientLastName: props.clientLastName,
    });

    if (props.patientData) {
      form.setFieldsValue(props.patientData);
      PatientServices.fetchBreedByFamily(props.patientData.familyId, (data) =>
        setRequiredInputData((k) => ({ ...k, breedList: data })),
      );
      PatientServices.fetchColorByBreed(props.patientData.colorId, (data) =>
        setRequiredInputData((k) => ({ ...k, colorList: data })),
      );
      PatientServices.fetchSpeciesByFamily(props.patientData.familyId, (data) =>
        setRequiredInputData((k) => ({ ...k, speciesList: data })),
      );
      //setRequiredInputData(k=>({...k,clientLastName:props.patientData.clientLastName}));
      setRequiredInputData((k) => ({
        ...k,
        insurance: props.patientData?.insurance,
      }));
    }
    PatientServices.fetchAnimalFamily((data) =>
      setRequiredInputData((k) => ({ ...k, familyList: data })),
    );
  }, [props.patientData]);

  useEffect(() => {
    PatientServices.fetchPatientStatus((data) =>
      setRequiredInputData((k) => ({ ...k, statusList: data })),
    );
    PatientServices.fetchPrimaryDoctosForPatient((data) =>
      setRequiredInputData((k) => ({ ...k, doctorsList: data })),
    );
  }, []);

  const onClose = () => props.onClose();
  const handleSubmit = (submitData) => {
    if (submitData.freeForm) {
      submitData.freeForm = Object.keys(submitData.freeForm)
        .filter((k) => submitData.freeForm[k])
        .map((k) => ({
          code: CommonUtil.FREEFORM_STRING_ID_CONV[k].value,
          value: submitData.freeForm[k],
        }));
    }
    if (submitData.dob) {
      submitData.dob = submitData.dob.format("YYYY-MM-DD");
    }

    if (submitData.weight) {
      submitData.weight = PriceUtil.convertFloat(submitData.weight);
    }

    //console.log(JSON.stringify(submitData));
    if (props?.patientData?.patientId) {
      let callPatientEdit = () =>
        PatientServices.updatePatient(
          {
            ...submitData,
            patientId: props.patientData.patientId,
            clientId: props.patientData.clientId,
          },
          props.onSuccessReturn,
        );

      if (uploadPhoto) {
        PatientServices.uploadPatientPic(
          props.patientData.patientId,
          uploadPhoto,
          () => {
            callPatientEdit();
          },
        );
      } else {
        callPatientEdit();
      }
      //ClientServices.updateClient({...submitData , clientId : props.clientData.clientId} , props.onSuccessReturn);
    } else {
      console.log("submitData--", props);
      if (sendMail) {
        const newPatient = {
          clientId: props.clientId,
          patientName: submitData.patientName,
        };
        console.log("newPatient", newPatient);
        AppointmentServices.createInstantPatient(newPatient)
          .then((registerResponse) => {
            const jwtPayload = {
              email: props.clientEmail,
              patientId: registerResponse,
              clientId: props.clientId,
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
        PatientServices.createPatient(
          { ...submitData, clientId: props.clientId },
          uploadPhoto,
          props.onSuccessReturn,
          commonContext.updateStateFields,
        );
      }
    }

    onClose();
  };

  const onFormValueChange = (formValue) => {
    let key = Object.keys(formValue)[0];
    switch (key) {
      case "familyId":
        form.setFieldsValue({ breedId: null, speciesId: null });
        PatientServices.fetchBreedByFamily(formValue[key], (data) => {
          setRequiredInputData((k) => ({ ...k, breedList: data }));
          if (formValue[key] === 1) {
            form.setFieldsValue({ speciesId: 22 });
          }
          if (formValue[key] === 3) {
            form.setFieldsValue({ speciesId: 25 });
          }
        });
        PatientServices.fetchSpeciesByFamily(formValue[key], (data) =>
          setRequiredInputData((k) => ({ ...k, speciesList: data })),
        );
        break;
      case "breedId":
        form.setFieldsValue({ colorId: null });
        PatientServices.fetchColorByBreed(formValue[key], (data) =>
          setRequiredInputData((k) => ({ ...k, colorList: data })),
        );
        break;
      case "insurance":
        setRequiredInputData((k) => ({ ...k, insurance: formValue[key] }));
        break;
    }
  };

  const aspect_ratio = (val, lim) => {
    var lower = [0, 1];
    var upper = [1, 0];

    while (true) {
      var mediant = [lower[0] + upper[0], lower[1] + upper[1]];

      if (val * mediant[1] > mediant[0]) {
        if (lim < mediant[1]) {
          return upper;
        }
        lower = mediant;
      } else if (val * mediant[1] == mediant[0]) {
        if (lim >= mediant[1]) {
          return mediant;
        }
        if (lower[1] < upper[1]) {
          return lower;
        }
        return upper;
      } else {
        if (lim < mediant[1]) {
          return lower;
        }
        upper = mediant;
      }
    }
  };
  const _url = (file, updateData) => {
    let img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      let orgWidth = img.width;
      let orgHeight = img.height;
      //let {first,second} = findDimension(orgWidth,orgHeight);
      let a = aspect_ratio(orgWidth / orgHeight);
      updateData((k) => [
        ...k,
        {
          realName: file.name,
          src: window.URL.createObjectURL(file),
          width: a[0],
          height: a[1],
        },
      ]);
    };
  };

  return props?.noDrawer ? (
    <>
      <ProfileImageUpload
        onUpload={(file) => setUploadPhoto(file)}
        //    onUpload={(file,onSuccess) => PatientServices.uploadPatientPic(props.patientData.patientId,file,()=>{onSuccess("done");message.success("Uploaded Succesfully");props.onSuccessReturn()})}
        imageSrc={props.patientData?.image}
      />
      <PatientCreateEditForm
        patientform={form}
        handleSubmit={handleSubmit}
        onFormValueChange={onFormValueChange}
        requiredInputData={requiredInputData}
        isEdit={props.isEdit}
        noDrawer={props?.noDrawer}
      />

      <Button
        ghost
        shape="round"
        size="small"
        type="primary"
        style={{ minWidth: "130px", marginBottom: "20px" }}
        onClick={() => {
          setIsUploadModalOpen(true);
        }}
      >
        Upload Docs
      </Button>

      {isUploadDone && (
        <Alert
          message="Please submit the form once documents are uploaded!"
          type="success"
          showIcon
          style={{ marginTop: "10px", marginBottom: "10px" }}
        />
      )}

      {isUploadModalOpen && (
        <NewUploadModal
          patientId={props.patientData.patientId}
          _url={_url}
          onClose={() => {
            setIsUploadModalOpen(false);
          }}
          onSuccess={() => {
            setIsUploadDone(true);
          }}
        />
      )}

      <div className="footer-button">
        <Button
          className="ant-btn ant-btn-primary ant-btn-lg"
          htmlType="submit"
          form="patient-form-id"
          type="primary"
          size="large"
        >
          Submit
        </Button>
      </div>
    </>
  ) : (
    <Drawer
      className="client-edit-profile"
      title={props.isEdit ? "Edit Patient" : "Add Patient"}
      width={473}
      onClose={onClose}
      visible={true}
      bodyStyle={{ paddingBottom: 50 }}
      footer={
        <>
          {!props.isEdit && (
            <Checkbox
              onChange={() => {
                setSendMail((sendMail) => !sendMail);
              }}
              style={{
                marginBottom: 16,
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              Send Email
            </Checkbox>
          )}
          <div className="footer-button">
            {/* <Button
                        className="drawerAltButton"
                        size="large"
                        type="link"
                        style={{ marginRight: 8 }}>
                        Merge Profile
                        </Button> */}
            <Button
              shape="round"
              size="large"
              onClick={onClose}
              style={{ marginRight: 16 }}
            >
              Close
            </Button>
            <Button
              htmlType="submit"
              form="patient-form-id"
              type="primary"
              size="large"
              shape="round"
            >
              {props.isEdit ? "Update" : "Save"}
            </Button>
          </div>
        </>
      }
    >
      <ProfileImageUpload
        onUpload={(file) => setUploadPhoto(file)}
        //    onUpload={(file,onSuccess) => PatientServices.uploadPatientPic(props.patientData.patientId,file,()=>{onSuccess("done");message.success("Uploaded Succesfully");props.onSuccessReturn()})}
        imageSrc={props.patientData?.image}
      />
      <PatientCreateEditForm
        patientform={form}
        handleSubmit={handleSubmit}
        onFormValueChange={onFormValueChange}
        requiredInputData={requiredInputData}
        isEdit={props.isEdit}
        sendMail={sendMail}
        patientDelete={() => {
          PatientServices.deletePatient(
            props.patientData.patientId,
            props.patientDelete,
            commonContext.updateStateFields,
          );
        }}
      />
    </Drawer>
  );
};
export default CreateEditPatientDrawer;
