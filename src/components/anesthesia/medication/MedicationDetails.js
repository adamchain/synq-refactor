import React, { useState } from "react";
import MedicationCard from "./MedicationCard";
import { Col, Row, Typography, Button, Divider } from "antd";
import { useEffect } from "react";
import MedicationDrawer from "./MedicationDrawer";
import MedicationServices from "../../../services/MedicationServices";

const { Title, Text } = Typography;

const MEDICATION_TYPES = [
  { label: "Premeds", buttonName: "Add Premed" },
  { label: "Induction", buttonName: "Add Induction Med" },
  { label: "Emergency Drugs", buttonName: "Add Emergency Drug" },
  { label: "Emergency Fluids", buttonName: "Add Emergency Fluid" },
  { label: "Other Meds", buttonName: "Add Other Med" },
];

const useDynamicUseEffect = () => {
  const [data, setData] = useState([]);
  return { data, setData };
};

const MedicationDetails = (props) => {
  const orderTypes = [
    "premeds",
    "induction",
    "emergencyDrugs",
    "emergencyFluids",
    "otherMeds",
  ];
  const MEDICATION_TYPES = {
    premeds: {
      label: "Premeds",
      buttonName: "Premed",
      items: useDynamicUseEffect(),
      value: 1,
    },
    induction: {
      label: "Induction",
      buttonName: "Induction Med",
      items: useDynamicUseEffect(),
      value: 2,
    },
    emergencyDrugs: {
      label: "Emergency Drugs",
      buttonName: "Emergency Drug",
      items: useDynamicUseEffect(),
      value: 3,
    },
    emergencyFluids: {
      label: "Emergency Fluids",
      buttonName: "Emergency Fluid",
      items: useDynamicUseEffect(),
      value: 4,
    },
    otherMeds: {
      label: "Other Meds",
      buttonName: "Other Med",
      items: useDynamicUseEffect(),
      value: 5,
    },
  };
  const [drawerData, setDrawerData] = useState(null);

  const updateMedicationDetails = (type, data) => {
    if (type === "ALL") {
      let typedata = data.reduce((total, current) => {
        if (total.hasOwnProperty(current.type)) {
          total[current.type].push(current);
        } else {
          total[current.type] = [current];
        }
        return total;
      }, {});
      Object.values(MEDICATION_TYPES).forEach((k) =>
        k.items.setData(typedata[k.value] ?? []),
      );
    } else {
      MEDICATION_TYPES[type].items.setData(data);
    }
  };

  useEffect(() => {
    MedicationServices.getMedicationByApptId(props.apptId, (data) =>
      updateMedicationDetails("ALL", data),
    );
  }, []);

  const onAddOrUpdate = (type, isEdit, data) => {
    let submitdata = {
      ...data,
      apptId: props.apptId,
      patientId: props.patientId,
      type: MEDICATION_TYPES[type].value,
    };

    if (!isEdit) {
      //MEDICATION_TYPES[type].items.setData(k=>[...k,{...data,id:k.length}]);
      MedicationServices.createMedication(submitdata, () =>
        MedicationServices.getMedicationByApptIdandTypeId(
          props.apptId,
          MEDICATION_TYPES[type].value,
          (data) => updateMedicationDetails(type, data),
        ),
      );
    } else {
      //MEDICATION_TYPES[type].items.setData(k=>[...k].map(j=>j.id === data.id?data:j));
      MedicationServices.updateMedication(submitdata, () =>
        MedicationServices.getMedicationByApptIdandTypeId(
          props.apptId,
          MEDICATION_TYPES[type].value,
          (data) => updateMedicationDetails(type, data),
        ),
      );
    }
    //alert(JSON.stringify(data));

    setDrawerData(null);
  };
  const onDelete = (id, type) => {
    MedicationServices.deleteMedication(id, () =>
      MedicationServices.getMedicationByApptIdandTypeId(
        props.apptId,
        MEDICATION_TYPES[type].value,
        (data) => updateMedicationDetails(type, data),
      ),
    );
  };
  return (
    <>
      {orderTypes.map((type) => {
        let k = MEDICATION_TYPES[type];
        return (
          <>
            <Row gutter={[0, 8]} className="table-title-top">
              <Col>
                <Title level={5}>{k.label}</Title>
              </Col>
            </Row>
            {k.items.data.map((j) => (
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <MedicationCard
                    input={j}
                    onDelete={() => onDelete(j.id, type)}
                    onEdit={() =>
                      setDrawerData({
                        type,
                        title: k.buttonName,
                        isEdit: true,
                        item: j,
                      })
                    }
                  />
                </Col>
              </Row>
            ))}
            <Row gutter={[0, 8]}>
              <Col>
                <Button
                  className="medicationButton"
                  onClick={() =>
                    setDrawerData({
                      type,
                      title: k.buttonName,
                      isEdit: false,
                      item: null,
                    })
                  }
                  shape="round"
                  type="primary"
                  ghost
                >
                  {"Add " + k.buttonName}
                </Button>
              </Col>
            </Row>
            <Divider />
          </>
        );
      })}
      {drawerData && (
        <MedicationDrawer
          inputData={drawerData}
          onAddOrUpdate={onAddOrUpdate}
          onClose={() => setDrawerData(null)}
        />
      )}
    </>
  );
};

export default MedicationDetails;
