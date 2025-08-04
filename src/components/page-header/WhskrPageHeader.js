import React, { Fragment } from "react";
import { PageHeader, Button, Row, Col } from "antd";
import { PlusIcon } from "../util/SvgUtil";
import { PlusOutlined } from "@ant-design/icons";
import "./WhskrPageHeader.scss";
import { useState, useContext } from "react";
import AnyCreateModal from "./any-create-modal/AnyCreateModal";
import { CommonContext } from "../../context/CommonContext";
import CreatEditClientDrawer from "./../client-profile-page/CreateEditClientDrawer";
import AppointmentModals from "../appointments-modals/AppointmentModals";
import ReminderDrawer from "../reminders/ReminderDrawer";
import BlockOffModal from "../appointments-modals/BlockOffModal";
import InvoiceDrawer from "../billings-page/InvoiceDrawer";
import BillingServices from "../../services/BillingServices";
import NewInvoiceDrawer from "../billings-page/NewInvoiceDrawer";
import BoardingModal from "../appointments-modals/BoardingModal";

const WhskrPageHeader = (props) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const context = useContext(CommonContext);

  let isExtraPresent = (props.extra ?? []).length > 0;
  let requiredExtras = props.requiredExtras ?? [];
  return (
    <Fragment>
      {isCreateModalOpen && (
        <AnyCreateModal
          onClose={() => setIsCreateModalOpen(false)}
          onButtonClick={(type) => {
            context.openCreateEditAny({
              type,
              callback: props.buttonCallBack ? props.buttonCallBack : () => {},
            });
            setIsCreateModalOpen(false);
          }}
        />
      )}

      <PageHeader
        className="page-header-menu"
        title={props.title}
        extra={
          isExtraPresent ? (
            props.extra
          ) : (
            <Row align="middle" gutter={[16, 0]}>
              {[
                ...requiredExtras,

                <Col>
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="createNewBTN"
                    key="1"
                    type="primary"
                    size="large"
                    shape="round"
                    icon={<PlusIcon className="createNewIcon" />}
                  >
                    {/* onClick={props.onRightButtonClick} */}

                    {props.buttonName}
                  </Button>
                </Col>,
              ]}
            </Row>
          )
        }
      ></PageHeader>

      {context.createEditAny.type === "client" && (
        <CreatEditClientDrawer
          onClose={() => context.closeCreateEditAny()}
          clientData={context.createEditAny.requiredInputData}
          isEdit={!!context.createEditAny.requiredInputData}
          allStates={context.allStates}
          onSuccessReturn={() => {
            context.createEditAny.callback();
            context.closeCreateEditAny();
          }}
        />
      )}

      {context.createEditAny.type === "appointment" && (
        <AppointmentModals
          onClose={() => context.closeCreateEditAny()}
          appointmentData={context.createEditAny.requiredInputData}
          optionalData={context.createEditAny.optionalData}
          isEdit={!!context.createEditAny.requiredInputData}
          onSuccessReturn={() => {
            context.createEditAny.callback();
            context.closeCreateEditAny();
          }}
        />
      )}

      {context.createEditAny.type === "reminder" && (
        <ReminderDrawer
          data={context.createEditAny.requiredInputData}
          isEdit={!!context.createEditAny.requiredInputData}
          onClose={() => context.closeCreateEditAny()}
          onSuccess={() => {
            context.createEditAny.callback();
            context.closeCreateEditAny();
          }}
        />
      )}

      {context.createEditAny.type === "invoice" && (
        <NewInvoiceDrawer
          inputData={
            context.createEditAny.requiredInputData?.billingsData ?? {}
          }
          record={context.createEditAny.requiredInputData?.record ?? {}}
          isEdit={!!context.createEditAny.requiredInputData}
          onRefresh={(invoiceId) =>
            BillingServices.getBillingById(invoiceId, (data) =>
              context.openCreateEditAny((k) => ({
                ...k,
                requiredData: { ...k.requiredData, billingsData: data },
              })),
            )
          }
          onSuccessReturn={() => {
            context.createEditAny.callback();
            context.closeCreateEditAny();
          }}
          onClose={() => context.closeCreateEditAny()}
        />
      )}
      {/* <InvoiceDrawer
     inputData ={context.createEditAny.requiredInputData?.billingsData??{}} 
     record ={context.createEditAny.requiredInputData?.record??{}}
     isEdit = {!!context.createEditAny.requiredInputData}
     onSuccessReturn = {()=>{context.createEditAny.callback();context.closeCreateEditAny()}}
     onClose={()=>context.closeCreateEditAny()} />} */}
      {context.createEditAny.type === "block-off" && (
        <BlockOffModal
          data={context.createEditAny.requiredInputData}
          isEdit={!!context.createEditAny.requiredInputData}
          onClose={() => context.closeCreateEditAny()}
          onSuccess={() => {
            context.createEditAny.callback();
            context.closeCreateEditAny();
          }}
        />
      )}
      {context.createEditAny.type === "boarding" && (
        <BoardingModal
          data={context.createEditAny.requiredInputData}
          isEdit={!!context.createEditAny.requiredInputData}
          onClose={() => context.closeCreateEditAny()}
          onSuccess={() => {
            context.createEditAny.callback();
            context.closeCreateEditAny();
          }}
        />
      )}
    </Fragment>
  );
};

export default WhskrPageHeader;
