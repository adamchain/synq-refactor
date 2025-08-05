import { Col, Row, Typography, Button } from "antd";
import { AddPetIcon } from "../util/SvgUtil";
import React, { useContext } from "react";
import CustomImage from "../generic-components/custom-image/CustomImage";

import CommonUtil from "./../util/CommonUtil";
import { CommonContext } from "../../context/CommonContext";
import { momentLocal } from "../util/TimeUtil";

const { Text } = Typography;

// const pets = [
//     {
//         name: 'Woodhouse Politte',
//         image: `url(http://${window.location.host}/whskrwoodhouse1.jpg)`,
//         breed: 'Cavalier King Charles Spaniel',
//         showInfoIcon: true,
//         status: 'Active',
//         weightLb: '12.70',
//         weightKg: '5.76',
//         age: '6YR 7MO',
//         dob: '10/21/14'
//     },
//     {
//         name: 'Aria Politte',
//         image: `url(http://${window.location.host}/whskrwoodhouse1.jpg?resize=1500,1000)`,
//         breed: 'Cavalier King Charles Spaniel',
//         showInfoIcon: false,
//         status: 'Active',
//         weightLb: '12.70',
//         weightKg: '5.76',
//         age: '6YR 7MO',
//         dob: '10/21/14'
//     },
//     {
//         name: 'Archer Politte',
//         image: 'url(https://cdn.birdwatchingdaily.com/2017/05/Scarlet-Tanager-Ouellette-660x440.jpg',
//         showInfoIcon: false,
//         breed: 'Cavalier King Charles Spaniel',
//         status: 'Active',
//         weightLb: '12.70',
//         weightKg: '5.76',
//         age: '6YR 7MO',
//         dob: '10/21/14'
//     },
//     {
//         name: 'Archer Politte',
//         image: 'url(https://cdn.birdwatchingdaily.com/2017/05/Scarlet-Tanager-Ouellette-660x440.jpg',
//         showInfoIcon: false,
//         breed: 'Cavalier King Charles Spaniel',
//         status: 'Active',
//         weightLb: '12.70',
//         weightKg: '5.76',
//         age: '6YR 7MO',
//         dob: '10/21/14'
//     },
//     {
//         name: 'Woodhouse Politte',
//         image: `url(http://${window.location.host}/whskrwoodhouse1.jpg)`,
//         breed: 'Cavalier King Charles Spaniel',
//         showInfoIcon: true,
//         status: 'Active',
//         weightLb: '12.70',
//         weightKg: '5.76',
//         age: '6YR 7MO',
//         dob: '10/21/14'
//     },
// ];

const Pets = (props) => {
  const context = useContext(CommonContext);

  //const [allPets , setAllPets] = useState([]);
  //const img= `url(http://${window.location.host}/whskrwoodhouse1.jpg?resize=1500,1000)`;

  // useEffect(() => {
  //     if(props.clientId)
  //         ClientServices.fetchPatientByClientId(props.clientId,setAllPets);

  // },[props.clientId]);
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={12} xl={8} xxl={8} className="petWidgetCont">
        <div
          onClick={() => {
            props.onAddPetClick();
          }}
          className="client-profile-pet-widget add-new-pets"
        >
          <AddPetIcon className="addPetIcon" />
          <div className="add-new-pets-text-container">
            <Text className="add-new-pets-text">Add New Pet</Text>
          </div>
        </div>
      </Col>
      {props.allPets.map((pet, index) => {
        return (
          <Col xs={24} md={12} xl={8} xxl={8} className="petWidgetCont">
            <div className="client-profile-pet-widget">
              <CustomImage
                styling={{
                  width: "114px",
                  height: "114px",
                  showInfoIcon: !!pet.alert,
                  showOuterBorder: true,
                  toolTip: {
                    title: pet.alert,
                    placement: "top",
                  },
                  url: `url(` + pet?.image + `)`,
                  ringColor: CommonUtil.genderBasedColor(pet?.sexCd),
                }}
              ></CustomImage>
              <Row justify="center">
                <Text className="text-default-500 font-size-20">
                  {pet.patientName + " " + props.clientLastName}
                </Text>
              </Row>
              <Row justify="center">
                <Text className="text-secondary-400">{pet.breedName}</Text>
              </Row>
              <Row justify="center client-status">
                <Text
                  className="petStatus"
                  style={{ color: pet.status === "Active" ? "green" : "red" }}
                >
                  {pet.status}
                </Text>
              </Row>
              <Row justify="space-around">
                <Col justify="center" className="petWeightAgeCont">
                  <Text className="text-default-500 font-size-14">Weight</Text>
                  <div>
                    <Text className="text-default-400">
                      {" "}
                      {CommonUtil.fixedWeight(pet.weight)}LBS
                    </Text>
                  </div>
                  <div className="petWeightDOB">
                    <Text className="text-secondary-400 font-size-12">
                      {CommonUtil.getWeightFromLbs(pet.weight)}KG
                    </Text>
                  </div>
                </Col>
                <Col justify="center" className="petWeightAgeCont">
                  <Text className="text-default-500 font-size-14">Age</Text>
                  <div>
                    <Text className="text-default-400">
                      {CommonUtil.getAgeFromYear(pet.dob)}
                    </Text>
                  </div>
                  <div className="petWeightDOB">
                    <Text className="text-secondary-400 font-size-12">
                      DOB{" "}
                      {momentLocal(pet.dob, "YYYY-MM-DD").format("MM/DD/YY")}
                    </Text>
                  </div>
                </Col>
              </Row>
              <Row justify="center" className="view-profile">
                <Button
                  shape="round"
                  onClick={() => props.onPatientProfileClick(pet.patientId)}
                >
                  View Profile
                </Button>
              </Row>
              <Row justify="center" className="schedule-appointment">
                <Button
                  shape="round"
                  onClick={() =>
                    context.openCreateEditAny({
                      type: "appointment",
                      optionalData: { patientId: pet.patientId },
                      callback: () => {},
                    })
                  }
                >
                  Schedule Appointment
                </Button>
              </Row>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default Pets;
