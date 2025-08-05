import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import {
  ComposedChart,
  AreaChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AppointmentServices from "../../services/AppointmentServices";
import { momentLocal } from "../util/TimeUtil";

// const sampleData = [
//     {
//       name: 'Page A',
//       uv: 590,
//       pv: 800,
//       amt: 1400,
//     },
//     {
//       name: 'Page B',
//       uv: 868,
//       pv: 967,
//       amt: 1506,
//     },
//     {
//       name: 'Page C',
//       uv: 1397,
//       pv: 1098,
//       amt: 989,
//     },
//     {
//       name: 'Page D',
//       uv: 1480,
//       pv: 1200,
//       amt: 1228,
//     },
//     {
//       name: 'Page E',
//       uv: 1520,
//       pv: 1108,
//       amt: 1100,
//     },
//     {
//       name: 'Page F',
//       uv: 1400,
//       pv: 680,
//       amt: 1700,
//     },
//   ];

const WeightTrend = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    AppointmentServices.fetchWeightTrendForPatient(props.patientId, (data) =>
      setData(
        data.map((k) => ({
          ...k,
          weight: Number(k.weight.toFixed(2)),
          date: momentLocal(k.date, "YYYY-MM-DD").format("MM/DD/YYYY"),
        })),
      ),
    );
  }, []);

  const WeightChart = ({ chartType }) => {
    let size = props.isChartOnly
      ? { width: "100%", height: 200 }
      : { width: "100%", height: 400 };
    return chartType === "area" ? (
      data?.length > 1 ? (
        <div style={{ ...size }}>
          <ResponsiveContainer>
            <AreaChart
              //data={[{weight:10,date:"1234-34-34"},{weight:20,date:"1234-34-35"},{weight:25,date:"1234-34-36"},{weight:10,date:"1234-34-37"}]}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" hide={true} />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <Area
                type="natural"
                dataKey="weight"
                strokeWidth={3}
                stroke="#329296"
                fill="#BBDADA"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <span></span>
      )
    ) : (
      <div style={{ ...size }}>
        <ResponsiveContainer>
          <ComposedChart data={data}>
            <CartesianGrid stroke="#e0e0e0" />
            <XAxis dataKey="date" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="weight" barSize={20} fill="#008489" />
          </ComposedChart>
        </ResponsiveContainer>{" "}
      </div>
    );
  };
  return props.isChartOnly ? (
    <WeightChart chartType={props.chartType} />
  ) : (
    <Modal
      title="Weight Trend"
      visible={true}
      onCancel={props.onClose}
      footer={null}
    >
      <WeightChart />
    </Modal>
  );
};

export default WeightTrend;
