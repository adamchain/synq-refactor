import React, { useState, useEffect } from "react";
import { Button, Drawer, Typography, Row, Col, Form, Card } from "antd";
import "./Treatments.scss";
import FormComponents from "./../generic-components/form-components/FormComponents";
import TreatmentFormConfig from "./TreatmentFormConfig";
import { HistoricalItemIcon } from "./../util/SvgUtil";
import InventoryServices from "../../services/InventoryServices";
import TreatmentServices from "./../../services/TreatmentServices";
import { momentLocal, utcToLocal } from "../util/TimeUtil";

const { Text, Link } = Typography;
const ItemCard = ({ type, doesExist, setOpenForm }) => {
  return (
    <Card
      className="treatment-item-card"
      onClick={() => setOpenForm({ type, doesExist })}
    >
      <Row justify="center" align="middle" gutter={[0, 8]}>
        <Col>
          <HistoricalItemIcon
            fillcolor="black"
            customStyle={{ width: "5em" }}
          />
        </Col>
      </Row>
      <Row justify="center" align="middle" gutter={[0, 8]}>
        <Col>
          <Text className="item-name" strong>
            {doesExist ? "Inventory" : "Historical"} Item
          </Text>
        </Col>
      </Row>
      {/* <Row justify = "center" align="middle"><Col><p className="item-name" style={{textAlign:"center"}}>Add a prior/existing{type==="Vaccine"?"vaccine":"item"} that is {doesExist?"":"not"} available at clinic to Medical Records</p></Col></Row> */}
      <Row justify="center" align="middle">
        <Col>
          <p className="item-name" style={{ textAlign: "center" }}>
            Add a prior/existing medication to this patient records
          </p>
        </Col>
      </Row>
    </Card>
  );
};

const TreatmentDrawer = ({ inputData, onClose, onSuccess }) => {
  const [openForm, setOpenForm] = useState(null);
  const [form] = Form.useForm();
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    InventoryServices.searchItemByType("I", setInventoryData);
    if (inputData.data) {
      let expiryDate = inputData.data.expiry
        ? utcToLocal(inputData.data.expiry, "YYYY-MM-DD")
        : null;

      let frameInputData = {
        doesExist: inputData.data.inventoryId ? true : false,
        isExpiryManual: false,
        expiryDate,
      };
      let formInputData = {
        inventoryId: inputData.data.inventoryId
          ? inputData.data.inventoryId
          : inputData.data.name,
        administered: inputData.data.administered
          ? utcToLocal(inputData.data.administered, "YYYY-MM-DD")
          : null,
        expiry: expiryDate,
        addToInvoice: inputData.data.addToInvoice,
        status: inputData.data.status ?? null,
      };
      form.setFieldsValue({ ...formInputData });
      setOpenForm(frameInputData);
    }
  }, [inputData.data]);

  useEffect(() => {
    if (inputData.data && inputData.data.inventoryId) {
      let item = inventoryData.find((k) => k.id === inputData.data.inventoryId);
      if (item) {
        setOpenForm((k) => ({ ...k, itemPrice: item.price }));
      }
    }
  }, [inventoryData]);

  const handleSubmit = (submitData) => {
    let submitFinalData = {
      patientId: inputData.patientId,
      apptId: inputData.apptId,
      administered: submitData.administered
        ? submitData.administered.format("YYYY-MM-DD")
        : "",
      expiry: submitData.expiry ? submitData.expiry.format("YYYY-MM-DD") : "",
      addToInvoice: submitData.addToInvoice ? true : false,
    };

    if (inputData.type === "Vaccine") {
      submitFinalData[openForm.doesExist ? "inventoryId" : "name"] =
        submitData.inventoryId;

      if (inputData.isEdit) {
        submitFinalData.id = inputData.data.id;
        TreatmentServices.updateVaccine(submitFinalData, onSuccess);
      } else {
        TreatmentServices.createVaccine(submitFinalData, onSuccess);
      }
    } else {
      submitFinalData[openForm.doesExist ? "inventoryId" : "name"] =
        submitData.inventoryId;
      submitFinalData.status = submitData.status;
      if (inputData.isEdit) {
        submitFinalData.id = inputData.data.id;
        TreatmentServices.updateMedication(submitFinalData, onSuccess);
      } else {
        TreatmentServices.createMedication(submitFinalData, onSuccess);
      }
    }
  };
  const onFormValueChange = (formValue) => {
    let key = Object.keys(formValue)[0];

    switch (key) {
      case "expirationSelect":
        {
          let isExpiryManual = formValue[key] === "OT";
          let administered = form.getFieldValue("administered");
          let expiryDate = isExpiryManual
            ? null
            : administered.clone().add(formValue[key], "year");
          form.setFieldsValue({ expiry: expiryDate });
          setOpenForm((k) => ({ ...k, isExpiryManual, expiryDate }));
        }
        break;

      case "inventoryId":
        {
          if (openForm.doesExist) {
            let item = inventoryData.find((k) => k.id === formValue[key]);
            if (item) {
              setOpenForm((k) => ({ ...k, itemPrice: item.price }));
            }
          }
        }
        break;
    }
  };
  const CustomizedItemLabel = ({ label }) => {
    return (
      <Row justify="space-between" style={{ width: "100%" }}>
        <Col>{label}</Col>
        <Col>
          <Link
            onClick={() =>
              setOpenForm((k) => ({ ...k, doesExist: !k.doesExist }))
            }
          >
            {openForm.doesExist ? "Item Not Stocked" : "Find Stocked Item"}
          </Link>
        </Col>
      </Row>
    );
  };

  const CustomizedAdministeredLabel = ({ label }) => {
    return (
      <Row justify="space-between" style={{ width: "100%" }}>
        <Col>{label}</Col>
        <Col>
          <Link
            onClick={() => {
              form.setFieldsValue({ administered: momentLocal() });
            }}
          >
            Today
          </Link>
        </Col>
      </Row>
    );
  };

  return (
    <Drawer
      className="treatment-drawer"
      title={(inputData.isEdit ? "Edit " : "Add ") + inputData.type}
      width={492}
      onClose={onClose}
      visible={true}
      bodyStyle={{ paddingBottom: 50 }}
      footer={
        <div className="footer-button">
          <Button onClick={onClose} shape="round" style={{ marginRight: 16 }}>
            Cancel
          </Button>
          {openForm && (
            <Button
              htmlType="submit"
              type="primary"
              form="treatment-form-id"
              size="large"
              shape="round"
            >
              {inputData.isEdit ? "Update " : "Add"}
            </Button>
          )}
        </div>
      }
    >
      {openForm ? (
        <Form
          id="treatment-form-id"
          form={form}
          onFinish={(values) => {
            handleSubmit(values);
            onClose();
          }}
          onValuesChange={onFormValueChange}
        >
          <Row gutter={[24, 0]}>
            {TreatmentFormConfig({
              inventoryData,
              administerdLabel: (label) => (
                <CustomizedAdministeredLabel label={label} />
              ),
              typeLabel: (label) => <CustomizedItemLabel label={label} />,
              itemPrice: openForm.itemPrice,
              doesExist: openForm.doesExist,
              isExpiryManual: openForm.isExpiryManual,
              expiryDate: openForm.expiryDate,
              isVaccine: inputData.type === "Vaccine",
            }).map((field, index) => FormComponents.getFormItem(field))}
          </Row>
        </Form>
      ) : (
        <Row gutter={[16, 0]}>
          {/* <Col span={12}><ItemCard setOpenForm = {setOpenForm} type={inputData.type} doesExist/></Col> */}
          <Col span={12}>
            <ItemCard setOpenForm={setOpenForm} type={inputData.type} />
          </Col>
        </Row>
      )}
    </Drawer>
  );
};
export default TreatmentDrawer;
