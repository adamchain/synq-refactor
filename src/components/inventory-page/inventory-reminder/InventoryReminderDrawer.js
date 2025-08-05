import React, { useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Popconfirm,
  Row,
  Typography,
  Space,
  Tooltip,
} from "antd";
import AdvancedTable from "../../generic-components/advanced-table/AdvancedTable";
import {
  EditIcon,
  TrashIcon,
  InventoryRemindersIcon,
} from "../../util/SvgUtil";
import CommonUtil from "../../util/CommonUtil";
import InventoryReminderModal from "./InventoryReminderModal";

import update from "immutability-helper";
import "./InventoryReminder.scss";
import InventoryReminders from "../../../services/InventoryReminders";

const { Title, Text, Link } = Typography;

//const REMINDER_TYPE = {1:{name:"Phone Call",value:1},2:{name:"Manual Email",value:2},3:{name:"Task",value:3},4:{name:"Automated Email",value:4},5:{name:"Automated Text",value:5},6:{name:"Callback",value:6},7:{name:"General",value:7},8:{name:"Task",value:8},9:{name:"Wellness",value:9}};
const REMINDER_TYPE = {
  1: { name: "Phone Call", value: 1 },
  6: { name: "Callback", value: 6 },
  7: { name: "General", value: 7 },
  9: { name: "Wellness", value: 9 },
};
const STAFF_TYPE = {
  1: { name: "Front Desk", value: 1 },
  2: { name: "Technician", value: 2 },
  3: { name: "Doctor", value: 3 },
  4: { name: "Leadership", value: 4 },
  5: { name: "Appointment Owner", value: 5 },
};

const InventoryReminderDrawer = (props) => {
  const [remindersList, setRemindersList] = useState(
    props.reminders.map((k, key) => ({ ...k, key })),
  );
  const [reminderModal, setReminderModal] = useState(null);
  //const [essentials,setEssentials]=useState({staffList:[]});

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      render: (text) => REMINDER_TYPE[text]?.name,
    },
    { title: "Description", dataIndex: "name" },
    {
      title: "Starts",
      dataIndex: "startAlert",
      render: (text, record) =>
        text >= 0
          ? `${text} ${CommonUtil.CALENDAR_INTERVAL_OBJECT[record.unit]?.name}`
          : "-",
    },
    {
      title: "Due",
      dataIndex: "due",
      render: (text, record) =>
        text >= 0
          ? `${text} ${CommonUtil.CALENDAR_INTERVAL_OBJECT[record.unit]?.name}`
          : "-",
    },
    {
      title: "Stops",
      dataIndex: "stopAlert",
      render: (text, record) =>
        text >= 0
          ? `${text} ${CommonUtil.CALENDAR_INTERVAL_OBJECT[record.unit]?.name}`
          : "-",
    },
    {
      title: "Action",
      render: (text, record) => (
        <Row gutter={[8, 0]}>
          <Col>
            <Space size={[12, 16]}>
              <Tooltip title="Edit">
                <Link
                  onClick={() => {
                    setReminderModal({ isEdit: true, data: record });
                  }}
                >
                  <EditIcon />
                </Link>
              </Tooltip>

              <Popconfirm
                title="Are you sure you want to delete this reminder?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  if (props.inventoryId) {
                    InventoryReminders.deleteInventoryReminder(record.id, () =>
                      setRemindersList((k) =>
                        k.filter((v) => v.key !== record.key),
                      ),
                    );
                  } else {
                    setRemindersList((k) =>
                      k.filter((v) => v.key !== record.key),
                    );
                  }
                }}
              >
                <Tooltip title="Delete">
                  <Link>
                    <TrashIcon />
                  </Link>
                </Tooltip>
              </Popconfirm>
            </Space>
          </Col>
        </Row>
      ),
    },
  ];

  // useEffect(()=>{
  //     StaffServices.fetchStaff(data => setEssentials(k=>({...k,staffList:data.map(v=>({...v,fullName:`${v.firstName} ${v.lastName}`}))})));
  // },[]);

  const onClose = () => {
    props.onClose();
  };
  const reminderEdit = (data) => {
    //setRemindersList(k=>update(k,{[k.findIndex(i=>i.key===data.key)]:a=>({...a,...data??{}})}));
    InventoryReminders.getInventoryRemindersByInventoryId(
      props.inventoryId,
      (reminders) =>
        setRemindersList(reminders.map((k, key) => ({ ...k, key }))),
    );
    setReminderModal(false);
  };
  const reminderAdd = (data) => {
    //setRemindersList(k=>([...k,{...data,key:k.length}]));
    InventoryReminders.getInventoryRemindersByInventoryId(
      props.inventoryId,
      (reminders) =>
        setRemindersList(reminders.map((k, key) => ({ ...k, key }))),
    );
    setReminderModal(false);
  };
  return (
    <>
      <Drawer
        className="inventory-reminder-drawer"
        title={"Inventory Reminders"}
        width={800}
        onClose={onClose}
        visible={true}
        bodyStyle={{ paddingBottom: 50 }}
        footer={
          <Row justify="end">
            <Col>
              <Button
                onClick={onClose}
                shape="round"
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              {" "}
              <Button
                onClick={() => {
                  props.onChange(remindersList);
                }}
                shape="round"
                type="primary"
              >
                {"Save"}
              </Button>
            </Col>
          </Row>
        }
      >
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "24px" }}
          gutter={[0, 0]}
        >
          <Col>
            <Row align="middle" gutter={[16, 0]}>
              <Col>
                <div className="circleborder">
                  <div className="InvReminderIconCont">
                    <InventoryRemindersIcon />
                  </div>
                </div>
              </Col>
              <Col>
                <Row style={{ marginBottom: "-3px" }}>
                  <Col>
                    <Text className="InvReminderTitle">
                      {props.formRequiredValue.pName ?? ""}
                    </Text>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "-4px" }}>
                  <Col>
                    <Text className="InvReminderVMC">
                      Vendor: {props.formRequiredValue.vendor ?? ""}
                    </Text>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "-4px" }}>
                  <Col>
                    <Text className="InvReminderVMC">
                      Manufacturer: {props.formRequiredValue.mfr ?? ""}
                    </Text>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "-4px" }}>
                  <Col>
                    <Text className="InvReminderVMC">
                      Code: {props.formRequiredValue.code ?? ""}
                    </Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row justify="end">
              <Col>
                <Title style={{ margin: 0, lineHeight: "0.6em" }} level={3}>
                  {remindersList.length}
                </Title>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <Text type="secondary">Reminders</Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "24px" }}
          gutter={[0, 0]}
        >
          <Col>
            <Title level={5}>Active Reminders</Title>
          </Col>
          <Col>
            <Button
              ghost
              shape="round"
              size="small"
              type="primary"
              style={{ minWidth: "130px" }}
              onClick={() => {
                setReminderModal({ isEdit: false });
              }}
            >
              Add Reminder
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <AdvancedTable columns={columns} dataSource={remindersList} />
          </Col>
        </Row>
      </Drawer>
      {reminderModal && (
        <InventoryReminderModal
          onClose={() => setReminderModal(false)}
          formData={reminderModal.data}
          isEdit={reminderModal.isEdit}
          reminderEdit={(data) => {
            if (props.inventoryId) {
              InventoryReminders.updateInventoryReminder(
                { ...data, inventoryId: props.inventoryId },
                () => reminderEdit(data),
              );
            } else {
              setRemindersList((k) =>
                update(k, {
                  [k.findIndex((i) => i.key === data.key)]: (a) => ({
                    ...a,
                    ...(data ?? {}),
                  }),
                }),
              );
              setReminderModal(false);
            }
          }}
          reminderAdd={(data) => {
            if (props.inventoryId) {
              InventoryReminders.createInventoryReminder(
                { ...data, inventoryId: props.inventoryId },
                (newData) => reminderAdd(newData),
              );
            } else {
              setRemindersList((k) => [...k, { ...data, key: k.length }]);
              setReminderModal(false);
            }
          }}
          reminderTypes={Object.values(REMINDER_TYPE)}
          //staffList = {essentials.staffList}
          staffTypes={Object.values(STAFF_TYPE)}
        />
      )}
    </>
  );
};

export default InventoryReminderDrawer;
