import { Card } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CommonContext } from "../../context/CommonContext";
import AppointmentServices from "../../services/AppointmentServices";
import CommonUtil from "../util/CommonUtil";
import "./HomePage.scss";
import HomePageEmptyBlock from "./HomePageEmptyBlocks";

// const data = [
//     { name: 'Wellness', value: 26.5 },
//     { name: 'Dentals', value: 40 },
//     { name: 'Surgery', value: 0.2 },
//     { name: 'Emergency', value: 30 },
//   ];
//const COLORS = ['#008489', '#FF8F00', '#0483DD', '#9966FF', '#E83151', '#cbcbcb'];

const ApptOverview = () => {
  const context = useContext(CommonContext);

  const [data, setData] = useState([]);
  const [appttype1, setAppttype1] = useState([]);
  const [appttype, setAppttype] = useState([]);

  //for dynamic appt types
  useEffect(() => {
    const fetchAptType = () => {
      AppointmentServices.fetchApptTypes((data) => setAppttype1(data));
    };
    fetchAptType();
  }, []);

  useEffect(() => {
    if (appttype1.length > 0) {
      const transformedApptType = transformApptType(appttype1);
      setAppttype(transformedApptType);
    }
  }, [appttype1]);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const transformApptType = (appttypeArray) => {
    return appttypeArray.map((item) => ({
      name: item.apptTypeName,
      value: item.apptTypeId,
      presetTime: item.apptLength,
      color: generateRandomColor(),
    }));
  };

  ///////

  useEffect(() => {
    AppointmentServices.getUpcomingAppointmentOverview(setData);
  }, []);

  let isDataPresent = data && data.length > 0;
  return (
    <Card
      className={isDataPresent ? "apptOverviewWidget" : ""}
      style={{ borderRadius: "16px" }}
      title="Appointment Overview"
      bordered={false}
    >
      {isDataPresent ? (
        <div className="AOchartsAlign" style={{ width: "100%", height: 200 }}>
          <ResponsiveContainer>
            <PieChart>
              <Legend
                layout="vertical"
                verticalAlign="right"
                align="right"
                formatter={(value, entry) =>
                  value + " " + entry.payload.percent + "%"
                }
              ></Legend>
              <Pie
                data={data}
                cx={120}
                cy={90}
                innerRadius={70}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="percent"
                legendType="circle"
              >
                {data.map((entry, index) => (
                  // <Cell key={`cell-${index}`} fill={Object.values(context.defaultBranch.branchTypeId === 2 ? CommonUtil.APPOINTMEN_TYPES_BRANCH_TYPE_2 : CommonUtil.APPOINTMEN_TYPES).find(k => {
                  //   return entry.name.toUpperCase() === k.name.toUpperCase();
                  // })?.color??"gray"} />
                  //<Cell key={`cell-${index}`} fill={appttype?.find(k => {
                  //  return entry.name.toUpperCase() === k.name.toUpperCase();
                  //})?.color??"gray"} />
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      Object.values(
                        context.defaultBranch.branchTypeId === 2
                          ? CommonUtil.APPOINTMEN_TYPES_BRANCH_TYPE_2
                          : CommonUtil.APPOINTMEN_TYPES,
                      ).find(
                        (k) =>
                          entry.name.toUpperCase() === k.name.toUpperCase(),
                      )?.color ?? "gray"
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        HomePageEmptyBlock.displayEmptyAppointmentOverview({
          width: 180,
          height: 180,
        })
      )}
    </Card>
  );
};

export default ApptOverview;
