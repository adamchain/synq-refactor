import {
  FormOutlined,
  MoreOutlined,
  PrinterOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Input,
  Menu,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Tooltip,
  Typography,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useContext, useEffect, useState } from "react";
import { CommonContext } from "../../context/CommonContext";
import AppointmentServices from "../../services/AppointmentServices";
import LabServices from "../../services/LabServices";
import { SendtoCloud, TrashIcon, ViewIcon } from "../util/SvgUtil";
import IdexxDeviceModal from "./IdexxDeviceModal";

const { Link, Title, Text } = Typography;
const { Option } = Select;

const orderSubmit = (id, deviceSerialNumber, refreshTableData, record) => {
  LabServices.postLabOrder(id, deviceSerialNumber, (response) => {
    refreshTableData();
    if (deviceSerialNumber) {
      window.open(response.data, "_blank", "noreferrer");
    }
  });
};

const ProviderChangeModal = (tempProps) => {
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [selectedDoctor, setSeletedDoctor] = useState(tempProps.data?.doctorId);

  let isConfirmProvider = tempProps.data.isConfirmProvider;
  useEffect(() => {
    AppointmentServices.fetchAllVets((data) => setDoctorDetails(data));
  }, []);
  return (
    <Modal
      onCancel={tempProps.onClose}
      footer={null}
      visible={true}
      title={isConfirmProvider ? "Confirm Provider" : "Change Item Provider"}
    >
      <Row style={{ marginBottom: 8 }}>
        <Col>
          <Text>
            {isConfirmProvider
              ? "Choose an approved provider below to create your manifest document."
              : "Changing the provider will ensure the proper person is attributed with the billed item."}
          </Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: 8 }}>
        <Col span={24}>
          {" "}
          <Select
            showSearch={true}
            value={selectedDoctor}
            filterOption={(input, option) =>
              option.extra.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(value, option) => {
              setSeletedDoctor(value);
            }}
            placeholder={<Text>Select a Doctor Name</Text>}
            style={{ width: "100%", marginBottom: "24px" }}
          >
            {doctorDetails.map((k) => (
              <Option key={k.userId} value={k.userId}>
                {"Dr. "}
                {k.fullName}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Divider />
      <Row justify="space-between" gutter={[16, 0]}>
        <Col span={12}>
          {" "}
          <Button onClick={tempProps.onClose} shape="round" size="large" block>
            Cancel
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            size="large"
            shape="round"
            block
            onClick={() =>
              LabServices.changeProviderForLab(
                tempProps.data.labId,
                {
                  apptId: tempProps.data.apptId,
                  inventoryId: tempProps.data.inventoryId,
                  providerId: selectedDoctor,
                },
                tempProps.onSuccess,
              )
            }
          >
            {isConfirmProvider ? "Confirm" : "Save"}
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

const AddLabsResultModal = ({
  record,
  saveLabResult,
  onClose,
  refreshTableData,
}) => {
  const [labResult, setLabResult] = useState({
    title: "Results for " + record.labName,
    description: "",
    labOrderId: record.labOrderId,
  });
  useEffect(() => {
    LabServices.getManualLabOrder(record.labOrderId, (data) => {
      setLabResult((k) => ({ ...k, ...data }));
    });
  }, []);
  return (
    <Modal
      title="Add Lab Result"
      visible={true}
      onCancel={onClose}
      footer={null}
    >
      <>
        <Row>
          <Col span={24}>
            <Row style={{ marginBottom: 8 }}>
              <Col>
                <Text>Title</Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 24 }}>
              <Col span={24}>
                <Input
                  value={labResult.title}
                  size="large"
                  onChange={(e) => {
                    let value = e.target.value;
                    setLabResult((k) => ({ ...k, title: value }));
                  }}
                  placeholder={"Enter a Title"}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
            <Row
              justify="space-between"
              gutter={[16, 0]}
              style={{ marginBottom: 8 }}
            >
              <Col span={24}>
                <Text>Description</Text>
              </Col>
            </Row>
            <Row
              justify="space-between"
              gutter={[16, 0]}
              style={{ marginBottom: 24 }}
            >
              <Col span={24}>
                <TextArea
                  value={labResult.description}
                  size="large"
                  onChange={(e) => {
                    let value = e.target.value;
                    setLabResult((k) => ({ ...k, description: value }));
                  }}
                  placeholder={"Add a Description"}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
            <Divider style={{ marginTop: "60px" }} />
            <Row justify="space-between" gutter={[16, 0]}>
              <Col span={12}>
                {" "}
                <Button onClick={onClose} shape="round" size="large" block>
                  Cancel
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  block
                  onClick={() => {
                    LabServices.saveManualLabOrder(
                      labResult,
                      labResult.isData,
                      () => {
                        onClose();
                        refreshTableData();
                      },
                    );
                  }}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    </Modal>
  );
};

const LabActions = (props) => {
  const {
    modalOpen,
    setModalOpen,
    deviceList,
    setDeviceList,
    refreshTableData,
  } = props;

  return (
    <>
      {modalOpen.type === "devicelist" && (
        <IdexxDeviceModal
          data={deviceList}
          onSuccess={(deviceSerialNumber) => {
            orderSubmit(
              modalOpen.data.id,
              deviceSerialNumber,
              refreshTableData,
            );
            setModalOpen({ type: null, data: {} });
          }}
          onClose={() => setModalOpen({ type: null, data: {} })}
        />
      )}
      {modalOpen.type === "provider" && (
        <ProviderChangeModal
          data={modalOpen.data}
          onSuccess={() => {
            modalOpen.data.isConfirmProvider
              ? orderSubmit(modalOpen.data.labId, null, refreshTableData)
              : refreshTableData();
            setModalOpen({ type: null, data: {} });
          }}
          onClose={() => setModalOpen({ type: null, data: {} })}
        />
      )}
      {modalOpen.type === "add-lab-result" && (
        <AddLabsResultModal
          record={modalOpen.data}
          refreshTableData={refreshTableData}
          onClose={() => setModalOpen({ type: null, data: {} })}
        />
      )}
    </>
  );
};

const LabActionTypes = (props) => {
  const context = useContext(CommonContext);
  const {
    modalOpen,
    setModalOpen,
    deviceList,
    setDeviceList,
    refreshTableData,
    text,
    record,
  } = props;

  const [customLabInputProperties, setCustomLabInputProperties] = useState({});
  const [labOrderAdditionalMetadata, setLabOrderAdditionalMetadata] = useState(
    {},
  );

  const onCancelLabAdd = () => {
    setCustomLabInputProperties({});
  };

  const onAddCustomFieldLab = () => {
    console.log(labOrderAdditionalMetadata);
    LabServices.updateAdditionalMetadataForLab(
      record.id,
      labOrderAdditionalMetadata.additionalMetadata,
      (response) => {
        refreshTableData();
      },
    );

    onCancelLabAdd();
  };

  const handleInputChange = (value, propertyKey) => {
    const keys = propertyKey.split(".");

    setLabOrderAdditionalMetadata((prevState) => {
      let nestedState = { ...prevState };

      keys.reduce((acc, key, index) => {
        if (index === keys.length - 1) {
          acc[key] = value;
        } else {
          acc[key] = acc[key] || {};
        }
        return acc[key];
      }, nestedState);

      return nestedState;
    });
  };

  const _renderProperty = (customLabInputProperty) => {
    return (
      <Input
        className="text-default-400"
        key={customLabInputProperty.key}
        type={customLabInputProperty.type}
        defaultValue={customLabInputProperty.defaultValue}
        required={customLabInputProperty.required}
        onChange={(e) =>
          handleInputChange(e.target.value, customLabInputProperty.key)
        }
      />
    );
  };

  const _renderAdditionalProperties = () => {
    return (
      <div>
        {Object.entries(customLabInputProperties).map(([key, property]) => (
          <div key={key}>
            <p>
              {property.name}
              {_renderProperty(property)}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const validateLab = (record) => {
    if (
      record &&
      record.testCustomLabInputProperties &&
      !record.labOrderAdditionalMetadata
    ) {
      // additional metadata is not added for a lab that has custom lab properties(Meaning a lab/test that requires additional properties)
      setCustomLabInputProperties(record.testCustomLabInputProperties);
      return false;
    } else {
      return true;
    }
  };

  return (
    <Space size={[12, 16]}>
      <Modal
        visible={Object.keys(customLabInputProperties).length > 0}
        style={{ zIndex: 10001 }}
        title="This lab requires additional information. Please add and save the details, then submit again."
        okText="Update Lab"
        onCancel={onCancelLabAdd}
        onClose={onCancelLabAdd}
        onOk={onAddCustomFieldLab}
      >
        {_renderAdditionalProperties()}
      </Modal>

      {![
        "COMPLETED",
        "UPDATED",
        "PARTIAL",
        "NOT STARTED",
        "ERROR",
        "READY",
        "ADD RESULT",
      ].includes(record.status.toUpperCase()) && <span>-</span>}
      {(record.status.toUpperCase() === "NOT STARTED" ||
        record.status.toUpperCase() === "ADD RESULT") &&
      context.userProfile.permission !== "FD" ? (
        //  record.labType === 4 ? <PrinterOutlined onClick={()=>LabServices.openExternalLabRequestForm(record.id) }/>:
        <Tooltip
          title={
            record.labType === 4
              ? "Submit Order"
              : record.labVendor
                ? "Send to Equipment"
                : "Add Result"
          }
        >
          <Link
            onClick={() => {
              if (record.labVendor) {
                if (record.labVendor === 3 && record.labType === 3) {
                  if (deviceList.length > 1) {
                    setModalOpen({
                      type: "devicelist",
                      data: { id: record.id },
                    });
                  } else {
                    if (validateLab(record)) {
                      orderSubmit(
                        record.id,
                        deviceList[0].deviceSerialNumber,
                        refreshTableData,
                      );
                    }
                  }
                } else if (record.labVendor === 3 && record.labType === 4) {
                  if (validateLab(record)) {
                    orderSubmit(
                      record.id,
                      "Idexx External",
                      refreshTableData,
                      record,
                    );
                  }
                } else if (record.labVendor === 2) {
                  //this is for Zoetis
                  setModalOpen({
                    type: "provider",
                    data: {
                      isConfirmProvider: true,
                      doctorId: record.pId,
                      apptId: record.appt,
                      labId: record.id,
                      inventoryId: record.inventoryId,
                    },
                  });
                } else {
                  if (validateLab(record)) {
                    orderSubmit(record.id, null, refreshTableData, record);
                  }
                }
              } else {
                setModalOpen({
                  type: "add-lab-result",
                  data: { labOrderId: record.id, labName: record.name },
                });
              }
            }}

            //disabled={!record.labVendor}
          >
            {record.labVendor ? (
              <SendtoCloud />
            ) : (
              <FormOutlined
                className="new-labs-icon"
                style={{ color: "#595959", fontSize: "20px" }}
              />
            )}
          </Link>
        </Tooltip>
      ) : null}

      {["COMPLETED", "ERROR", "READY", "UPDATED", "PARTIAL"].includes(
        record.status.toUpperCase(),
      ) &&
        (record.labType === 4 && record.status.toUpperCase() !== "COMPLETED" ? (
          <Tooltip title="Print Order Manifest">
            <Link
              onClick={() => LabServices.openExternalLabRequestForm(record.id)}
            >
              <PrinterOutlined
                className="new-labs-icon"
                style={{ color: "#595959", fontSize: "20px" }}
              />
            </Link>
          </Tooltip>
        ) : record.labVendor ? (
          <Tooltip title="View">
            <Link
              onClick={() =>
                record.labType === 4 &&
                record.status.toUpperCase() !== "COMPLETED"
                  ? LabServices.openExternalLabRequestForm(record.id)
                  : window.open(record.reportPath, "_blank", "noreferrer")
              }
              disabled={!record.reportPath}
            >
              <ViewIcon />
            </Link>
          </Tooltip>
        ) : (
          <Tooltip title={"View Result"}>
            <Link
              onClick={() => {
                setModalOpen({
                  type: "add-lab-result",
                  data: { labOrderId: record.id, labName: record.name },
                });
              }}

              //disabled={!record.labVendor}
            >
              <FormOutlined
                className="new-labs-icon"
                style={{ color: "#595959", fontSize: "20px" }}
              />
            </Link>
          </Tooltip>
        ))}
      {record.status.toUpperCase() === "ERROR" && (
        <Tooltip title="Retry">
          <Link
            onClick={() => {
              if (validateLab(record)) {
                orderSubmit(record.id, null, refreshTableData, record);
              }
            }}
          >
            <SyncOutlined
              className="new-labs-icon"
              style={{ color: "#595959", fontSize: "23px" }}
            />
          </Link>
        </Tooltip>
      )}

      {[
        "COMPLETED",
        "UPDATED",
        "PARTIAL",
        "NOT STARTED",
        "ERROR",
        "READY",
        "ADD RESULT",
      ].includes(record.status.toUpperCase()) &&
        context.userProfile.permission !== "FD" && (
          <Popconfirm
            title="Are you sure you want to delete this lab?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              LabServices.deleteLabOrder(record.id, refreshTableData);
            }}
          >
            <Tooltip title="Delete Lab">
              <Link>
                <TrashIcon />
              </Link>
            </Tooltip>
          </Popconfirm>
        )}

      <Dropdown
        trigger={["click"]}
        overlay={
          <Menu>
            <Menu.Item
              onClick={() =>
                setModalOpen({
                  type: "provider",
                  data: {
                    doctorId: record.pId,
                    apptId: record.appt,
                    labId: record.id,
                    inventoryId: record.inventoryId,
                  },
                })
              }
            >
              {" "}
              Change Provider
            </Menu.Item>
            {record.labType === 4 && (
              <Menu.Item
                onClick={() =>
                  LabServices.openExternalLabRequestForm(record.id)
                }
              >
                {" "}
                Download Request
              </Menu.Item>
            )}
            {record.labType === 4 && record.vendorUrl && (
              <Menu.Item
                onClick={() =>
                  window.open(record.vendorUrl, "_blank", "noreferrer")
                }
              >
                {" "}
                View Result
              </Menu.Item>
            )}
          </Menu>
        }
      >
        <Tooltip title="More Options">
          <MoreOutlined style={{ fontSize: "20px", color: "black" }} />
        </Tooltip>
      </Dropdown>
    </Space>
  );
};

export { LabActions, LabActionTypes };
