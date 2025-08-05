import React, { useState } from "react";
import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import {
  Card,
  Typography,
  Row,
  Col,
  Image,
  Space,
  Tag,
  Layout,
  Modal,
  Input,
} from "antd";
import "./DashboardTimeline.scss";
import WhskrPageHeader from "./../page-header/WhskrPageHeader";
import { momentLocal } from "../util/TimeUtil";

const { Text } = Typography;
const { Content } = Layout;

const ClientCard = () => {
  let client = {
    name: "Woodhouse Politte",
    image: `http://${window.location.host}/whskrwoodhouse1.jpg`,
    breed: "Cavalier King Charles Spaniel",
    showInfoIcon: true,
    status: "Active",
    weightLb: "12.70",
    weightKg: "5.76",
    age: "6YR 7MO",
    dob: "10/21/14",
  };

  return (
    <Row justify="space-between" style={{ padding: 0 }}>
      <Col>
        <Space>
          <Image
            preview={false}
            width="130px"
            src={client.image}
            height="130px"
          />

          <Space direction="vertical">
            <Text>M</Text>
            <Text strong>Rex(23)</Text>
            <Text>Nausea</Text>
            <Text>123-098-234</Text>
            <Text>Avomin</Text>
          </Space>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Tag style={{ border: 0, margin: 0 }} color="#2db7f5">
            MEDICINE ROOM
          </Tag>
          <Row justify="end" style={{ paddingRight: "4px" }}>
            <Col>
              <Text strong>10k</Text>
            </Col>
          </Row>
        </Space>
      </Col>
    </Row>
  );
};

const groups = [
  { id: 1, title: "ser" },
  { id: 2, title: "group 2" },
  { id: 3, title: "ser" },
  { id: 4, title: "group 2" },
  { id: 5, title: "ser" },
  { id: 6, title: "group 2" },
];

const items = [
  {
    id: 1,
    group: 1,
    title: "item 1",
    start_time: momentLocal().startOf("hour"),
    end_time: momentLocal().startOf("hour").add(1, "hour"),
  },
  {
    id: 2,
    group: 2,
    title: "item 2",
    start_time: momentLocal().startOf("hour").add(2, "hour"),
    end_time: momentLocal().startOf("hour").add(3, "hour"),
  },
  {
    id: 3,
    group: 3,
    title: "item 3",
    start_time: momentLocal().startOf("hour").add(4, "hour"),
    end_time: momentLocal().startOf("hour").add(5, "hour"),
  },
];

const TimeCustomDisplay = () => {
  const [customTime, setCustomTime] = useState(new Date());
  setInterval(() => setCustomTime(new Date()), 1000);
  return (
    <Row align="middle" justify="space-around" style={{ height: "50px" }}>
      <Col>
        <Text className="dashboard-timer">
          {customTime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          })}
        </Text>
      </Col>
    </Row>
  );
};

const DashboardTimeline = () => {
  const [canvasData, setCanvasData] = useState(null);
  const [itemsData, setItemsData] = useState(items);
  return (
    <Layout>
      <WhskrPageHeader title="Board" />
      <Content
        className="site-layout-background"
        style={{
          padding: 24,

          margin: "1.5em",
          marginTop: "-1em",
          minHeight: 280,
          borderRadius: "20px",
        }}
      >
        <Timeline
          className="dashboard-timeline"
          lineHeight={130}
          sidebarWidth={400}
          timelineWidth={100}
          groups={groups}
          groupRenderer={() => <ClientCard />}
          items={itemsData}
          visibleTimeStart={momentLocal().startOf("hour").subtract(4, "hour")}
          visibleTimeEnd={momentLocal().startOf("hour").add(4, "hour")}
          canvasTimeStart={momentLocal().startOf("hour").subtract(4, "hour")}
          canvasTimeEnd={momentLocal().startOf("hour").add(4, "hour")}
          defaultTimeStart={momentLocal().startOf("hour").subtract(4, "hour")}
          defaultTimeEnd={momentLocal().startOf("hour").add(4, "hour")}
          onItemMove={(itemId, dragTime, newGroupOrder) => {
            let item = { ...itemsData.find((k) => k.id === itemId) };
            let tempItemData = [...itemsData].filter((k) => k.id !== itemId);
            tempItemData.push({
              ...item,
              start_time: dragTime,
              end_time: momentLocal()
                .startOf("day")
                .add(parseInt(momentLocal(dragTime).format("H")) + 1, "hour"),
            });
            setItemsData(tempItemData);
          }}
          onCanvasClick={(groupId, time, e) =>
            setCanvasData({ groupId, time, e })
          }
        >
          <TimelineHeaders
            className="sticky"
            style={{ backgroundColor: "white", height: "50px" }}
          >
            <SidebarHeader>
              {({ getRootProps }) => {
                return (
                  <Card className="dashboard-timer-card">
                    <TimeCustomDisplay />
                  </Card>
                );
              }}
            </SidebarHeader>
            <DateHeader height="50px" unit="hour" labelFormat="hh A" />\{" "}
            {/* <DateHeader/> 

            <DateHeader unit="hour" labelFormat="HH:mm"/>  */}
          </TimelineHeaders>
        </Timeline>

        {canvasData && (
          <Modal
            title="Add Event"
            visible={true}
            onOk={() => {
              let title = document.getElementById("canvas-input-custom").value;
              setItemsData((k) => [
                ...k,
                {
                  id: itemsData.length + 1,
                  group: canvasData.groupId,
                  title,
                  start_time: momentLocal()
                    .startOf("day")
                    .add(
                      parseInt(momentLocal(canvasData.time).format("H")),
                      "hour",
                    ),
                  end_time: momentLocal()
                    .startOf("day")
                    .add(
                      parseInt(momentLocal(canvasData.time).format("H")) + 1,
                      "hour",
                    ),
                },
              ]);
              setCanvasData(null);
            }}
            onCancel={() => setCanvasData(null)}
          >
            <Space direction="vertical">
              <Text strong>
                Hour {momentLocal(canvasData.time).format("h a")}
              </Text>
              <Space>
                <span>{"Title"} </span>
                <Input id="canvas-input-custom" />
              </Space>
            </Space>
          </Modal>
        )}
      </Content>
    </Layout>
  );
};

export default DashboardTimeline;
