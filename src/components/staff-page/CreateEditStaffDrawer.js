import React, { useEffect, useState, useContext } from "react";
import { Button, Drawer, Form, message } from "antd";
import StaffProfileForm from "./create-edit-staff-form/StaffCreateEditForm";
import StaffServices from "../../services/StaffServices";
import CommonServices from "../../services/CommonServices";
import ProfileImageUpload from "../generic-components/profile-image/ProfileImageUpload";
import { CommonContext } from "../../context/CommonContext";

const CreateEditStaffDrawer = (props) => {
  const [form] = Form.useForm();
  const context = useContext(CommonContext);
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [requiredInputData, setRequiredInputData] = useState({
    status: "A",
    takeAppt: true,
    pay: "S",
    doctor: false,
  });

  useEffect(() => {
    form.setFieldsValue({
      status: "A",
      takeAppt: true,
      pay: "S",
      doctor: false,
    });

    if (props.staffData && props.isEdit) {
      form.setFieldsValue(props.staffData);
      setRequiredInputData((k) => ({ ...k, doctor: props.staffData?.doctor }));
    }
  }, [props.staffData]);

  const onClose = () => props.onClose();

  const handleSubmit = (submitData) => {
    if (props.isEdit) {
      let callStaffEdit = () =>
        StaffServices.updateStaff(
          { ...submitData, userId: props.staffData.userId },
          (isStatus) =>
            isStatus === true ? props.onSuccessReturn() : () => {},
        );
      if (uploadPhoto) {
        StaffServices.uploadStaffPic(
          props.staffData.userId,
          uploadPhoto,
          () => {
            callStaffEdit();
          },
        );
      } else {
        callStaffEdit();
      }
    } else {
      StaffServices.createStaff(submitData, (isStatus) =>
        isStatus === true ? props.onSuccessReturn() : () => {},
      );
    }
    //console.log('Staff handleSubmit', JSON.stringify(submitData))
  };

  const deleteStaff = () => {
    StaffServices.deleteStaff(props.staffData.userId, () => {
      props.onSuccessReturn();
      props.onStaffDelete();
    });
  };

  const onFormValueChange = (formValue) => {
    let key = Object.keys(formValue)[0];
    switch (key) {
      case "doctor":
        setRequiredInputData((k) => ({ ...k, doctor: formValue[key] }));
    }
  };

  return (
    <Drawer
      className="staff-profile"
      title={props.isEdit ? "Staff Settings" : "Create Staff"}
      width={473}
      onClose={onClose}
      visible={true}
      bodyStyle={{ paddingBottom: 50 }}
      footer={
        <div className="footer-button">
          <Button
            onClick={onClose}
            shape="round"
            size="large"
            style={{ marginRight: 16 }}
          >
            {props.isEdit ? "Close" : "Cancel"}
          </Button>
          <Button
            className="update-create-btn"
            htmlType="submit"
            form="staff-form-id"
            type="primary"
            shape="round"
            size="large"
          >
            {props.isEdit ? "Update" : "Create Account"}
          </Button>
        </div>
      }
    >
      {props.isEdit && (
        <ProfileImageUpload
          // onUpload={(file,onSuccess) => StaffServices.uploadStaffPic(props.staffData.userId,file,()=>{onSuccess("done");message.success("Uploaded Succesfully");props.onSuccessReturn()})}
          imageSrc={props.staffData?.image}
          fullName={
            props.staffData?.firstName + " " + props.staffData?.lastName
          }
          onUpload={(file) => setUploadPhoto(file)}
        />
      )}
      <StaffProfileForm
        requiredInputData={requiredInputData}
        onFormValueChange={onFormValueChange}
        isLeader={true}
        staffForm={form}
        handleSubmit={handleSubmit}
        isEdit={props.isEdit}
        allStates={context.allStates}
        deleteStaff={deleteStaff}
      ></StaffProfileForm>
    </Drawer>
  );
};
export default CreateEditStaffDrawer;
