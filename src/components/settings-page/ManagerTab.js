import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Input,
  Button,
  Checkbox,
  Divider,
  message,
  Select,
  Popconfirm,
  Tooltip,
  Switch,
} from "antd";
import { DeleteOutlined, CopyOutlined, EditOutlined } from "@ant-design/icons";
import AppointmentServices from "../../services/AppointmentServices";
import InventoryServices from "../../services/InventoryServices";
import { momentLocal } from "../util/TimeUtil";
import { CommonContext } from "../../context/CommonContext";
import config from "../../config";
import InventoryCreateEditDrawer from "../inventory-page/inventory-create-edit/InventoryCreateEditDrawer";
import { EditIcon } from "../util/SvgUtil";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function SalonManager() {
  const commonContext = useContext(CommonContext);
  const [procedures, setProcedures] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [selectedProcedures, setSelectedProcedures] = useState({});
  const [invCatData, setInvCatData] = useState([]);
  const [services, setServices] = useState([]);
  const [editCreateObject, setEditCreateObject] = useState(null);
  const [data, setData] = useState();
  const [newService, setNewService] = useState({
    description: "",
    duration: "",
    categoryId: "",
    code: "",
    cost: "",
    discountType: "",
    pName: "",
    price: "",
    rMethod: "$",
    sFee: 0,
    sTax: false,
    status: true,
    type: 2,
    description: "",
    showonwebsite: true,
    showduration: true,
    showprice: true,
    saveAppointment: false,
  });
  const [isToggled, setIsToggled] = useState(true);
  const [isToggled0, setIsToggled0] = useState(true);
  const [isToggled1, setIsToggled1] = useState(false);

  let inputData = {
    userId: "",
    serviceId: "",
    isDeleted: true,
  };

  useEffect(() => {
    AppointmentServices.fetchAllVets((data) => setDoctorDetails(data));
  }, []);

  const getInventory = () => {
    InventoryServices.getServiceInventory(
      commonContext?.defaultBranch?.branchId,
      commonContext?.defaultBranch?.orgId,
      (data) => setProcedures(data),
    );
  };

  useEffect(() => {
    getInventory();
  }, []);

  useEffect(() => {
    const fetchDefaultValues = async () => {
      try {
        const defaultServices = {};
        for (const doctor of doctorDetails) {
          const data = await new Promise((resolve) => {
            InventoryServices.getInventoryByDr(doctor.userId, (resultData) => {
              resolve(resultData);
            });
          });
          defaultServices[doctor.userId] =
            data?.map((service) => service?.inventoryId) || [];
        }
        setSelectedProcedures(defaultServices);
      } catch (e) {
        console.log("Error fetching default values:", e);
      }
    };

    if (doctorDetails?.length > 0) {
      fetchDefaultValues();
    }
  }, [doctorDetails]);

  useEffect(() => {
    fetchAllInventoryCategories();
    fetchInventory();
  }, []);

  const fetchAllInventoryCategories = () => {
    InventoryServices.getInventoryCategories(setInvCatData);
  };

  const fetchInventory = () => {
    InventoryServices.getAllInventory((data) => {
      setData(data);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = (checked) => {
    setIsToggled(checked);
    setNewService((prev) => ({
      ...prev,
      ["showduration"]: checked,
    }));
  };

  const handleToggle0 = (checked) => {
    setIsToggled0(checked);
    setNewService((prev) => ({
      ...prev,
      ["showprice"]: checked,
    }));
  };

  const handleToggle1 = (checked) => {
    setIsToggled1(checked);
  };

  const handleProcedureChange = (selectedValues, options, doctorId) => {
    const previousValues = selectedProcedures[doctorId] || [];

    const addedValues = selectedValues.filter(
      (value) => !previousValues.includes(value),
    );

    const removedValues = previousValues.filter(
      (value) => !selectedValues.includes(value),
    );

    console.log("addedValues", addedValues);
    console.log("removedValues", removedValues);

    if (addedValues.length > 0) {
      inputData.userId = parseInt(doctorId);
      inputData.serviceId = parseInt(addedValues[0]);
      inputData.isDeleted = false;
      InventoryServices.saveUserInventory(inputData, () => {
        console.log("success in add");
      });
    }
    if (removedValues.length > 0) {
      inputData.userId = parseInt(doctorId);
      inputData.serviceId = parseInt(removedValues[0]);
      inputData.isDeleted = true;
      InventoryServices.removeUserInventory(inputData, () => {
        console.log("success in remove");
      });
    }

    setSelectedProcedures((prev) => ({
      ...prev,
      [doctorId]: selectedValues,
    }));
  };

  const createApptType = () => {
    let info = {
      apptTypeName: newService.pName,
      apptLength: 30,
    };
    AppointmentServices.createApptType(info, () => {
      console.log("success!");
    });
  };

  const handleAddService = () => {
    if (
      newService.pName &&
      newService.categoryId &&
      newService.code &&
      newService.cost &&
      newService.price
    ) {
      const serviceData = { ...newService, saveAppointment: isToggled1 }; // Add saveAppointment dynamically

      if (isToggled1) {
        if (newService?.pName?.length <= 30) {
          InventoryServices.createInventory(
            serviceData,
            setTimeout(getInventory, 1500),
          );

          setNewService((prev) => ({
            ...prev,
            pName: "",
            description: "",
            duration: "0",
            price: "0",
            cost: "0",
            code: "",
          }));

          createApptType();
        } else {
          message.error(
            "Appointment type text length cannot be more than 30 characters",
          );
        }
      } else {
        InventoryServices.createInventory(
          serviceData,
          setTimeout(getInventory, 1500),
        );
      }
    } else {
      message.error("Add complete details!");
    }
  };

  const copyToClipboard = () => {
    const iframeText = `<iframe src="${config.base_url}/client-booking?branchId=${commonContext?.defaultBranch?.branchId}&orgId=${commonContext?.defaultBranch?.orgId}&businessName=${encodeURIComponent(commonContext?.defaultBranch?.orgName)}" width="100%" height="600" frameborder="0"></iframe>`;
    navigator.clipboard
      .writeText(iframeText)
      .then(() => {
        message.success("Copied to clipboard!");
      })
      .catch((err) => {
        message.error("Failed to copy text: ", err);
      });
  };

  return (
    <div style={{ padding: "24px", background: "#fff", minHeight: "100vh" }}>
      <Row justify="space-between">
        <Col xs={24} md={20} lg={16}>
          {/* Service Assignment Section */}
          <Text
            style={{ fontSize: "16px", fontWeight: "500", marginBottom: 15 }}
          >
            Service Assignment
          </Text>
          <Row style={{ margin: "10px 0px" }}>
            <Col span={24}>
              <Row
                justify="space-between"
                style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 8 }}
              >
                <Text style={{ color: "#8c8c8c", fontWeight: 500 }}>
                  STYLIST
                </Text>
                <Text style={{ color: "#8c8c8c", fontWeight: 500 }}>
                  SERVICES
                </Text>
              </Row>
            </Col>
          </Row>
          {doctorDetails.map((doctor) => (
            <Row
              style={{ margin: "10px 0px" }}
              justify="space-between"
              align="middle"
            >
              <Col>
                <Text strong>{doctor.fullName}</Text>
                <br />
                <Text type="secondary">{doctor?.title}</Text>
              </Col>
              <Col>
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="Select services"
                  style={{ width: 400 }}
                  value={(selectedProcedures[doctor.userId] || []).filter(
                    (selectedId) =>
                      procedures.some(
                        (procedure) => procedure.inventoryId === selectedId,
                      ),
                  )}
                  onChange={(selectedValues, options) =>
                    handleProcedureChange(
                      selectedValues,
                      options,
                      doctor.userId,
                    )
                  }
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {procedures.map((procedure) => (
                    <Option
                      key={procedure.inventoryId}
                      value={procedure.inventoryId}
                    >
                      {procedure.productName}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          ))}
          {/* Service Management Section */}
          <div style={{ margin: "40px 0px" }}>
            <Text
              style={{ fontSize: "16px", fontWeight: "500", marginBottom: 15 }}
            >
              Service Management
            </Text>
            <Row gutter={24} style={{ marginTop: 10 }}>
              <Col xs={24} md={12}>
                <Text className="settingsTitles">Add New Service</Text>
                <div style={{ marginBottom: 16, marginTop: 5 }}>
                  <Input
                    placeholder="Service Name*"
                    name="pName"
                    value={newService.pName}
                    onChange={handleInputChange}
                    style={{ marginBottom: 16 }}
                  />
                  <Input
                    placeholder="Item code*"
                    name="code"
                    value={newService.code}
                    onChange={handleInputChange}
                    style={{ marginBottom: 16 }}
                  />
                  <TextArea
                    placeholder="Description"
                    name="description"
                    value={newService.description}
                    onChange={handleInputChange}
                    style={{ marginBottom: 16 }}
                    rows={4}
                  />
                  <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={10}>
                      <Input
                        placeholder="Duration(mins)"
                        name="duration"
                        type="number"
                        value={newService.duration}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col span={7}>
                      <Input
                        placeholder="Cost*"
                        name="cost"
                        type="text"
                        value={newService.cost}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col span={7}>
                      <Input
                        placeholder="Price*"
                        name="price"
                        type="text"
                        value={newService.price}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Select
                    placeholder="Select category*"
                    style={{ width: "100%", marginBottom: 16 }}
                    name="categoryId"
                    onChange={(value) => {
                      setNewService((prev) => ({
                        ...prev,
                        ["categoryId"]: value,
                      }));
                    }}
                  >
                    {invCatData.map((inv) => (
                      <Option key={inv.categoryId} value={inv.categoryId}>
                        {inv.name}
                      </Option>
                    ))}
                  </Select>
                  <Row
                    gutter={16}
                    justify="space-between"
                    style={{ marginBottom: 16 }}
                  >
                    <Col span={12}>
                      <Text
                        className={`${isToggled ? `secondary` : `ant-typography-secondary`}`}
                      >
                        Show Duration
                      </Text>
                    </Col>
                    <Col span={12} className="ant-row-rtl">
                      <Switch checked={isToggled} onChange={handleToggle} />
                    </Col>
                  </Row>
                  <Row
                    gutter={16}
                    justify="space-between"
                    style={{ marginBottom: 16 }}
                  >
                    <Col span={12}>
                      <Text
                        className={`${isToggled0 ? `secondary` : `ant-typography-secondary`}`}
                      >
                        Show Price
                      </Text>
                    </Col>
                    <Col span={12} className="ant-row-rtl">
                      <Switch checked={isToggled0} onChange={handleToggle0} />
                    </Col>
                  </Row>
                  <Row
                    gutter={16}
                    justify="space-between"
                    style={{ marginBottom: 16 }}
                  >
                    <Col span={12}>
                      <Text
                        className={`${isToggled1 ? `secondary` : `ant-typography-secondary`}`}
                      >
                        Save as appointment type
                      </Text>
                    </Col>
                    <Col span={12} className="ant-row-rtl">
                      <Switch checked={isToggled1} onChange={handleToggle1} />
                    </Col>
                  </Row>
                  <Button
                    type="secondary"
                    shape="round"
                    block
                    onClick={handleAddService}
                  >
                    + Add Service
                  </Button>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <Text className="settingsTitles">Current Services</Text>
                <div className="manager-settings" style={{ marginTop: 5 }}>
                  {procedures.map((service, index) => (
                    <Card
                      key={service.inventoryId}
                      style={{ marginBottom: 16 }}
                      bodyStyle={{ padding: 16 }}
                    >
                      <Row justify="space-between" align="top">
                        <Col>
                          <Text strong>{service.productName}</Text>
                          <br />
                          <Text type="secondary">{service.name}</Text>
                          <br />
                          <Text type="secondary">
                            {service?.showduration &&
                              `Duration: ${service.duration}min`}{" "}
                            {service?.showprice &&
                              `• Price: $${service.maxPrice}`}
                          </Text>
                        </Col>
                        <Col>
                          {commonContext.userProfile.permission !== "FD" && (
                            <Row align="middle">
                              <Popconfirm
                                title="Are you sure you want to delete this inventory item?"
                                placement="topRight"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => {
                                  InventoryServices.deleteInventoryById(
                                    service.inventoryId,
                                    setTimeout(getInventory, 1500),
                                  );
                                  AppointmentServices.deleteApptType(
                                    {
                                      apptTypeName: service.productName,
                                      apptLength: service.duration,
                                    },
                                    (res) =>
                                      console.log("appt type deleted-", res),
                                  );
                                }}
                              >
                                <Tooltip title="Delete Item">
                                  <Typography.Link>
                                    <DeleteOutlined
                                      style={{ color: "#ff4d4f" }}
                                    />
                                  </Typography.Link>
                                </Tooltip>
                              </Popconfirm>
                              <Tooltip title="Edit Item">
                                <Typography.Link
                                  style={{ margin: "0 5px" }}
                                  onClick={() => {
                                    InventoryServices.getInventoryById(
                                      service.inventoryId,
                                      (data) =>
                                        setEditCreateObject({
                                          isEdit: true,
                                          record: {
                                            ...data,
                                            id: service.inventoryId,
                                          },
                                        }),
                                    );
                                    //edit(record)
                                  }}
                                >
                                  <EditOutlined />
                                </Typography.Link>
                              </Tooltip>
                            </Row>
                          )}
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
          {/* Export Settings Section */}
          <Text
            style={{ fontSize: "16px", fontWeight: "500", marginBottom: 15 }}
          >
            Export Settings
          </Text>
          <Text type="secondary" style={{ marginBottom: 16, display: "block" }}>
            Copy the following code snippet to embed the booking widget in your
            website:
          </Text>
          <div
            style={{
              background: "#f5f5f5",
              padding: 16,
              borderRadius: 4,
              border: "1px solid #d9d9d9",
              fontFamily: "monospace",
              fontSize: 14,
              marginBottom: 16,
              position: "relative",
            }}
          >
            {`<iframe src="${config.base_url}/client-booking?branchId=${commonContext?.defaultBranch?.branchId}&orgId=${commonContext?.defaultBranch?.orgId}&businessName=${encodeURIComponent(commonContext?.defaultBranch?.orgName)}"width="100%" height="600" frameborder="0"></iframe>`}
            <Button
              icon={<CopyOutlined />}
              onClick={copyToClipboard}
              style={{
                position: "absolute",
                right: 8,
                top: 8,
                border: "none",
                background: "transparent",
              }}
            />
          </div>
          {/* <Button type="primary" shape="round" size='medium' >
              Save Settings
            </Button> */}
        </Col>
      </Row>

      {editCreateObject && (
        <InventoryCreateEditDrawer
          oldPName={editCreateObject?.record?.pName}
          manager={true}
          staticInvData={data}
          isEdit={true}
          inventoryData={editCreateObject.record}
          allSpecies={[]}
          onClose={() => setEditCreateObject(null)}
          onSuccessReturn={() => {
            setEditCreateObject(null);
            getInventory();
          }}
        />
      )}
    </div>
  );
}
