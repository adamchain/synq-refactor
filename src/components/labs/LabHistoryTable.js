import { Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import AdvancedTable from "../generic-components/advanced-table/AdvancedTable";

//import pdf from './../../output.pdf';
import { CommonContext } from "../../context/CommonContext";
import { momentLocal } from "../util/TimeUtil";
import { LabActions, LabActionTypes } from "./LabActions";

const { Link } = Typography;

const LabHistoryTable = (props) => {
  const context = useContext(CommonContext);
  const [modalOpen, setModalOpen] = useState({ type: null, data: {} });
  const [deviceList, setDeviceList] = useState([]);

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
      title: "Administered",
      dataIndex: "date",
      sorter: true,
      render: (text) => momentLocal(text, "YYYY-MM-DD").format("MM/DD/YYYY"),
    },
    // {title: 'Action', dataIndex: 'action', width:'110px',render: (text, record) => (
    //     <Row justify="start" gutter={[8,0]}>

    //           <Col> <Tooltip title="View">
    //              <Link onClick={() => (record.labType === 4) ? LabServices.openExternalLabRequestForm(record.id): window.open(record.reportPath,"_blank")} disabled={!record.reportPath}><ViewIcon /></Link></Tooltip>
    //             </Col>
    //           {context.userProfile.permission !== 'FD' &&  <Col>
    //           <Popconfirm
    //                 title="Are you sure you want to delete this lab?"
    //                 okText="Yes"
    //                 cancelText="No"
    //                 onConfirm={()=>{LabServices.deleteLabOrder(record.id,props.refreshTableData)}}>
    //                <Tooltip title="Delete Lab"><Link>
    //     <TrashIcon />
    //     </Link>
    //     </Tooltip>
    // </Popconfirm></Col> }
    //     </Row>
    //   )}

    {
      title: "Action",
      dataIndex: "action",
      width: "110px",
      render: (text, record) => {
        let tempProps = {
          modalOpen,
          setModalOpen,
          deviceList,
          setDeviceList,
          refreshTableData: props.refreshTableData,
          text,
          record,
        };
        return <LabActionTypes {...tempProps} />;
      },
    },
  ];
  let tempProps = {
    modalOpen,
    setModalOpen,
    deviceList,
    setDeviceList,
    refreshTableData: props.refreshTableData,
  };
  return (
    <>
      <AdvancedTable
        size="middle"
        id="lab-history-table"
        rowClassName={(record, index) =>
          record.type == "4" ? "is-external-lab" : ""
        }
        columns={columns}
        dataSource={props.historyLabsTableData}
        rowKey="id"
      />
      <LabActions {...tempProps} />
    </>
  );
};

export default LabHistoryTable;
