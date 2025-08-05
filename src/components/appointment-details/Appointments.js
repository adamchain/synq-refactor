import {
  Badge,
  Col,
  Input,
  Row,
  Select,
  Tabs,
  Tooltip,
  Typography,
} from "antd";
import React from "react";

import "./Appointment.scss";
import AppointmentDetailsHistoryPage from "./History";

import CustomImage from "../generic-components/custom-image/CustomImage";

import TreatmentsTab from "../treatments/TreatmentsTab";

import { Link } from "react-router-dom";
import AppointmentServices from "../../services/AppointmentServices";
import BillingsTab from "./../estimate/BillingsTab";
import LabsTab from "./../labs/LabsTab";

import { CommonContext } from "../../context/CommonContext";
import BillingServices from "../../services/BillingServices";
import LabServices from "../../services/LabServices";
import PatientServices from "../../services/PatientServices";
import CommonUtil from "../util/CommonUtil";
import TreatmentServices from "./../../services/TreatmentServices";
import AnesthesiaTab from "./../anesthesia/AnesthesiaTab";
import AppointmentSoapDetails from "./AppointmentSoapDetails";
import UploadsTab from "./upload/UploadsTab";
import WeightTrend from "./WeightTrend";

const { Option } = Select;
const { Text, Title } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

const soapOptions = [
  { label: "Full SOAP", value: "Fsoap" },
  { label: "Quick SOAP", value: "Qsoap" },
];

class AppointmentDetailsPage extends React.Component {
  formRef = React.createRef();
  static contextType = CommonContext;
  state = {
    patientDetails: {
      name: "",
      type: "",
      age: "",
      image: "",
    },
    allergies: "-",
    weightInLBS: "-",
    weightInKG: "-",
    soapValue: "Fsoap",
    billingsData: { items: [] },
    labsData: [],
    showWeightTrend: null,
    treatmentsData: [],
    isVitalEdit: false,
    soapId: null,
    apptHistory: [],
    doctorDetails: [],
    isFormTouched: false,
    showBadgeForLabs: false,
    addNewLabs: false,
    extraInfo: {},
  };

  TabTitle = () => {
    return (
      <span>
        Labs {this.state.showBadgeForLabs ? <Badge color="#f50" /> : null}
      </span>
    );
  };

  onSuccessLabTest = () => {
    LabServices.getLabsForPatient(this.props.inputIds.patientId, (labsData) =>
      this.setState({ labsData }),
    );
  };

  onTabChange = (tabname) => {
    if (tabname === "4") {
      BillingServices.getBillingForAppointment(
        this.props.inputIds.apptId,
        (billingsData) => this.setState({ billingsData }),
      );
    }
    if (tabname === "3") {
      AppointmentServices.getAppointmentById(
        this.props.inputIds.apptId,
        (data) =>
          this.setState({
            addNewLabs:
              data.apptStatusId === 11 || data.apptStatusId === 3
                ? true
                : false,
          }),
      );
      this.setState({ showBadgeForLabs: false });
      LabServices.getLabsForPatient(this.props.inputIds.patientId, (labsData) =>
        this.setState({ labsData }),
      );
    }
    if (tabname === "2" && this.props.inputIds.patientId) {
      TreatmentServices.getMedicationAndVaccineByPatientId(
        this.props.inputIds.patientId,
        (data) => this.setState({ treatmentsData: data }),
      );
    }
    if (tabname === "1") {
      this.getPatientHistory();
    }
  };

  getPatientHistory = () => {
    AppointmentServices.fetchPatientAppointmentHistoryDetails(
      this.props.inputIds.patientId,
      (data) => {
        let history = data.map((apptHistory) => ({
          ...apptHistory,
          numeric: (apptHistory.numeric ?? []).reduce((sum, k) => {
            sum[k.attrName] = k;
            return sum;
          }, {}),
          categorical: (apptHistory.categorical ?? []).reduce((sum, k) => {
            sum[k.attrName] = k;
            return sum;
          }, {}),
          freeform: (apptHistory.freeform ?? []).reduce((sum, k) => {
            sum[k.attrName] = k;
            return sum;
          }, {}),
        }));
        this.setState({ apptHistory: history });
      },
    );
  };

  // componentWillUnmount () {
  //     if(i)
  //     alert("hai");
  // }

  getPatientDetails = () => {
    PatientServices.fetchPatientById(this.props.inputIds.patientId, (data) =>
      this.setState({
        patientDetails: {
          name: data.patientName + " " + data.clientLastName,
          type: data.breedName,
          age: CommonUtil.getAgeFromYear(data.dob),
          image: data.image,
          sexCd: data.sexCd,
        },
        weightInLBS: data.weight
          ? CommonUtil.weightCoversion(data.weight, data.weightUnitCd, "LBS")
          : "-",
        weightInKG: data.weight
          ? CommonUtil.weightCoversion(data.weight, data.weightUnitCd, "KG")
          : "-",
        allergies: data?.freeForm?.AG ?? "None",
        behaviorAlerts: data?.freeForm?.BA ?? "None",
      }),
    );
  };

  // getSoapDetails = () => {

  //     AppointmentServices.fetchAppointmentSoapDetails(this.props.inputIds.apptId,(data) => {
  //         if(data){
  //             this.setState({isVitalEdit:true,soapId:data.id,soapValue:data.type === 'F' ? "Fsoap" : "Qsoap"});
  //             this.formRef.current.setFieldsValue(data) ;

  //         } else{
  //             this.setState({isVitalEdit:false});
  //             this.formRef.current.setFieldsValue({WTUnit:"LBS",TMUnit:"F" , categorical: {1:2,2:3,5:14,6:24,7:31,8:34,9:37,10:40,11:43,12:46,13:49,14:52,15:55,16:58,17:61,18:64,19:67}, freeform:{5:"Bright, alert and responsive.",6:"0/4 Dental calculus with no appreciable gingivitis",7:"Eyes are quiet and comfortable. Normal vision.",8:"Ears are clean and free of debris. No evidence of pain or pruritus.",9:"Skin and coat appear normal.  No skin masses, alopecia or skin lesions noted.  No fleas or ticks present.",10:"Normal posture and gait. Pet is fully weight bearing on all four limbs.  Normal range of motion in all joints.  Normal body condition with healthy musculature.",11:"Abdomen is soft and non painful on palpation. Normal borborgymi on auscultation.",12:"Heart auscults clearly with no murmur.  Normal rate and rhythm. Pulses are strong and synchronous.",13:"Lung fields auscult clearly in all fields. Normal respiratory rate and effort.",14:"No abnormalities noted.  Mentation is normal, and pet is fully ambulatory with no proprioceptive deficits.",15:"No evidence of pain, swelling or inflammation.",16:"All peripheral lymph nodes palpate normally.",17:"Normal rectal exam. Anal sacs are not full, and no masses palpated."}});
  //         }

  //     });
  // }

  componentDidMount() {
    //categorical: {1:"1",2:"3",5:"14",6:"24",7:"31",8:"34",9:"37",10:"40",11:"43",12:"46",13:"49",14:"52",15:"55",16:"58",17:"61",18:"64",19:"67"},
    //this.getSoapDetails();
    this.getPatientDetails();
    this.getPatientHistory();

    AppointmentServices.fetchAllVets((data) =>
      this.setState({ doctorDetails: data }),
    );
    AppointmentServices.getAppointmentById(this.props.inputIds.apptId, (data) =>
      this.setState({ extraInfo: data }),
    );
  }

  render() {
    const { soapValue } = this.state;
    return (
      <>
        {this.state.showWeightTrend && (
          <WeightTrend
            onClose={() => this.setState({ showWeightTrend: null })}
            patientId={this.props.inputIds.patientId}
          />
        )}
        <Row gutter={[24, 24]} className="appointment-details iPadScroller">
          <Col
            className="appointment-details-form"
            xs={24}
            lg={24}
            xl={24}
            xxl={12}
          >
            <div
              className="appointment-details-widget"
              style={
                !this.props.osType ? { height: "calc(100vh - 145px)" } : {}
              }
            >
              <Row className="page-header">
                <Col
                  md={6}
                  xl={5}
                  xxl={6}
                  className="appointment-image-details"
                >
                  <CustomImage
                    styling={{
                      width: "131px",
                      height: "131px",
                      showInfoIcon:
                        this.state.behaviorAlerts !== "None" ? true : false,
                      showOuterBorder: true,
                      toolTip: {
                        title: this.state.behaviorAlerts,
                        placement: "bottom",
                      },

                      url: this.state.patientDetails.image
                        ? `url(` + this.state.patientDetails.image + `)`
                        : "",
                      fullName: this.state.patientDetails.name,
                      ringColor: CommonUtil.genderBasedColor(
                        this.state.patientDetails.sexCd,
                      ),
                    }}
                  ></CustomImage>
                </Col>
                <Col
                  md={12}
                  xl={12}
                  xxl={13}
                  className="appointment-client-details"
                >
                  <Row>
                    <Col>
                      <Text className="text-default-500 aptPatientName">
                        {this.state.patientDetails.name}
                      </Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {/* <Row>
                                <Col>
                                    <Text className="text-secondary-400">
                                        {this.state.patientDetails.type}
                                    </Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Text className="text-secondary-400">
                                        {this.state.patientDetails.age}
                                    </Text>
                                </Col>
                            </Row>
                            <Row className="appointment-client-allergies">
                                <Col className="client-allergies-detail">
                                    <Text className="text-secondary-400">
                                        Allergies:
                                    </Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Text className="text-danger-400">
                                        {this.state.allergies}
                                    </Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} xl={6} xxl={5}>
                            <Row justify="end">
                                <Col offset={48}>
                                <Tooltip title="View Trend">
                                    <Text className="aptDetailsWeightLarge">
                                        <Link onClick={() => this.setState({showWeightTrend:true})}>{this.state.weightInLBS}
                                        <sup className="aptWeightLBSSup" style={{
                                            verticalAlign: 'super', fontSize: '14px'
                                        }}>
                                            LBS
                                        </sup></Link>
                                    </Text></Tooltip>
                                </Col>
                            </Row>
                            <Row justify="end">
                                <Col style={{textAlign:'right'}}>
                                    <Text style={{
                                        fontSize: '14px',
                                        color: '#767676',
                                        fontWeight: '500',
                                    }}>
                                        {this.state.weightInKG +" KG"}
                                    </Text><br />
                                    <Link onClick={() => this.setState({showWeightTrend:true})}>View Trend</Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row> */}
              {this.context.defaultBranch.branchTypeId != 2 &&
                !this.props.osType && (
                  <AppointmentSoapDetails
                    refershData={() => {
                      this.getPatientHistory();
                      this.getPatientDetails();
                    }}
                    inputIds={this.props.inputIds}
                  />
                )}
            </div>
          </Col>
          <Col xs={24} xxl={12}>
            <div
              className="appointment-details-info appointment-details-widget"
              style={{ height: "calc(100vh - 145px)" }}
            >
              <Tabs
                defaultActiveKey={this.props.osType ? "7" : "1"}
                onChange={this.onTabChange}
                destroyInactiveTabPane={true}
                className="appointment-tabs"
              >
                {this.props.osType &&
                  this.context.defaultBranch.branchTypeId != 2 && (
                    <TabPane className="tab-history" tab="SOAP" key="7">
                      <AppointmentSoapDetails
                        refershData={() => {
                          this.getPatientHistory();
                          this.getPatientDetails();
                        }}
                        inputIds={this.props.inputIds}
                      />
                    </TabPane>
                  )}
                <TabPane className="tab-history" tab="History" key="1">
                  <AppointmentDetailsHistoryPage
                    historyData={this.state.apptHistory}
                    apptId={this.props.inputIds.apptId}
                  />
                </TabPane>
                {this.context.defaultBranch.branchTypeId != 2 && (
                  <TabPane
                    className="tab-health"
                    tab={
                      this.context.defaultBranch.branchTypeId != 2
                        ? "Treatments"
                        : "Services"
                    }
                    key="2"
                  >
                    <TreatmentsTab
                      patientId={this.props.inputIds.patientId}
                      apptId={this.props.inputIds.apptId}
                      data={this.state.treatmentsData}
                      patientName={this.state.patientDetails.name}
                    />
                  </TabPane>
                )}
                {this.context.defaultBranch.branchTypeId != 2 && (
                  <TabPane
                    className="tab-labs"
                    tab={<this.TabTitle name="Labs" value="3" />}
                    key="3"
                  >
                    <LabsTab
                      showBadge={this.state.showBadgeForLabs}
                      addNewLabs={this.state.addNewLabs}
                      showNewLabs={true}
                      inputIds={{
                        ...this.props.inputIds,
                        ...this.state.patientDetails,
                      }}
                      labsData={this.state.labsData}
                      onSuccessLabTest={this.onSuccessLabTest}
                    />
                  </TabPane>
                )}

                <TabPane className="tab-estimates" tab="Billing" key="4">
                  <BillingsTab
                    doctorId={this.state.extraInfo.providerId}
                    apptTypeId={this.state.extraInfo.apptTypeId}
                    refreshData={() => this.onTabChange("4")}
                    billingsData={this.state.billingsData}
                    patientId={this.props.inputIds.patientId}
                    apptId={this.props.inputIds.apptId}
                    clientId={this.props.inputIds.clientId}
                    showBadge={(data) =>
                      this.setState({ showBadgeForLabs: data })
                    }
                    patientName={this.state.patientDetails.name}
                  />
                </TabPane>
                <TabPane tab="Uploads" key="5">
                  <UploadsTab patientId={this.props.inputIds.patientId} />
                </TabPane>
                {this.context.defaultBranch.branchTypeId != 2 &&
                  this.context.userProfile.permission !== "FD" && (
                    <TabPane tab="Anesthesia" key="6">
                      <AnesthesiaTab
                        apptId={this.props.inputIds.apptId}
                        patientId={this.props.inputIds.patientId}
                        doctorDetails={this.state.doctorDetails}
                      />
                    </TabPane>
                  )}
              </Tabs>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default AppointmentDetailsPage;
