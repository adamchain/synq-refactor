import {
  Badge,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Tabs,
  Typography,
} from "antd";
import React from "react";

import "./Appointment.scss";
import AppointmentDetailsFormConfig from "./Config";
import { FORM_FIELDS } from "./Constant";

import AppointmentServices from "../../services/AppointmentServices";

import { CommonContext } from "../../context/CommonContext";
import LabServices from "../../services/LabServices";
import WeightTrend from "./WeightTrend";

const { Option } = Select;
const { Text, Title } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

const soapOptions = [
  { label: "Full SOAP", value: "Fsoap" },
  { label: "Quick SOAP", value: "Qsoap" },
];

class AppointmentSoapDetails extends React.Component {
  formRef = React.createRef();
  static contextType = CommonContext;

  state = {
    clientDetails: {
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
  };

  TabTitle = () => {
    return (
      <span>
        Labs {this.state.showBadgeForLabs ? <Badge color="#f50" /> : null}
      </span>
    );
  };

  getInputField = (field) => {
    return (
      <Form.Item
        className="text-default-400"
        label={field.label}
        labelCol={{ span: 24 }}
        style={{ paddingRight: 20 }}
        name={field.name}
      >
        <Input
          className="text-default-400"
          placeholder={field.placeholder}
          suffix={field.suffix ?? ""}
        />
      </Form.Item>
    );
  };
  getNumberField = (field) => {
    return (
      <Form.Item
        className="text-default-400"
        label={field.label}
        labelCol={{ span: 24 }}
        style={{ paddingRight: 20 }}
        name={field.name}
      >
        <Input
          className="text-default-400"
          type="number"
          placeholder={field.placeholder}
          suffix={field.suffix ?? ""}
        />
      </Form.Item>
    );
  };
  getRadioField = (field) => {
    let attribute = field.optionAttribute;
    return (
      <Form.Item
        label={field.label}
        labelCol={{ span: 24 }}
        name={field.name}
        className="text-default-400"
      >
        <Radio.Group>
          {field.inputs.map((option, index) => {
            return (
              <Radio value={attribute ? option[attribute.value] : option}>
                {attribute ? option[attribute.name] : option}
              </Radio>
            );
          })}
        </Radio.Group>
      </Form.Item>
    );
  };
  getCheckBoxField = (field) => {
    let attribute = field.optionAttribute;
    return (
      <Form.Item
        label={field.label}
        labelCol={{ span: 24 }}
        name={field.name}
        className="text-default-400"
      >
        <Checkbox.Group>
          {field.inputs.map((option, index) => {
            return (
              <Checkbox value={attribute ? option[attribute.value] : option}>
                {attribute ? option[attribute.name] : option}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      </Form.Item>
    );
  };

  getTextAreaField = (field, config) => {
    return (
      <Form.Item
        label={field.label}
        className="text-default-400"
        labelCol={{ span: 24 }}
        name={field.name}
        style={{
          paddingRight:
            config.mainLabel === FORM_FIELDS.OBJECTIVE &&
            config.type === "Fsoap"
              ? 20
              : "",
        }}
      >
        <TextArea
          className="text-default-400"
          placeholder={field.placeholder}
          autoSize={{
            minRows:
              config.mainLabel === FORM_FIELDS.OBJECTIVE &&
              config.type === "Fsoap"
                ? 3
                : 4,
          }}
        />
      </Form.Item>
    );
  };
  // getSelectField = (field) => {
  //     return (
  //         <Form.Item label={field.label}
  //                    className='text-default-400'
  //                    labelCol={{span: 24}}
  //                    style={{paddingRight: 20}}>
  //             <Select
  //                 name={field.name}
  //                 defaultValue={field.inputs[0]}
  //                 filterOption={(input, option) =>
  //                     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
  //                 {field.inputs.map((option) => {
  //                     return (
  //                         <Option
  //                             value={option}>
  //                             {option}
  //                         </Option>
  //                     );
  //                 })}
  //             </Select>
  //         </Form.Item>
  //     );
  // }
  getSelectField = (field) => {
    let attribute = field.optionAttribute;

    return (
      <Form.Item
        label={field.label}
        className="text-default-400"
        labelCol={{ span: 24 }}
        shouldUpdate
        style={{ paddingRight: 20 }}
      >
        {({ getFieldValue }) => {
          let styleApply = field.inputs.find(
            (k) => k.value === getFieldValue(field.name),
          )?.name;
          return (
            <Form.Item name={field.name}>
              <Select
                id={field.name + "id"}
                showSearch={true}
                placeholder={"Select " + field.label}
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                style={{
                  color:
                    styleApply === "Normal"
                      ? "green"
                      : styleApply === "Abnormal"
                        ? "red"
                        : "",
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {field.inputs.map((option) => {
                  return (
                    <Option
                      value={attribute ? option[attribute.value] : option}
                    >
                      {attribute ? option[attribute.name] : option}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          );
        }}
      </Form.Item>
    );
  };
  refershData = () => {
    this.getSoapDetails();
    //this.getPatientDetails();
    this.setState({ isFormTouched: false });
    this.context.updateStateFields({ isApptFormTouched: false });
    this.props.refershData();
  };

  onSoapTabChange = (e) => {
    //console.log('radio4 checked', e.target.value);
    this.setState({
      soapValue: e.target.value,
    });
  };
  handleSubmit = (submitData) => {
    //console.log("==>",JSON.stringify(submitData))
    let inputData = {
      ...submitData,
      numeric: Object.keys(submitData.numeric)
        .filter((k) => submitData.numeric[k])
        .map((k) => {
          let data = {
            attrId: k,
            value: submitData.numeric[k],
          };
          if (data.attrId == 6 || data.attrId == 5) {
            data.unitCd =
              data.attrId == 6 ? submitData.WTUnit : submitData.TMUnit;
          }
          return data;
        }),
      categorical: Object.keys(submitData.categorical)
        .filter((k) => submitData.categorical[k])
        .map((k) => ({
          attrId: k,
          value: submitData.categorical[k],
        })),

      freeform: Object.keys(submitData.freeform)
        .filter((k) => submitData.freeform[k])
        .map((k) => ({
          attrId: k,
          value: submitData.freeform[k],
        })),
    };

    this.state.isVitalEdit
      ? AppointmentServices.editAppointmentDetails(
          {
            ...inputData,
            ...this.props.inputIds,
            type: this.state.soapValue[0],
            id: this.state.soapId,
          },
          this.refershData,
        )
      : AppointmentServices.createAppointmentDetails(
          {
            ...inputData,
            ...this.props.inputIds,
            type: this.state.soapValue[0],
          },
          this.refershData,
        );

    //console.log(JSON.stringify(inputData));
  };

  onSuccessLabTest = () => {
    LabServices.getLabsForPatient(this.props.inputIds.patientId, (labsData) =>
      this.setState({ labsData }),
    );
  };

  // componentWillUnmount () {
  //     if(i)
  //     alert("hai");
  // }

  // getPatientDetails = () => {
  //     PatientServices.fetchPatientById(this.props.inputIds.patientId,(data)=>this.setState({
  //         clientDetails: {
  //             name: data.patientName+ " " +data.clientLastName,
  //             type: data.breedName,
  //             age: CommonUtil.getAgeFromYear(data.dob),
  //             image: data.image
  //         },
  //         weightInLBS:data.weight?CommonUtil.weightCoversion(data.weight,data.weightUnitCd,"LBS"):"-",
  //         weightInKG:data.weight?CommonUtil.weightCoversion(data.weight,data.weightUnitCd,"KG"):"-",
  //         allergies: (data?.freeForm?.AG)??"None",
  //         behaviorAlerts:data?.freeForm?.BA??"None"

  //     }));

  // }

  getSoapDetails = () => {
    if (this.formRef) {
      this.formRef.current.setFieldsValue({
        WTUnit: "LBS",
        TMUnit: "F",
        categorical: { 1: 2 },
        freeform: {
          5: "Bright, alert and responsive.",
          6: "0/4 Dental calculus with no appreciable gingivitis",
          7: "Eyes are quiet and comfortable. Normal vision.",
          8: "Ears are clean and free of debris. No evidence of pain or pruritus.",
          9: "Skin and coat appear normal.  No skin masses, alopecia or skin lesions noted.  No fleas or ticks present.",
          10: "Normal posture and gait. Pet is fully weight bearing on all four limbs.  Normal range of motion in all joints.  Normal body condition with healthy musculature.",
          11: "Abdomen is soft and non painful on palpation. Normal borborgymi on auscultation.",
          12: "Heart auscults clearly with no murmur.  Normal rate and rhythm. Pulses are strong and synchronous.",
          13: "Lung fields auscult clearly in all fields. Normal respiratory rate and effort.",
          14: "No abnormalities noted.  Mentation is normal, and pet is fully ambulatory with no proprioceptive deficits.",
          15: "No evidence of pain, swelling or inflammation.",
          16: "All peripheral lymph nodes palpate normally.",
          17: "Normal rectal exam. Anal sacs are not full, and no masses palpated.",
        },
      });
    }

    AppointmentServices.fetchAppointmentSoapDetails(
      this.props.inputIds.apptId,
      (data) => {
        if (data) {
          this.setState({
            isVitalEdit: true,
            soapId: data.id,
            soapValue: data.type === "F" ? "Fsoap" : "Qsoap",
          });
          this.formRef.current.setFieldsValue(data);
        } else {
          this.setState({ isVitalEdit: false });
          this.formRef.current.setFieldsValue({
            WTUnit: "LBS",
            TMUnit: "F",
            categorical: {
              1: 2,
              2: 3,
              5: 14,
              6: 24,
              7: 31,
              8: 34,
              9: 37,
              10: 40,
              11: 43,
              12: 46,
              13: 49,
              14: 52,
              15: 55,
              16: 58,
              17: 61,
              18: 64,
              19: 67,
            },
            freeform: {
              5: "Bright,alert and responsive.",
              6: "0/4 Dental calculus with no appreciable gingivitis",
              7: "Eyes are quiet and comfortable. Normal vision.",
              8: "Ears are clean and free of debris. No evidence of pain or pruritus.",
              9: "Skin and coat appear normal.  No skin masses, alopecia or skin lesions noted.  No fleas or ticks present.",
              10: "Normal posture and gait. Pet is fully weight bearing on all four limbs.  Normal range of motion in all joints.  Normal body condition with healthy musculature.",
              11: "Abdomen is soft and non painful on palpation. Normal borborgymi on auscultation.",
              12: "Heart auscults clearly with no murmur.  Normal rate and rhythm. Pulses are strong and synchronous.",
              13: "Lung fields auscult clearly in all fields. Normal respiratory rate and effort.",
              14: "No abnormalities noted.  Mentation is normal, and pet is fully ambulatory with no proprioceptive deficits.",
              15: "No evidence of pain, swelling or inflammation.",
              16: "All peripheral lymph nodes palpate normally.",
              17: "Normal rectal exam. Anal sacs are not full, and no masses palpated.",
            },
          });
        }
      },
    );
  };

  componentDidMount() {
    //categorical: {1:"1",2:"3",5:"14",6:"24",7:"31",8:"34",9:"37",10:"40",11:"43",12:"46",13:"49",14:"52",15:"55",16:"58",17:"61",18:"64",19:"67"},
    this.getSoapDetails();
    //this.getPatientDetails();

    AppointmentServices.fetchAllVets((data) =>
      this.setState({ doctorDetails: data }),
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
        <Row gutter={[24, 24]} className="appointment-details">
          <Col className="appointment-details-form" xs={24} lg={24} xl={24}>
            <div className="appointment-details-widget">
              <Row style={{ padding: "30px" }}>
                <Radio.Group
                  defaultValue="Fsoap"
                  options={soapOptions}
                  onChange={this.onSoapTabChange}
                  value={soapValue}
                  optionType="button"
                />
              </Row>
              <Row>
                <Form
                  ref={this.formRef}
                  onValuesChange={(value) => {
                    this.setState({ isFormTouched: true });
                    this.context.updateStateFields({ isApptFormTouched: true });
                  }}
                  onFinish={(values) => this.handleSubmit(values)}
                  id="appointment-form-id"
                  name="appointmentForm"
                >
                  {AppointmentDetailsFormConfig(this.state.soapValue)
                    .filter((k) => !k.type || k.type === this.state.soapValue)
                    .map((config, index) => {
                      return (
                        <Row className="form-fields">
                          <Row span={24} className="main-icon">
                            <ul className="appointmentSectionTitle">
                              <li>
                                <div className="appointmentSectionIcon">
                                  {config.maninIcon}
                                </div>{" "}
                                <Text className="text-default-600">
                                  {config.mainLabel}
                                </Text>
                              </li>
                            </ul>
                          </Row>
                          <Row
                            className={
                              AppointmentDetailsFormConfig(this.state.soapValue)
                                .length !==
                              index + 1
                                ? "form-fields-row"
                                : null
                            }
                          >
                            {config.formFields.map((field, index) => {
                              return (
                                <Col
                                  span={
                                    config.type === "Qsoap"
                                      ? "24"
                                      : config.mainLabel === FORM_FIELDS.VITALS
                                        ? "8"
                                        : [
                                              "Assessment",
                                              "Plan",
                                              "Subjective",
                                            ].includes(config.mainLabel)
                                          ? "24"
                                          : field.type === "textarea"
                                            ? "18"
                                            : "6"
                                  }
                                >
                                  {/* getGridSpan(config, index)}
                                                         offset={ config.mainLabel === FORM_FIELDS.VITALS ? '8' : config.mainLabel === FORM_FIELDS.OBJECTIVE ? '' : ''}
                                                         pull={ config.mainLabel === FORM_FIELDS.VITALS ? '8' : config.mainLabel === FORM_FIELDS.OBJECTIVE ? '' : ''}> */}
                                  {(() => {
                                    switch (field.type) {
                                      case "input":
                                        return this.getInputField(field);
                                      case "number":
                                        return this.getNumberField(field);
                                      case "radio":
                                        return this.getRadioField(field);
                                      case "checkbox":
                                        return this.getCheckBoxField(field);
                                      case "select":
                                        return this.getSelectField(field);
                                      default:
                                        return this.getTextAreaField(
                                          field,
                                          config,
                                        );
                                    }
                                  })()}
                                </Col>
                              );
                            })}
                          </Row>
                        </Row>
                      );
                    })}
                </Form>
              </Row>
              {this.context.userProfile.permission !== "FD" && (
                <Row>
                  <Col
                    xs={24}
                    style={{
                      paddingTop: 0,
                      paddingBottom: 50,
                      paddingLeft: 24,
                      paddingRight: 24,
                    }}
                  >
                    {" "}
                    <Button
                      className="appointmentBtmSave"
                      form="appointment-form-id"
                      htmlType="submit"
                      type="primary"
                      shape="round"
                      size="large"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default AppointmentSoapDetails;
