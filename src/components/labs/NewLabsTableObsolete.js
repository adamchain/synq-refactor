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
  Tag,
  Tooltip,
  Typography,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useContext, useEffect, useState } from "react";
import { CommonContext } from "../../context/CommonContext";
import AppointmentServices from "../../services/AppointmentServices";
import LabServices from "../../services/LabServices";
import AdvancedTable from "../generic-components/advanced-table/AdvancedTable";
import CommonUtil from "../util/CommonUtil";
import { SendtoCloud, TrashIcon, ViewIcon } from "../util/SvgUtil";
import IdexxDeviceModal from "./IdexxDeviceModal";

const { Link, Title, Text } = Typography;
const { Option } = Select;

//Labtype 1 is Zoetis , 2 is Zoetis Ref lab , 3 is Idexx , 4 is Antech

const NoLabsAdded = () => {
  return (
    <>
      <Row justify="center" align="middle">
        <Col span={24}>
          {" "}
          <Title style={{ color: "unset" }} level={4}>
            No Labs Added
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={24}>Add a lab from here or billing to begin</Col>
      </Row>
    </>
  );
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

const NewLabsTableObsolete = (props) => {
  const [modalOpen, setModalOpen] = useState({ type: null, data: {} });
  const [deviceList, setDeviceList] = useState([]);
  const context = useContext(CommonContext);

  const devices = {
    ivlsDeviceList: [
      {
        deviceSerialNumber: "PTH4451966",
        displayName: "IVLS",
        lastPolledCloudTime: "2022-02-05T05:44:51+0000",
        vcpActivatedStatus: "ACTIVE",
      },
      {
        deviceSerialNumber: "PTH2155893",
        displayName: "IVLS",
        lastPolledCloudTime: "2022-02-05T05:44:51+0000",
        vcpActivatedStatus: "ACTIVE",
      },
    ],
  };

  const orderSubmit = (id, deviceSerialNumber) => {
    LabServices.postLabOrder(id, deviceSerialNumber, (response) => {
      props.refreshTableData();
      if (deviceSerialNumber) {
        window.open(response.data, "_blank", "noreferrer");
      }
    });
  };

  useEffect(() => {
    setDeviceList(devices.ivlsDeviceList);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "code",
      className: "external-lab-column",
      isSearchRequired: true,
      render: (text, record) => record.name,
    },
    {
      title: "Provider",
      width: 135,
      dataIndex: "provider",
      render: (text, record) =>
        record.pFirstName.charAt(0) + " " + record.pLastName,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "middle",
      sorter: true,
      render: (text, record) => (
        <Tag
          style={{
            borderRadius: "4px",
            width: "8em",
            textAlign: "center",
            backgroundColor:
              CommonUtil.STATUS_OBJECT_BG_COLOR[text?.toUpperCase()],
            border:
              " 1px solid " +
              CommonUtil.STATUS_OBJECT_COLOR[text?.toUpperCase()],
          }}
          color={CommonUtil.STATUS_OBJECT_COLOR[text?.toUpperCase()]}
        >
          <Text
            style={{
              color: CommonUtil.STATUS_OBJECT_COLOR[text?.toUpperCase()],
            }}
          >
            {text}
          </Text>
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "110px",
      render: (text, record) => (
        <Space size={[12, 16]}>
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
                        orderSubmit(
                          record.id,
                          deviceList[0].deviceSerialNumber,
                        );
                      }
                    } else if (record.labVendor === 3 && record.labType === 4) {
                      orderSubmit(record.id, "Idexx External");
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
                      orderSubmit(record.id, null);
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
          {["COMPLETED", "ERROR", "READY"].includes(
            record.status.toUpperCase(),
          ) &&
            (record.labVendor !== 3 && record.labType === 4 ? (
              <Tooltip title="Print Order Manifest">
                <Link
                  onClick={() =>
                    LabServices.openExternalLabRequestForm(record.id)
                  }
                >
                  <PrinterOutlined />
                </Link>
              </Tooltip>
            ) : record.labVendor ? (
              <Tooltip title="View">
                <Link
                  onClick={() =>
                    record.labVendor !== 3 && record.labType === 4
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
                  orderSubmit(record.id, null);
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
                  LabServices.deleteLabOrder(record.id, props.refreshTableData);
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
                {record.labVendor !== 3 && record.labType === 4 && (
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
      ),
    },
  ];
  return (
    <>
      <AdvancedTable
        size="middle"
        id="new-labs-table"
        rowClassName={(record, index) =>
          record.labType === 4 ? "is-external-lab" : ""
        }
        columns={columns}
        dataSource={props.newLabsTableData}
        rowKey="id"
        locale={{ emptyText: <NoLabsAdded /> }}
      />
      {modalOpen.type === "devicelist" && (
        <IdexxDeviceModal
          data={deviceList}
          onSuccess={(deviceSerialNumber) => {
            orderSubmit(modalOpen.data.id, deviceSerialNumber);
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
              ? orderSubmit(modalOpen.data.labId, null)
              : props.refreshTableData();
            setModalOpen({ type: null, data: {} });
          }}
          onClose={() => setModalOpen({ type: null, data: {} })}
        />
      )}
      {modalOpen.type === "add-lab-result" && (
        <AddLabsResultModal
          record={modalOpen.data}
          refreshTableData={props.refreshTableData}
          onClose={() => setModalOpen({ type: null, data: {} })}
        />
      )}
    </>
  );
};

export default NewLabsTableObsolete;
