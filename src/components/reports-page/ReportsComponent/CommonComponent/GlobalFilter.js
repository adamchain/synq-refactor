import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Dropdown,
  Menu,
  Button,
  Radio,
  DatePicker,
} from "antd";
import ThreeDotsMenu from "./ThreeDotsMenu";
import { momentLocal } from "../../../util/TimeUtil";
import moment from "moment";

const { Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = "MM/DD/YYYY";

export const GlobalFilter = (props) => {
  const { selectedFilter } = props;

  const [defaultOption, setDefaultOption] = useState();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septempber",
    "October",
    "November",
    "December",
  ];
  const weekNames = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

  useEffect(() => {
    setDefaultOption(getDefaultValue(selectedFilter)); // Update default option when filter changes
    handleFilterChange(getDefaultValue(selectedFilter));
  }, [selectedFilter]);

  const getDefaultValue = (filter) => {
    const getCurrentWeekOfMonth = () => {
      const currentDate = new Date();
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
      );
      const dayOfMonth = currentDate.getDate();
      const firstDayOfWeek = startOfMonth.getDay(); // Day of the week for the 1st of the month (0=Sunday, 1=Monday, etc.)

      // Calculate the current week number
      return Math.ceil((dayOfMonth + firstDayOfWeek) / 7);
    };
    switch (filter) {
      case "Monthly":
        return props.cardFilters && !/^\d{4}$/.test(props.cardFilters)
          ? props.cardFilters
          : new Date().getMonth();
      case "Yearly":
        return props.cardFilters && !/^\d{1,2}$/.test(props.cardFilters)
          ? props.cardFilters
          : new Date().getFullYear();
      case "Weekly":
        return props.cardFilters && !/^\d{4}$/.test(props.cardFilters)
          ? props.cardFilters
          : getCurrentWeekOfMonth();
      case "Daily":
        return new Date(); // Return the current date for Daily
      default:
        return new Date().getMonth();
    }
  };

  const renderMonthOptions = () => (
    <Menu className="dotSettings">
      <Menu.Item>
        <Radio.Group
          value={defaultOption}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // Two columns
            gap: "5px",
          }}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((month, index) => (
            <Radio key={month} value={index} style={{ padding: "5px" }}>
              {month}
            </Radio>
          ))}
        </Radio.Group>
      </Menu.Item>
    </Menu>
  );

  const renderYearOptions = () => (
    <Menu className="dotSettings">
      <Menu.Item>
        <Radio.Group
          value={defaultOption}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // Two columns
            gap: "5px",
          }}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          {Array.from(
            { length: 10 },
            (_, i) => new Date().getFullYear() - i,
          ).map((year) => (
            <Radio key={year} value={year} style={{ padding: "5px" }}>
              {year}
            </Radio>
          ))}
        </Radio.Group>
      </Menu.Item>
    </Menu>
  );

  const renderWeekOptions = () => {
    const getWeeksInMonth = (year, month) => {
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      return Math.ceil((firstDayOfMonth + daysInMonth) / 7); // Calculate total weeks
    };

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-indexed (0 = January)
    const totalWeeks = getWeeksInMonth(currentYear, currentMonth);

    return (
      <Menu className="dotSettings">
        <Menu.Item>
          <Radio.Group
            value={defaultOption}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)", // Two columns
              gap: "5px",
            }}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            {Array.from({ length: totalWeeks }, (_, index) => (
              <Radio
                key={`Week-${index + 1}`}
                value={index}
                style={{ padding: "5px" }}
              >
                {`Week ${index + 1}`}
              </Radio>
            ))}
          </Radio.Group>
        </Menu.Item>
      </Menu>
    );
  };

  const handleFilterChange = (value) => {
    setDefaultOption(value);
    if (props.onFilterChange) {
      props.onFilterChange(value); // Notify the parent
    }
  };

  const renderDropdown = () => {
    switch (selectedFilter) {
      case "Monthly":
        return renderMonthOptions();
      case "Yearly":
        return renderYearOptions();
      case "Weekly":
        return renderWeekOptions(); // Render calendar for Daily
      default:
        return renderMonthOptions();
    }
  };

  const getButtonLabel = () => {
    if (selectedFilter === "Monthly") {
      return `Month : ${monthNames[defaultOption]}` || "Select Month";
    }
    if (selectedFilter === "Weekly") {
      return `Week : ${weekNames[defaultOption]}` || "Select Week";
    }
    if (selectedFilter === "Daily") {
      return defaultOption || "Select Date";
    }
    if (selectedFilter === "Yearly") {
      return `Year : ${defaultOption}` || "Select Year";
    }
    return "Select";
  };

  return (
    <Row justify="space-between" align="start" style={{ marginTop: 10 }}>
      <Col className="InvFilterCount" md={8} lg={8} xl={8} xxl={6}>
        <Row justify="space-between" className="dash-row InvFilterNumLabel">
          <Col>
            {selectedFilter == "Daily" && (
              <DatePicker
                defaultValue={moment(new Date(), "DD-MM-YYYY")} // Convert to Moment.js
                format="DD-MM-YYYY"
                onChange={(date, dateString) => {
                  console.log("Selected date: ", dateString);
                }}
              />
            )}
            {selectedFilter != "Daily" && selectedFilter != "Custom" && (
              <Dropdown overlay={renderDropdown()} trigger={["click"]}>
                <Button className="primary ant-btn-sm" shape="round">
                  {getButtonLabel()}
                </Button>
              </Dropdown>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
