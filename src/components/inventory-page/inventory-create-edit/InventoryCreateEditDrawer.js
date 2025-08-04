import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  message,
  Row,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import InventroyCreateEditForm from "./InventoryCreateEditForm";

import InventoryServices from "../../../services/InventoryServices";
import LotServices from "../../../services/LotServices";
import {
  ExternalLabIcon,
  InternalLabIcon,
  InventoryItemIcon,
  ProcedureIcon,
} from "../../util/SvgUtil";
import { momentLocal } from "../../util/TimeUtil";

import { CommonContext } from "../../../context/CommonContext";
import InventoryReminders from "../../../services/InventoryReminders";
import AppointmentServices from "../../../services/AppointmentServices";

const { Text } = Typography;

var INVENTORY_KEY = { 1: "I", 2: "P", 3: "IL", 4: "EL" };
var INVENTORY_TYPE = {
  I: {
    name: "Inventory Item",
    value: 1,
    desc: ["This item has stock and on-", "hands associated to it."],
    icon: <InventoryItemIcon customStyle={{ width: "5em" }} />,
  },
  P: {
    name: "Procedure",
    value: 2,
    desc: ["This item covers service ", "costs surrounding ", "appointments."],
    icon: <ProcedureIcon customStyle={{ width: "5em" }} />,
  },
  IL: {
    name: "Internal Lab",
    value: 3,
    desc: [
      "This item is for pricing labs ",
      "that are used inside the ",
      "clinic for results.",
    ],
    icon: <InternalLabIcon customStyle={{ width: "5em" }} />,
  },
  EL: {
    name: "External Lab",
    value: 4,
    desc: [
      "This item is for labs that are ",
      "sent outside the clinic for ",
      "results.",
    ],
    icon: <ExternalLabIcon customStyle={{ width: "5em" }} />,
  },
};
const ItemCard = ({ inputData, doesExist, setOpenForm }) => {
  return (
    <Card className="inventory-item-card" onClick={setOpenForm}>
      <Row justify="center" align="middle" style={{ marginBottom: "8px" }}>
        <Col>{inputData.icon}</Col>
      </Row>
      <Row justify="center" align="middle" style={{ marginBottom: "8px" }}>
        <Col>
          <Text className="item-name" strong>
            {inputData.name}
          </Text>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col>
          <p className="item-name small-text" style={{ textAlign: "center" }}>
            {inputData.desc.join("")}
          </p>
        </Col>
      </Row>
    </Card>
  );
};
const InventoryCreateEditDrawer = (props) => {
  const context = useContext(CommonContext);
  if (context.defaultBranch.branchTypeId == 2) {
    INVENTORY_KEY = {
      1: "I",
      2: "P",
      // 3:"IL",4:"EL"
    };
    INVENTORY_TYPE = {
      I: {
        name: "Inventory Item",
        value: 1,
        desc: ["This item has stock and on-", "hands associated to it."],
        icon: <InventoryItemIcon customStyle={{ width: "5em" }} />,
      },
      P: {
        name: "Service",
        value: 2,
        desc: [
          "This item covers service ",
          "costs surrounding ",
          "appointments.",
        ],
        icon: <ProcedureIcon customStyle={{ width: "5em" }} />,
      },
      IL: {
        name: "Internal Lab",
        value: 3,
        desc: [
          "This item is for pricing labs ",
          "that are used inside the ",
          "clinic for results.",
        ],
        icon: <InternalLabIcon customStyle={{ width: "5em" }} />,
      },
      EL: {
        name: "External Lab",
        value: 4,
        desc: [
          "This item is for labs that are ",
          "sent outside the clinic for ",
          "results.",
        ],
        icon: <ExternalLabIcon customStyle={{ width: "5em" }} />,
      },
    };
  }

  const [form] = Form.useForm();
  const [avoidOptionalUnits, setAvoidOptionalUnits] = useState({
    alertAtQty: true,
    markup: true,
    vaccineUnits: true,
    rxUnits: true,
    irUnits: true,
    crUnits: true,
    showLots: false,
    showVaccineExpiry: false,
    showRxExpiryDate: false,
    showLinkedItem: false,
    discountType: "",
  });
  const [selectedType, setSelectedType] = useState("I");
  const [openForm, setOpenForm] = useState(null);
  const [invData, setInvData] = useState([]);
  const [invCatData, setInvCatData] = useState([]);

  const onLotsChange = () => {
    let lots = form.getFieldValue("lots");

    if (lots && lots.length > 0) {
      let tempData = lots[0];
      if (lots.length > 1) {
        tempData = lots.find((k) => k.active);
        if (!tempData) {
          tempData = lots.find(
            (k) =>
              k.expiryDate.isSameOrAfter(momentLocal()) &&
              (k.qty ? Number.parseInt(k.qty) > 0 : false),
          );
        }
      }
      if (tempData) {
        form.setFieldsValue({
          mfr: tempData.manufacturer,
          price: tempData.price,
          cost: tempData.cost,
          rxPrescription: {
            lotExpirationDate: tempData.expiryDate,
            lot: tempData.lotNumber,
          },
          vaccine: {
            lotExpirationDate: tempData.expiryDate,
            lot: tempData.lotNumber,
          },
        });
        //setAvoidOptionalUnits(k=>({...k,showRxExpiryDate:true}))
      }
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      rMethod: "$",
      sTax: true,
      isVaccine: false,
      isRxPrescription: false,
      isInternalReminders: false,
      isCallbackReminders: false,
      vaccine: { rabies: false },
      sFee: 0.0,
      linkInventory: false,
      euthanasia: false,
      alterSex: false,
      invoiceHide: false,
      showonwebsite: false,
      showduration: false,
      showprice: false,
      saveAppointment: false,
      discountType: "",
      detail: { microchip: false, useLots: false, onHand: 0 },
    });

    if (props.inventoryData) {
      let inventoryCopy = JSON.parse(JSON.stringify(props.inventoryData));
      inventoryCopy.lots = inventoryCopy.lots?.map((k) => ({
        ...k,
        expiryDate: k.expiryDate
          ? momentLocal(k.expiryDate, "YYYY-MM-DD")
          : null,
      }));
      LotServices.getLotByInventoryId(inventoryCopy.id, (data) =>
        form.setFieldsValue({
          lots: data.map((k) => ({
            ...k,
            expiryDate: k.expiryDate
              ? momentLocal(k.expiryDate, "YYYY-MM-DD")
              : null,
          })),
        }),
      );
      InventoryReminders.getInventoryRemindersByInventoryId(
        inventoryCopy.id,
        (data) => form.setFieldsValue({ reminders: data }),
      );

      if (inventoryCopy.rxPrescription?.lotExpirationDate) {
        inventoryCopy.rxPrescription.lotExpirationDate = momentLocal(
          inventoryCopy.rxPrescription.lotExpirationDate,
          "YYYY-MM-DD",
        );
        //inventoryCopy.rxPrescription.expirationId = 8;
      }
      if (inventoryCopy.vaccine?.lotExpirationDate) {
        inventoryCopy.vaccine.lotExpirationDate = momentLocal(
          inventoryCopy.vaccine.lotExpirationDate,
          "YYYY-MM-DD",
        );
        //inventoryCopy.rxPrescription.expirationId = 8;
      }
      if (inventoryCopy.vaccine?.expiryDate) {
        inventoryCopy.vaccine.expiryDate = momentLocal(
          inventoryCopy.vaccine.expiryDate,
          "YYYY-MM-DD",
        );
        inventoryCopy.rxPrescription.period = 8;
      }

      form.setFieldsValue({
        ...inventoryCopy,
        isVaccine: Object.keys(inventoryCopy.vaccine ?? {}).length > 1,
        isRxPrescription: inventoryCopy.rxPrescription?.expirationId
          ? true
          : false,
        discountType: inventoryCopy.discountType ?? "",
      });
      // onFormValueChange({detail:{alertQty:inventoryCopy.detail.alertQty}})
      onFormValueChange({
        rMethod: inventoryCopy.rMethod ? inventoryCopy.rMethod : "$",
      });

      onFormValueChange({
        isVaccine: Object.keys(inventoryCopy.vaccine ?? {}).length > 1,
      });
      onFormValueChange({ vaccine: { period: inventoryCopy.vaccine?.period } });
      onFormValueChange({
        isRxPrescription: inventoryCopy.rxPrescription?.expirationId
          ? true
          : false,
      });
      onFormValueChange({
        rxPrescription: {
          expirationId: inventoryCopy.rxPrescription?.expirationId,
        },
      });
      onFormValueChange({ linkInventory: inventoryCopy.linkInventory });
      onFormValueChange({ euthanasia: inventoryCopy.euthanasia });
      onFormValueChange({ detail: { useLots: inventoryCopy.detail?.useLots } });
      onFormValueChange({ discountType: inventoryCopy.discountType });
      setOpenForm({ type: props.inventoryData.type });
    }
  }, [props.inventoryData]);

  useEffect(() => {
    if (openForm) {
      setSelectedType(INVENTORY_KEY[openForm.type]);

      form.setFieldsValue({
        type: openForm.type,
        status: props.inventoryData?.status ?? true,
      });
    }
  }, [openForm]);

  const fetchAllInventoryCategories = () => {
    InventoryServices.getInventoryCategories(setInvCatData);
  };
  useEffect(() => {
    fetchAllInventoryCategories();
  }, []);

  useEffect(() => {
    if (props.staticInvData) {
      setInvData(props.staticInvData);
    }
    // }else{
    //     if(selectedType === 'P' && invData.length === 0)
    //         InventoryServices.getAllInventory(setInvData);
    // }
  }, [props.staticInvData]);

  useEffect(() => {
    if (!props.isEdit) {
      let stax = selectedType === "P" ? false : true;
      form.setFieldsValue({ sTax: stax });
    }
  }, [selectedType]);

  const onClose = () => props.onClose();
  const handleSubmit = (submitData) => {
    if (submitData.vaccine?.expiryDate) {
      submitData.vaccine.expiryDate =
        submitData.vaccine.expiryDate.format("YYYY-MM-DD");
    }
    if (submitData.rxPrescription?.lotExpirationDate) {
      submitData.rxPrescription.lotExpirationDate =
        submitData.rxPrescription.lotExpirationDate.format("YYYY-MM-DD");
    }
    if (submitData.vaccine?.lotExpirationDate) {
      submitData.vaccine.lotExpirationDate =
        submitData.vaccine.lotExpirationDate.format("YYYY-MM-DD");
    }

    if (submitData.saveAppointment && submitData?.pName?.length > 30) {
      message.error(
        "Appointment Type name text cannot be greater than 30 characters!",
      );
    } else {
      if (props?.inventoryData?.id) {
        let tempSumbitData = { ...submitData };
        delete tempSumbitData.lots;
        delete tempSumbitData.reminders;

        InventoryServices.updateInventory(
          { ...tempSumbitData, id: props.inventoryData.id },
          props.onSuccessReturn,
        );
        if (submitData.saveAppointment) {
          let updateData = {
            apptName: props.oldPName,
            apptUpdatedName: submitData.pName,
          };
          AppointmentServices.updateApptType(updateData, (res) => {
            console.log("appt type updated-", res);
            if (res?.includes("No ApptType found to update")) {
              let inputData = {
                apptTypeName: submitData.pName,
                apptLength: submitData.duration ? submitData.duration : 30,
                saveAppointment: true,
              };
              AppointmentServices.createApptType(inputData, (res) =>
                console.log("appt type created-", res),
              );
            }
          });
        } else {
          AppointmentServices.deleteApptType(
            { apptTypeName: submitData.pName, apptLength: submitData.duration },
            (res) => console.log("appt type deleted-", res),
          );
        }
      } else {
        if ((submitData.lots ?? []).length > 0) {
          submitData.lots.forEach(
            (k) =>
              (k.expiryDate = k.expiryDate
                ? k.expiryDate.format("YYYY-MM-DD")
                : null),
          );
        }

        InventoryServices.createInventory(submitData, props.onSuccessReturn);
        if (submitData.saveAppointment) {
          let inputData = {
            apptTypeName: submitData.pName,
            apptLength: submitData.duration ? submitData.duration : 30,
          };
          AppointmentServices.createApptType(inputData, (res) =>
            console.log("appt type created-", res),
          );
        }
      }
      //alert(JSON.stringify(submitData));
    }
  };

  const onFormValueChange = (formValue) => {
    let key = Object.keys(formValue)[0];
    switch (key) {
      // case "lowAlert" :
      // setAvoidOptionalUnits(k=>({...k,alertAtQty:!formValue[key]}));
      // break;
      case "rMethod":
        setAvoidOptionalUnits((k) => ({
          ...k,
          markup: formValue[key] === "$",
        }));
        break;
      case "linkInventory":
        setAvoidOptionalUnits((k) => ({
          ...k,
          showLinkedItem: formValue[key],
        }));
        break;
      case "isVaccine":
        setAvoidOptionalUnits((k) => ({ ...k, vaccineUnits: !formValue[key] }));
        break;
      case "isRxPrescription":
        setAvoidOptionalUnits((k) => ({ ...k, rxUnits: !formValue[key] }));
        break;
      case "isInternalReminders":
        setAvoidOptionalUnits((k) => ({ ...k, irUnits: !formValue[key] }));
        break;
      case "isCallbackReminders":
        setAvoidOptionalUnits((k) => ({ ...k, crUnits: !formValue[key] }));
        break;
      case "type":
        setSelectedType(INVENTORY_KEY[formValue[key]]);
        break;
      case "detail":
        if (formValue.detail.hasOwnProperty("useLots")) {
          setAvoidOptionalUnits((k) => ({
            ...k,
            showLots: formValue.detail.useLots,
          }));
          if (formValue.detail.useLots) {
            onLotsChange();
          }
        }
        break;
      case "lots":
        onLotsChange();

        break;
      case "markPer":
        let cost = Number.parseFloat(form.getFieldValue("cost"));
        let retail = (cost * Number.parseFloat(formValue[key])) / 100;
        retail = retail + cost;
        form.setFieldsValue({ price: retail.toFixed(2) });
        break;
      case "vaccine":
        if (formValue.vaccine.hasOwnProperty("period")) {
          setAvoidOptionalUnits((k) => ({
            ...k,
            showVaccineExpiry: formValue.vaccine.period === 8,
          }));
        }
        break;
      case "rxPrescription":
        if (formValue.rxPrescription.hasOwnProperty("expirationId")) {
          setAvoidOptionalUnits((k) => ({
            ...k,
            showRxExpiryDate: formValue.rxPrescription.expirationId === 8,
          }));
        }
        break;

      case "discountType":
        let value = formValue[key] ?? "";
        if (value) {
          setTimeout(() => {
            setAvoidOptionalUnits((k) => ({ ...k, discountType: value }));
          }, 100);
        }
        setAvoidOptionalUnits((k) => ({ ...k, discountType: "" }));

        break;
    }
  };

  return (
    <Drawer
      className="inventory-edit-profile"
      title={props.isEdit ? "Edit Item" : "Add Item"}
      width={550}
      onClose={onClose}
      visible={true}
      bodyStyle={{ paddingBottom: 50 }}
      footer={
        <div className="footer-button">
          {openForm ? (
            <>
              {" "}
              <Button
                onClick={onClose}
                shape="round"
                style={{ marginRight: 16 }}
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                form="inventory-form-id"
                type="primary"
                size="large"
                shape="round"
              >
                {props.isEdit ? "Update" : "Save"}
              </Button>{" "}
            </>
          ) : (
            <Button onClick={onClose} type="primary" size="large" shape="round">
              {" "}
              Cancel{" "}
            </Button>
          )}
        </div>
      }
    >
      {openForm ? (
        <InventroyCreateEditForm
          manager={props.manager}
          fetchAllInventoryCategories={(id) => {
            fetchAllInventoryCategories();
            form.setFieldsValue({ categoryId: id });
          }}
          inventoryId={props?.inventoryData?.id}
          inventoryForm={form}
          handleSubmit={handleSubmit}
          invData={invData}
          onFormValueChange={onFormValueChange}
          allSpecies={props.allSpecies}
          avoidOptionalUnits={avoidOptionalUnits}
          invCatData={invCatData}
          selectedType={selectedType}
        />
      ) : (
        <Row gutter={[16, 0]}>
          {Object.values(INVENTORY_KEY).map((k) => (
            <Col span={12} style={{ marginBottom: "16px" }}>
              <ItemCard
                setOpenForm={() =>
                  setOpenForm({ type: INVENTORY_TYPE[k].value })
                }
                inputData={INVENTORY_TYPE[k]}
              />
            </Col>
          ))}
        </Row>
      )}
    </Drawer>
  );
};
export default InventoryCreateEditDrawer;
