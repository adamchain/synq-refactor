import React, { useState, useEffect, useContext } from "react";
import WhskrPageHeader from "../page-header/WhskrPageHeader";
import "./ClientProfile.scss";
import {
  Tag,
  Form,
  Typography,
  Layout,
  Space,
  Tooltip,
  Card,
  Button,
} from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { EditIcon, UserIcon } from "../util/SvgUtil";

import ClientServices from "./../../services/ClientServices";
import ClientProfile from "../client-profile-page/ClientProfile";
import PatientProfile from "../patient-profile-page/PatientProfile";
import AdvancedTable from "../generic-components/advanced-table/AdvancedTable";

import { CommonContext } from "../../context/CommonContext";
import AppointmentDetailsPage from "../appointment-details/Appointments";
import { callUnSavedModal } from "../generic-components/un-saved-modal/UnSavedModal";
const { Content } = Layout;
const { Text } = Typography;

const originData = [];

for (let i = 0; i < 2; i++) {
  originData.push({
    key: i.toString(),
    firstname: `Elizebeth`,
    lastname: "Thronton",
    email: `cliemt1123@gmail.com`,
    primaryphone: "8881119991",
    oktext: "No",
    okemail: "Yes",
    city: "Cumming",
    state: "GA",
    status: ["Active"],
  });
}

const customStringFilter = (searchValue, currentValue) =>
  currentValue
    ? currentValue.toString().toLowerCase().includes(searchValue.toLowerCase())
    : "";

const ClientDetailsList = (props) => {
  const context = useContext(CommonContext);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [viewClientData, setviewClientData] = useState("");
  const [clientData, setClientData] = useState({});
  const [patientId, setPatientId] = useState("");
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [viewType, setViewType] = useState({ name: "list", data: null });
  const [allPets, setAllPets] = useState([]);

  //apptId,patientId,providerId,clientId,patientName
  let allStates = context.allStates;
  useEffect(() => {
    if (viewType.name === "list") {
      ClientServices.getAllClients(setData);
      setviewClientData("");
      setClientData({});
    }
  }, [viewType]);

  useEffect(() => {
    if (props.searchData) {
      if (props.searchData.type === "P") {
        setviewClientData(props.searchData.clId);
        ClientServices.fetchPatientByClientId(
          props.searchData.clId,
          setAllPets,
        );
        //ClientServices.fetchClientById(data.clientId,setClientData);

        onPatientProfileClick(props.searchData.id);
      }

      if (props.searchData.type === "C") {
        show({ clientId: props.searchData.id });
      }
    }
  }, [props.searchData]);

  // useEffect(() => {
  //     if(props.clientData.clientId)

  // },[props.clientData.clientId]);

  useEffect(() => {
    if (viewClientData)
      ClientServices.fetchClientById(viewClientData, setClientData);
  }, [viewClientData]);

  const dynamicTitle = () => {
    if (viewType.name === "patient") {
      return (
        <>
          <ArrowLeftOutlined
            onClick={() => setViewType({ name: "client", data: null })}
          />
          &nbsp;&nbsp;<Text>Patient Profile</Text>
        </>
      );
    }
    if (viewType.name === "client") {
      return (
        <>
          <ArrowLeftOutlined
            onClick={() => setViewType({ name: "list", data: null })}
          />
          &nbsp;&nbsp;<Text>Client Profile</Text>
        </>
      );
    } else {
      return "Clients";
    }
  };

  const edit = (record) => {
    //setEditingKey();
    ClientServices.fetchClientById(record.clientId, (clientTempData) => {
      context.openCreateEditAny({
        type: "client",
        callback: () => {
          setViewType({ name: "list", data: null });
          ClientServices.getAllClients(setData);
        },
        requiredInputData: clientTempData,
      });
    });
  };

  const show = (record) => {
    setviewClientData(record.clientId);
    ClientServices.fetchPatientByClientId(record.clientId, setAllPets);
    setViewType({ name: "client", data: null });
  };

  const onPatientProfileClick = (pid) => {
    setViewType({ name: "patient", data: null });
    setPatientId(pid);
  };

  const onTabChange = (tabname) => {
    if (tabname === "Pets") {
      ClientServices.fetchPatientByClientId(clientData.clientId, setAllPets);
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: ["primary", "firstName"],
      sorter: (a, b) => a.primary.firstName.localeCompare(b.primary.firstName),
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.primary?.firstName),
      isSearchRequired: true,
      width: 180,
    },
    {
      title: "Last Name",
      dataIndex: ["primary", "lastName"],
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.primary.lastName.localeCompare(b.primary.lastName),
      //sorter: true,
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.primary?.lastName),
      isSearchRequired: true,
      width: 180,
    },
    {
      title: "Email",
      dataIndex: ["primary", "email"],
      sorter: (a, b) => a.primary.email.localeCompare(b.primary.email),
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.primary?.email),
      isSearchRequired: true,
      width: 275,
    },
    {
      title: "Primary Phone",
      dataIndex: "phones",
      onFilter: (searchValue, record) =>
        customStringFilter(
          searchValue,
          record.phones?.find((k) => k.type === "PH")?.nbr ?? "",
        ),
      isSearchRequired: true,
      width: 165,
      render: (text) => text?.find((k) => k.type === "PH")?.nbr ?? "",
    },
    {
      title: "Mobile",
      dataIndex: "phones",
      onFilter: (searchValue, record) =>
        customStringFilter(
          searchValue,
          record.phones?.find((k) => k.type === "PM")?.nbr ?? "",
        ),
      isSearchRequired: true,
      width: 165,
      render: (text) => text?.find((k) => k.type === "PM")?.nbr ?? "",
    },

    {
      title: "Ok to Text",
      dataIndex: "allowText",
      filters: [
        {
          text: "Yes",
          value: "Yes",
        },
        {
          text: "No",
          value: "No",
        },
      ],
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.allowText ? "Yes" : "No"),
      render: (text) => (text ? "Yes" : "No"),
      isSearchRequired: false,
      width: 135,
    },
    {
      title: "Ok to Email",
      dataIndex: "allowEmail",
      filters: [
        {
          text: "Yes",
          value: "Yes",
        },
        {
          text: "No",
          value: "No",
        },
      ],
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.allowEmail ? "Yes" : "No"),
      render: (text) => (text ? "Yes" : "No"),
      isSearchRequired: false,
      width: 135,
    },
    {
      title: "City",
      dataIndex: ["primary", "city"],
      onFilter: (searchValue, record) =>
        customStringFilter(searchValue, record?.primary?.city),
      isSearchRequired: true,
      width: 155,
    },
    {
      title: "State",
      dataIndex: ["primary", "stateId"],
      onFilter: (searchValue, record) =>
        customStringFilter(
          searchValue,
          allStates?.[record?.primary?.stateId]?.stateName ?? "",
        ),
      render: (text) => allStates?.[text]?.stateName ?? "",
      width: 100,
      isSearchRequired: true,
    },
    {
      title: "Status",
      dataIndex: "clientStatus",
      width: 150,
      filters: [
        {
          text: "Active",
          value: "A",
        },
        {
          text: "Inactive",
          value: "I",
        },
      ],
      isSearchRequired: false,
      onFilter: (searchValue, record) =>
        customStringFilter(
          searchValue,
          record?.clientStatus === "A" ? "A" : "I",
        ),
      render: (text) => (
        <Tag
          style={{ width: "90px", textAlign: "center" }}
          color={text === "A" ? "green" : "red"}
        >
          {text === "A" ? "Active" : "Inactive"}
        </Tag>
      ),
    },

    {
      title: "Actions",
      dataIndex: "operation",
      fixed: "right",
      width: 120,
      render: (_, record) => {
        return (
          <Space size={[16, 16]}>
            <Typography.Link onClick={() => edit(record)}>
              <Tooltip title="Edit Client">
                <EditIcon />{" "}
              </Tooltip>
            </Typography.Link>
            <Typography.Link onClick={() => show(record)}>
              <Tooltip title="View Profile">
                <UserIcon />{" "}
              </Tooltip>
            </Typography.Link>
          </Space>
        );
      },
    },
  ];

  return (
    <Layout id="clientOverview">
      {viewClientData && viewType.name === "client" && (
        <>
          <WhskrPageHeader
            title={dynamicTitle()}
            buttonName="Create New"
            buttonCallBack={() => {
              setViewType({ name: "list", data: null });
            }}
          />
          <ClientProfile
            key={clientData.clientId}
            clientData={clientData}
            onPatientProfileClick={onPatientProfileClick}
            allStates={allStates}
            allPets={allPets}
            onSuccessReturn={(isSuccess, showlist) => {
              if (showlist) setViewType({ name: "list", data: null });
              else
                ClientServices.fetchClientById(
                  clientData.clientId,
                  setClientData,
                );
            }}
            onTabChange={onTabChange}
            osType={context.isTabletMode}
            onPatientUpdate={() =>
              ClientServices.fetchPatientByClientId(
                clientData.clientId,
                setAllPets,
              )
            }
            viewAppointment={(
              apptId,
              patientId,
              providerId,
              clientId,
              patientName,
            ) =>
              setViewType({
                type: "appointment",
                data: {
                  apptId,
                  patientId,
                  providerId,
                  clientId,
                  patientName,
                  previousViewType: "client",
                },
              })
            }
          />{" "}
        </>
      )}

      {viewType.name === "patient" && (
        <>
          {" "}
          <WhskrPageHeader
            title={dynamicTitle()}
            buttonName="Create New"
            buttonCallBack={() => {
              setViewType({ name: "list", data: null });
            }}
          />
          <PatientProfile
            onSearch={props.onSearch}
            key={patientId}
            clientData={clientData}
            allStates={allStates}
            patientId={patientId}
            allPets={allPets}
            osType={context.isTabletMode}
            onClientProfileCLick={() => {
              setViewType({ name: "client", data: null });
              onTabChange("Pets");
            }}
            onPatientUpdate={() =>
              ClientServices.fetchPatientByClientId(
                clientData.clientId,
                setAllPets,
              )
            }
            onPatientProfileClick={onPatientProfileClick}
            viewAppointment={(
              apptId,
              patientId,
              providerId,
              clientId,
              patientName,
            ) =>
              setViewType({
                type: "appointment",
                data: {
                  apptId,
                  patientId,
                  providerId,
                  clientId,
                  patientName,
                  previousViewType: "patient",
                },
              })
            }
          />{" "}
        </>
      )}
      {viewType.name === "list" && (
        <>
          <WhskrPageHeader
            title={dynamicTitle()}
            buttonName="Create New"
            buttonCallBack={() => {
              setViewType({ name: "list", data: null });
            }}
          />

          <Content className="masterContentPadding">
            <Card
              className="pageCardContainer"
              title="Clients"
              bordered={false}
            >
              <AdvancedTable
                rowkey="clientId"
                dataSource={data}
                columns={columns}
                rowClassName="editable-row"
                scroll={{ x: 1500, y: "calc(100vh - 360px)" }}
                className="clientListTable"
              />
            </Card>
          </Content>
        </>
      )}
      {viewType.type === "appointment" && (
        <>
          <WhskrPageHeader
            title={
              <>
                <ArrowLeftOutlined
                  onClick={() => {
                    let disRegard = () => {
                      setViewType((k) => ({
                        name: k.data.previousViewType,
                        data: null,
                      }));
                      context.updateStateFields({ callUnSavedModal: false });
                    };
                    if (context.isApptFormTouched) {
                      callUnSavedModal(disRegard, () => {});
                    } else {
                      disRegard();
                    }
                  }}
                />
                &nbsp;&nbsp;<Text>Appointment Details</Text>
              </>
            }
            buttonName="Save Appointment"
            buttonCallBack={() => {
              setViewType({ name: "list", data: null });
            }}
            extra={
              context.userProfile.permission === "FD"
                ? [<div></div>]
                : [
                    <Button
                      form="appointment-form-id"
                      htmlType="submit"
                      type="primary"
                      shape="round"
                      size="large"
                      className="topActionButton"
                    >
                      {" "}
                      Save Appointment
                    </Button>,
                  ]
            }
          />

          <Content className="masterContentPadding">
            <AppointmentDetailsPage
              inputIds={{
                apptId: viewType.data.apptId,
                patientId: viewType.data.patientId ?? patientId,
                clientId: clientData.clientId,
              }}
              osType={context.isTabletMode}
            />
          </Content>
        </>
      )}
    </Layout>
  );
};

export default ClientDetailsList;
