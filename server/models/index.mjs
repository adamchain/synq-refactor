import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _AnimalControlLicensing from  "./AnimalControlLicensing.mjs";
import _Appt from  "./Appt.mjs";
import _ApptStatus from  "./ApptStatus.mjs";
import _ApptType from  "./ApptType.mjs";
import _Billing from  "./Billing.mjs";
import _BillingItem from  "./BillingItem.mjs";
import _BillingPackageItem from  "./BillingPackageItem.mjs";
import _BillingPayment from  "./BillingPayment.mjs";
import _BillingStatus from  "./BillingStatus.mjs";
import _Branch from  "./Branch.mjs";
import _BranchHours from  "./BranchHours.mjs";
import _BranchPhone from  "./BranchPhone.mjs";
import _BranchSettings from  "./BranchSettings.mjs";
import _BranchStatus from  "./BranchStatus.mjs";
import _CalendarBlock from  "./CalendarBlock.mjs";
import _CalendarBlockExcluded from  "./CalendarBlockExcluded.mjs";
import _CalendarBlockRepeat from  "./CalendarBlockRepeat.mjs";
import _Client from  "./Client.mjs";
import _ClientPhone from  "./ClientPhone.mjs";
import _ClientReferral from  "./ClientReferral.mjs";
import _ClientStatus from  "./ClientStatus.mjs";
import _ClientSyContact from  "./ClientSyContact.mjs";
import _ClockHistory from  "./ClockHistory.mjs";
import _ClockHistoryOption from  "./ClockHistoryOption.mjs";
import _CommunicationHistory from  "./CommunicationHistory.mjs";
import _CommunicationMedium from  "./CommunicationMedium.mjs";
import _CommunicationPurpose from  "./CommunicationPurpose.mjs";
import _CommunicationType from  "./CommunicationType.mjs";
import _Country from  "./Country.mjs";
import _DiscountType from  "./DiscountType.mjs";
import _EmailTemplate from  "./EmailTemplate.mjs";
import _Estimate from  "./Estimate.mjs";
import _EstimateItem from  "./EstimateItem.mjs";
import _EstimateStatus from  "./EstimateStatus.mjs";
import _Exam from  "./Exam.mjs";
import _ExamAnesthesiaGen from  "./ExamAnesthesiaGen.mjs";
import _ExamAnesthesiaGenCatheterLoc from  "./ExamAnesthesiaGenCatheterLoc.mjs";
import _ExamAnesthesiaGenIvFluidType from  "./ExamAnesthesiaGenIvFluidType.mjs";
import _ExamAnesthesiaMed from  "./ExamAnesthesiaMed.mjs";
import _ExamAnesthesiaMedRoute from  "./ExamAnesthesiaMedRoute.mjs";
import _ExamAnesthesiaMedType from  "./ExamAnesthesiaMedType.mjs";
import _ExamAnesthesiaMedUnit from  "./ExamAnesthesiaMedUnit.mjs";
import _ExamAnesthesiaVitalTrack from  "./ExamAnesthesiaVitalTrack.mjs";
import _ExamAnesthesiaVitalTrackProps from  "./ExamAnesthesiaVitalTrackProps.mjs";
import _ExamAnesthesiaVitalTrackStatus from  "./ExamAnesthesiaVitalTrackStatus.mjs";
import _ExamAnesthesiaVitalTrackValue from  "./ExamAnesthesiaVitalTrackValue.mjs";
import _ExamCategoryMeasurement from  "./ExamCategoryMeasurement.mjs";
import _ExamCategoryProp from  "./ExamCategoryProp.mjs";
import _ExamCategoryValueProp from  "./ExamCategoryValueProp.mjs";
import _ExamFreeformMeasurement from  "./ExamFreeformMeasurement.mjs";
import _ExamFreeformProp from  "./ExamFreeformProp.mjs";
import _ExamNumericMeasurement from  "./ExamNumericMeasurement.mjs";
import _ExamNumericProp from  "./ExamNumericProp.mjs";
import _FileHistory from  "./FileHistory.mjs";
import _Inventory from  "./Inventory.mjs";
import _InventoryAddOn from  "./InventoryAddOn.mjs";
import _InventoryCategory from  "./InventoryCategory.mjs";
import _InventoryCsubstanceType from  "./InventoryCsubstanceType.mjs";
import _InventoryDetail from  "./InventoryDetail.mjs";
import _InventoryExpirationPeriod from  "./InventoryExpirationPeriod.mjs";
import _InventoryLable from  "./InventoryLable.mjs";
import _InventoryLot from  "./InventoryLot.mjs";
import _InventoryMeasurement from  "./InventoryMeasurement.mjs";
import _InventoryPackage from  "./InventoryPackage.mjs";
import _InventoryPackageItem from  "./InventoryPackageItem.mjs";
import _InventoryPatientReminder from  "./InventoryPatientReminder.mjs";
import _InventoryPatientReminderUser from  "./InventoryPatientReminderUser.mjs";
import _InventoryPatientReminderUserGroup from  "./InventoryPatientReminderUserGroup.mjs";
import _InventoryProcedure from  "./InventoryProcedure.mjs";
import _InventoryReminder from  "./InventoryReminder.mjs";
import _InventoryReminderPeriod from  "./InventoryReminderPeriod.mjs";
import _InventoryReminderType from  "./InventoryReminderType.mjs";
import _InventoryReminderUserGroup from  "./InventoryReminderUserGroup.mjs";
import _InventoryReminderUserGroupType from  "./InventoryReminderUserGroupType.mjs";
import _InventoryRxPrescription from  "./InventoryRxPrescription.mjs";
import _InventoryTestVendor from  "./InventoryTestVendor.mjs";
import _InventoryType from  "./InventoryType.mjs";
import _InventoryVaccine from  "./InventoryVaccine.mjs";
import _LabOrder from  "./LabOrder.mjs";
import _LabOrderAntechLabOrder from  "./LabOrderAntechLabOrder.mjs";
import _LabOrderIdexxLabOrder from  "./LabOrderIdexxLabOrder.mjs";
import _LabOrderManual from  "./LabOrderManual.mjs";
import _LabOrderStatus from  "./LabOrderStatus.mjs";
import _LabOrderTest from  "./LabOrderTest.mjs";
import _LabOrderVendorOrder from  "./LabOrderVendorOrder.mjs";
import _LabOrderZoetisRefLabOrder from  "./LabOrderZoetisRefLabOrder.mjs";
import _LabRawData from  "./LabRawData.mjs";
import _LabVendor from  "./LabVendor.mjs";
import _MeasureUnit from  "./MeasureUnit.mjs";
import _MeasureUnitType from  "./MeasureUnitType.mjs";
import _Message from  "./Message.mjs";
import _NoteHistory from  "./NoteHistory.mjs";
import _Organization from  "./Organization.mjs";
import _Patient from  "./Patient.mjs";
import _PatientBreed from  "./PatientBreed.mjs";
import _PatientCategoricalAttr from  "./PatientCategoricalAttr.mjs";
import _PatientCategoricalMeasurement from  "./PatientCategoricalMeasurement.mjs";
import _PatientColor from  "./PatientColor.mjs";
import _PatientExamFile from  "./PatientExamFile.mjs";
import _PatientFamily from  "./PatientFamily.mjs";
import _PatientFreeformAttr from  "./PatientFreeformAttr.mjs";
import _PatientFreeformMeasurement from  "./PatientFreeformMeasurement.mjs";
import _PatientHistory from  "./PatientHistory.mjs";
import _PatientMed from  "./PatientMed.mjs";
import _PatientNumericAttr from  "./PatientNumericAttr.mjs";
import _PatientNumericMeasurement from  "./PatientNumericMeasurement.mjs";
import _PatientSex from  "./PatientSex.mjs";
import _PatientSpecies from  "./PatientSpecies.mjs";
import _PatientStatus from  "./PatientStatus.mjs";
import _PatientVaccine from  "./PatientVaccine.mjs";
import _PatientWeight from  "./PatientWeight.mjs";
import _Payment from  "./Payment.mjs";
import _PaymentCardSubtype from  "./PaymentCardSubtype.mjs";
import _PaymentCardType from  "./PaymentCardType.mjs";
import _PaymentMethod from  "./PaymentMethod.mjs";
import _PaymentStatus from  "./PaymentStatus.mjs";
import _PhoneType from  "./PhoneType.mjs";
import _RelationType from  "./RelationType.mjs";
import _Reminder from  "./Reminder.mjs";
import _ReminderHistory from  "./ReminderHistory.mjs";
import _ReminderRepeat from  "./ReminderRepeat.mjs";
import _ReminderRepeatType from  "./ReminderRepeatType.mjs";
import _ReminderStatus from  "./ReminderStatus.mjs";
import _ReminderType from  "./ReminderType.mjs";
import _ReminderUser from  "./ReminderUser.mjs";
import _Report from  "./Report.mjs";
import _ReportStatus from  "./ReportStatus.mjs";
import _ReportType from  "./ReportType.mjs";
import _ResetPassword from  "./ResetPassword.mjs";
import _State from  "./State.mjs";
import _TimeZone from  "./TimeZone.mjs";
import _UsdaLicensing from  "./UsdaLicensing.mjs";
import _User from  "./User.mjs";
import _UserBranchMapping from  "./UserBranchMapping.mjs";
import _UserContact from  "./UserContact.mjs";
import _UserHashToken from  "./UserHashToken.mjs";
import _UserInventory from  "./UserInventory.mjs";
import _UserPhone from  "./UserPhone.mjs";
import _UserPwd from  "./UserPwd.mjs";
import _UserRole from  "./UserRole.mjs";
import _UserRoleMapping from  "./UserRoleMapping.mjs";
import _UserStatus from  "./UserStatus.mjs";
import _UserWorkingException from  "./UserWorkingException.mjs";
import _UserWorkingHours from  "./UserWorkingHours.mjs";
import _VaccineDose from  "./VaccineDose.mjs";
import _VaccinePeriod from  "./VaccinePeriod.mjs";
import _VaccineType from  "./VaccineType.mjs";
import _WeightUnit from  "./WeightUnit.mjs";
import _WorkingDay from  "./WorkingDay.mjs";
import _ZoetisBranchSetting from  "./ZoetisBranchSetting.mjs";
import _ZoetisLabOrderOrphan from  "./ZoetisLabOrderOrphan.mjs";
import _ZoetisLabOrderTestItem from  "./ZoetisLabOrderTestItem.mjs";
import _ZoetisLabSection from  "./ZoetisLabSection.mjs";
import _ZoetisLabTest from  "./ZoetisLabTest.mjs";
import _ZoetisSpeciesMapping from  "./ZoetisSpeciesMapping.mjs";

export default function initModels(sequelize) {
  const AnimalControlLicensing = _AnimalControlLicensing.init(sequelize, DataTypes);
  const Appt = _Appt.init(sequelize, DataTypes);
  const ApptStatus = _ApptStatus.init(sequelize, DataTypes);
  const ApptType = _ApptType.init(sequelize, DataTypes);
  const Billing = _Billing.init(sequelize, DataTypes);
  const BillingItem = _BillingItem.init(sequelize, DataTypes);
  const BillingPackageItem = _BillingPackageItem.init(sequelize, DataTypes);
  const BillingPayment = _BillingPayment.init(sequelize, DataTypes);
  const BillingStatus = _BillingStatus.init(sequelize, DataTypes);
  const Branch = _Branch.init(sequelize, DataTypes);
  const BranchHours = _BranchHours.init(sequelize, DataTypes);
  const BranchPhone = _BranchPhone.init(sequelize, DataTypes);
  const BranchSettings = _BranchSettings.init(sequelize, DataTypes);
  const BranchStatus = _BranchStatus.init(sequelize, DataTypes);
  const CalendarBlock = _CalendarBlock.init(sequelize, DataTypes);
  const CalendarBlockExcluded = _CalendarBlockExcluded.init(sequelize, DataTypes);
  const CalendarBlockRepeat = _CalendarBlockRepeat.init(sequelize, DataTypes);
  const Client = _Client.init(sequelize, DataTypes);
  const ClientPhone = _ClientPhone.init(sequelize, DataTypes);
  const ClientReferral = _ClientReferral.init(sequelize, DataTypes);
  const ClientStatus = _ClientStatus.init(sequelize, DataTypes);
  const ClientSyContact = _ClientSyContact.init(sequelize, DataTypes);
  const ClockHistory = _ClockHistory.init(sequelize, DataTypes);
  const ClockHistoryOption = _ClockHistoryOption.init(sequelize, DataTypes);
  const CommunicationHistory = _CommunicationHistory.init(sequelize, DataTypes);
  const CommunicationMedium = _CommunicationMedium.init(sequelize, DataTypes);
  const CommunicationPurpose = _CommunicationPurpose.init(sequelize, DataTypes);
  const CommunicationType = _CommunicationType.init(sequelize, DataTypes);
  const Country = _Country.init(sequelize, DataTypes);
  const DiscountType = _DiscountType.init(sequelize, DataTypes);
  const EmailTemplate = _EmailTemplate.init(sequelize, DataTypes);
  const Estimate = _Estimate.init(sequelize, DataTypes);
  const EstimateItem = _EstimateItem.init(sequelize, DataTypes);
  const EstimateStatus = _EstimateStatus.init(sequelize, DataTypes);
  const Exam = _Exam.init(sequelize, DataTypes);
  const ExamAnesthesiaGen = _ExamAnesthesiaGen.init(sequelize, DataTypes);
  const ExamAnesthesiaGenCatheterLoc = _ExamAnesthesiaGenCatheterLoc.init(sequelize, DataTypes);
  const ExamAnesthesiaGenIvFluidType = _ExamAnesthesiaGenIvFluidType.init(sequelize, DataTypes);
  const ExamAnesthesiaMed = _ExamAnesthesiaMed.init(sequelize, DataTypes);
  const ExamAnesthesiaMedRoute = _ExamAnesthesiaMedRoute.init(sequelize, DataTypes);
  const ExamAnesthesiaMedType = _ExamAnesthesiaMedType.init(sequelize, DataTypes);
  const ExamAnesthesiaMedUnit = _ExamAnesthesiaMedUnit.init(sequelize, DataTypes);
  const ExamAnesthesiaVitalTrack = _ExamAnesthesiaVitalTrack.init(sequelize, DataTypes);
  const ExamAnesthesiaVitalTrackProps = _ExamAnesthesiaVitalTrackProps.init(sequelize, DataTypes);
  const ExamAnesthesiaVitalTrackStatus = _ExamAnesthesiaVitalTrackStatus.init(sequelize, DataTypes);
  const ExamAnesthesiaVitalTrackValue = _ExamAnesthesiaVitalTrackValue.init(sequelize, DataTypes);
  const ExamCategoryMeasurement = _ExamCategoryMeasurement.init(sequelize, DataTypes);
  const ExamCategoryProp = _ExamCategoryProp.init(sequelize, DataTypes);
  const ExamCategoryValueProp = _ExamCategoryValueProp.init(sequelize, DataTypes);
  const ExamFreeformMeasurement = _ExamFreeformMeasurement.init(sequelize, DataTypes);
  const ExamFreeformProp = _ExamFreeformProp.init(sequelize, DataTypes);
  const ExamNumericMeasurement = _ExamNumericMeasurement.init(sequelize, DataTypes);
  const ExamNumericProp = _ExamNumericProp.init(sequelize, DataTypes);
  const FileHistory = _FileHistory.init(sequelize, DataTypes);
  const Inventory = _Inventory.init(sequelize, DataTypes);
  const InventoryAddOn = _InventoryAddOn.init(sequelize, DataTypes);
  const InventoryCategory = _InventoryCategory.init(sequelize, DataTypes);
  const InventoryCsubstanceType = _InventoryCsubstanceType.init(sequelize, DataTypes);
  const InventoryDetail = _InventoryDetail.init(sequelize, DataTypes);
  const InventoryExpirationPeriod = _InventoryExpirationPeriod.init(sequelize, DataTypes);
  const InventoryLable = _InventoryLable.init(sequelize, DataTypes);
  const InventoryLot = _InventoryLot.init(sequelize, DataTypes);
  const InventoryMeasurement = _InventoryMeasurement.init(sequelize, DataTypes);
  const InventoryPackage = _InventoryPackage.init(sequelize, DataTypes);
  const InventoryPackageItem = _InventoryPackageItem.init(sequelize, DataTypes);
  const InventoryPatientReminder = _InventoryPatientReminder.init(sequelize, DataTypes);
  const InventoryPatientReminderUser = _InventoryPatientReminderUser.init(sequelize, DataTypes);
  const InventoryPatientReminderUserGroup = _InventoryPatientReminderUserGroup.init(sequelize, DataTypes);
  const InventoryProcedure = _InventoryProcedure.init(sequelize, DataTypes);
  const InventoryReminder = _InventoryReminder.init(sequelize, DataTypes);
  const InventoryReminderPeriod = _InventoryReminderPeriod.init(sequelize, DataTypes);
  const InventoryReminderType = _InventoryReminderType.init(sequelize, DataTypes);
  const InventoryReminderUserGroup = _InventoryReminderUserGroup.init(sequelize, DataTypes);
  const InventoryReminderUserGroupType = _InventoryReminderUserGroupType.init(sequelize, DataTypes);
  const InventoryRxPrescription = _InventoryRxPrescription.init(sequelize, DataTypes);
  const InventoryTestVendor = _InventoryTestVendor.init(sequelize, DataTypes);
  const InventoryType = _InventoryType.init(sequelize, DataTypes);
  const InventoryVaccine = _InventoryVaccine.init(sequelize, DataTypes);
  const LabOrder = _LabOrder.init(sequelize, DataTypes);
  const LabOrderAntechLabOrder = _LabOrderAntechLabOrder.init(sequelize, DataTypes);
  const LabOrderIdexxLabOrder = _LabOrderIdexxLabOrder.init(sequelize, DataTypes);
  const LabOrderManual = _LabOrderManual.init(sequelize, DataTypes);
  const LabOrderStatus = _LabOrderStatus.init(sequelize, DataTypes);
  const LabOrderTest = _LabOrderTest.init(sequelize, DataTypes);
  const LabOrderVendorOrder = _LabOrderVendorOrder.init(sequelize, DataTypes);
  const LabOrderZoetisRefLabOrder = _LabOrderZoetisRefLabOrder.init(sequelize, DataTypes);
  const LabRawData = _LabRawData.init(sequelize, DataTypes);
  const LabVendor = _LabVendor.init(sequelize, DataTypes);
  const MeasureUnit = _MeasureUnit.init(sequelize, DataTypes);
  const MeasureUnitType = _MeasureUnitType.init(sequelize, DataTypes);
  const Message = _Message.init(sequelize, DataTypes);
  const NoteHistory = _NoteHistory.init(sequelize, DataTypes);
  const Organization = _Organization.init(sequelize, DataTypes);
  const Patient = _Patient.init(sequelize, DataTypes);
  const PatientBreed = _PatientBreed.init(sequelize, DataTypes);
  const PatientCategoricalAttr = _PatientCategoricalAttr.init(sequelize, DataTypes);
  const PatientCategoricalMeasurement = _PatientCategoricalMeasurement.init(sequelize, DataTypes);
  const PatientColor = _PatientColor.init(sequelize, DataTypes);
  const PatientExamFile = _PatientExamFile.init(sequelize, DataTypes);
  const PatientFamily = _PatientFamily.init(sequelize, DataTypes);
  const PatientFreeformAttr = _PatientFreeformAttr.init(sequelize, DataTypes);
  const PatientFreeformMeasurement = _PatientFreeformMeasurement.init(sequelize, DataTypes);
  const PatientHistory = _PatientHistory.init(sequelize, DataTypes);
  const PatientMed = _PatientMed.init(sequelize, DataTypes);
  const PatientNumericAttr = _PatientNumericAttr.init(sequelize, DataTypes);
  const PatientNumericMeasurement = _PatientNumericMeasurement.init(sequelize, DataTypes);
  const PatientSex = _PatientSex.init(sequelize, DataTypes);
  const PatientSpecies = _PatientSpecies.init(sequelize, DataTypes);
  const PatientStatus = _PatientStatus.init(sequelize, DataTypes);
  const PatientVaccine = _PatientVaccine.init(sequelize, DataTypes);
  const PatientWeight = _PatientWeight.init(sequelize, DataTypes);
  const Payment = _Payment.init(sequelize, DataTypes);
  const PaymentCardSubtype = _PaymentCardSubtype.init(sequelize, DataTypes);
  const PaymentCardType = _PaymentCardType.init(sequelize, DataTypes);
  const PaymentMethod = _PaymentMethod.init(sequelize, DataTypes);
  const PaymentStatus = _PaymentStatus.init(sequelize, DataTypes);
  const PhoneType = _PhoneType.init(sequelize, DataTypes);
  const RelationType = _RelationType.init(sequelize, DataTypes);
  const Reminder = _Reminder.init(sequelize, DataTypes);
  const ReminderHistory = _ReminderHistory.init(sequelize, DataTypes);
  const ReminderRepeat = _ReminderRepeat.init(sequelize, DataTypes);
  const ReminderRepeatType = _ReminderRepeatType.init(sequelize, DataTypes);
  const ReminderStatus = _ReminderStatus.init(sequelize, DataTypes);
  const ReminderType = _ReminderType.init(sequelize, DataTypes);
  const ReminderUser = _ReminderUser.init(sequelize, DataTypes);
  const Report = _Report.init(sequelize, DataTypes);
  const ReportStatus = _ReportStatus.init(sequelize, DataTypes);
  const ReportType = _ReportType.init(sequelize, DataTypes);
  const ResetPassword = _ResetPassword.init(sequelize, DataTypes);
  const State = _State.init(sequelize, DataTypes);
  const TimeZone = _TimeZone.init(sequelize, DataTypes);
  const UsdaLicensing = _UsdaLicensing.init(sequelize, DataTypes);
  const User = _User.init(sequelize, DataTypes);
  const UserBranchMapping = _UserBranchMapping.init(sequelize, DataTypes);
  const UserContact = _UserContact.init(sequelize, DataTypes);
  const UserHashToken = _UserHashToken.init(sequelize, DataTypes);
  const UserInventory = _UserInventory.init(sequelize, DataTypes);
  const UserPhone = _UserPhone.init(sequelize, DataTypes);
  const UserPwd = _UserPwd.init(sequelize, DataTypes);
  const UserRole = _UserRole.init(sequelize, DataTypes);
  const UserRoleMapping = _UserRoleMapping.init(sequelize, DataTypes);
  const UserStatus = _UserStatus.init(sequelize, DataTypes);
  const UserWorkingException = _UserWorkingException.init(sequelize, DataTypes);
  const UserWorkingHours = _UserWorkingHours.init(sequelize, DataTypes);
  const VaccineDose = _VaccineDose.init(sequelize, DataTypes);
  const VaccinePeriod = _VaccinePeriod.init(sequelize, DataTypes);
  const VaccineType = _VaccineType.init(sequelize, DataTypes);
  const WeightUnit = _WeightUnit.init(sequelize, DataTypes);
  const WorkingDay = _WorkingDay.init(sequelize, DataTypes);
  const ZoetisBranchSetting = _ZoetisBranchSetting.init(sequelize, DataTypes);
  const ZoetisLabOrderOrphan = _ZoetisLabOrderOrphan.init(sequelize, DataTypes);
  const ZoetisLabOrderTestItem = _ZoetisLabOrderTestItem.init(sequelize, DataTypes);
  const ZoetisLabSection = _ZoetisLabSection.init(sequelize, DataTypes);
  const ZoetisLabTest = _ZoetisLabTest.init(sequelize, DataTypes);
  const ZoetisSpeciesMapping = _ZoetisSpeciesMapping.init(sequelize, DataTypes);

  BillingItem.belongsToMany(Inventory, { as: 'inventoryIdInventories', through: BillingPackageItem, foreignKey: "billingItemId", otherKey: "inventoryId" });
  Inventory.belongsToMany(BillingItem, { as: 'billingItemIdBillingItems', through: BillingPackageItem, foreignKey: "inventoryId", otherKey: "billingItemId" });
  Patient.belongsToMany(PatientCategoricalAttr, { as: 'patientCategoricalAttrIdPatientCategoricalAttrs', through: PatientCategoricalMeasurement, foreignKey: "patientId", otherKey: "patientCategoricalAttrId" });
  Patient.belongsToMany(PatientFreeformAttr, { as: 'patientFreeformAttrIdPatientFreeformAttrs', through: PatientFreeformMeasurement, foreignKey: "patientId", otherKey: "patientFreeformAttrId" });
  Patient.belongsToMany(PatientNumericAttr, { as: 'patientNumericAttrIdPatientNumericAttrs', through: PatientNumericMeasurement, foreignKey: "patientId", otherKey: "patientNumericAttrId" });
  PatientCategoricalAttr.belongsToMany(Patient, { as: 'patientIdPatients', through: PatientCategoricalMeasurement, foreignKey: "patientCategoricalAttrId", otherKey: "patientId" });
  PatientFreeformAttr.belongsToMany(Patient, { as: 'patientIdPatientPatientFreeformMeasurements', through: PatientFreeformMeasurement, foreignKey: "patientFreeformAttrId", otherKey: "patientId" });
  PatientNumericAttr.belongsToMany(Patient, { as: 'patientIdPatientPatientNumericMeasurements', through: PatientNumericMeasurement, foreignKey: "patientNumericAttrId", otherKey: "patientId" });
  Billing.belongsTo(Appt, { as: "appt", foreignKey: "apptId"});
  Appt.hasOne(Billing, { as: "billing", foreignKey: "apptId"});
  Exam.belongsTo(Appt, { as: "appt", foreignKey: "apptId"});
  Appt.hasMany(Exam, { as: "exams", foreignKey: "apptId"});
  ExamAnesthesiaGen.belongsTo(Appt, { as: "appt", foreignKey: "apptId"});
  Appt.hasOne(ExamAnesthesiaGen, { as: "examAnesthesiaGen", foreignKey: "apptId"});
  ExamAnesthesiaMed.belongsTo(Appt, { as: "appt", foreignKey: "apptId"});
  Appt.hasMany(ExamAnesthesiaMed, { as: "examAnesthesiaMeds", foreignKey: "apptId"});
  ExamAnesthesiaVitalTrack.belongsTo(Appt, { as: "appt", foreignKey: "apptId"});
  Appt.hasMany(ExamAnesthesiaVitalTrack, { as: "examAnesthesiaVitalTracks", foreignKey: "apptId"});
  LabOrder.belongsTo(Appt, { as: "appt", foreignKey: "apptId"});
  Appt.hasMany(LabOrder, { as: "labOrders", foreignKey: "apptId"});
  PatientMed.belongsTo(Appt, { as: "appt", foreignKey: "apptId"});
  Appt.hasMany(PatientMed, { as: "patientMeds", foreignKey: "apptId"});
  PatientVaccine.belongsTo(Appt, { as: "appt", foreignKey: "apptId"});
  Appt.hasMany(PatientVaccine, { as: "patientVaccines", foreignKey: "apptId"});
  Appt.belongsTo(ApptStatus, { as: "apptStatus", foreignKey: "apptStatusId"});
  ApptStatus.hasMany(Appt, { as: "appts", foreignKey: "apptStatusId"});
  Appt.belongsTo(ApptType, { as: "apptType", foreignKey: "apptTypeId"});
  ApptType.hasMany(Appt, { as: "appts", foreignKey: "apptTypeId"});
  Billing.belongsTo(ApptType, { as: "apptType", foreignKey: "apptTypeId"});
  ApptType.hasMany(Billing, { as: "billings", foreignKey: "apptTypeId"});
  BillingPackageItem.belongsTo(BillingItem, { as: "billingItem", foreignKey: "billingItemId"});
  BillingItem.hasMany(BillingPackageItem, { as: "billingPackageItems", foreignKey: "billingItemId"});
  Appt.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(Appt, { as: "appts", foreignKey: "branchId"});
  Billing.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(Billing, { as: "billings", foreignKey: "branchId"});
  BillingItem.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(BillingItem, { as: "billingItems", foreignKey: "branchId"});
  BillingPackageItem.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(BillingPackageItem, { as: "billingPackageItems", foreignKey: "branchId"});
  BillingPayment.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(BillingPayment, { as: "billingPayments", foreignKey: "branchId"});
  BranchHours.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(BranchHours, { as: "branchHours", foreignKey: "branchId"});
  BranchPhone.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(BranchPhone, { as: "branchPhones", foreignKey: "branchId"});
  CalendarBlock.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(CalendarBlock, { as: "calendarBlocks", foreignKey: "branchId"});
  CalendarBlockExcluded.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(CalendarBlockExcluded, { as: "calendarBlockExcludeds", foreignKey: "branchId"});
  CalendarBlockRepeat.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(CalendarBlockRepeat, { as: "calendarBlockRepeats", foreignKey: "branchId"});
  Client.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(Client, { as: "clients", foreignKey: "branchId"});
  ClientPhone.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ClientPhone, { as: "clientPhones", foreignKey: "branchId"});
  ClientReferral.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ClientReferral, { as: "clientReferrals", foreignKey: "branchId"});
  ClientSyContact.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ClientSyContact, { as: "clientSyContacts", foreignKey: "branchId"});
  ClockHistory.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ClockHistory, { as: "clockHistories", foreignKey: "branchId"});
  CommunicationHistory.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(CommunicationHistory, { as: "communicationHistories", foreignKey: "branchId"});
  Estimate.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(Estimate, { as: "estimates", foreignKey: "branchId"});
  EstimateItem.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(EstimateItem, { as: "estimateItems", foreignKey: "branchId"});
  Exam.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(Exam, { as: "exams", foreignKey: "branchId"});
  ExamAnesthesiaGen.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ExamAnesthesiaGen, { as: "examAnesthesiaGens", foreignKey: "branchId"});
  ExamAnesthesiaMed.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ExamAnesthesiaMed, { as: "examAnesthesiaMeds", foreignKey: "branchId"});
  ExamAnesthesiaVitalTrack.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ExamAnesthesiaVitalTrack, { as: "examAnesthesiaVitalTracks", foreignKey: "branchId"});
  ExamAnesthesiaVitalTrackValue.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ExamAnesthesiaVitalTrackValue, { as: "examAnesthesiaVitalTrackValues", foreignKey: "branchId"});
  ExamCategoryMeasurement.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ExamCategoryMeasurement, { as: "examCategoryMeasurements", foreignKey: "branchId"});
  ExamFreeformMeasurement.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ExamFreeformMeasurement, { as: "examFreeformMeasurements", foreignKey: "branchId"});
  ExamNumericMeasurement.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ExamNumericMeasurement, { as: "examNumericMeasurements", foreignKey: "branchId"});
  FileHistory.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(FileHistory, { as: "fileHistories", foreignKey: "branchId"});
  Inventory.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(Inventory, { as: "inventories", foreignKey: "branchId"});
  InventoryCategory.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(InventoryCategory, { as: "inventoryCategories", foreignKey: "branchId"});
  InventoryDetail.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(InventoryDetail, { as: "inventoryDetails", foreignKey: "branchId"});
  InventoryLable.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(InventoryLable, { as: "inventoryLables", foreignKey: "branchId"});
  InventoryLot.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(InventoryLot, { as: "inventoryLots", foreignKey: "branchId"});
  InventoryPackage.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(InventoryPackage, { as: "inventoryPackages", foreignKey: "branchId"});
  InventoryPackageItem.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(InventoryPackageItem, { as: "inventoryPackageItems", foreignKey: "branchId"});
  InventoryPatientReminder.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(InventoryPatientReminder, { as: "inventoryPatientReminders", foreignKey: "branchId"});
  InventoryPatientReminderUser.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(InventoryPatientReminderUser, { as: "inventoryPatientReminderUsers", foreignKey: "branchId"});
  InventoryPatientReminderUserGroup.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(InventoryPatientReminderUserGroup, { as: "inventoryPatientReminderUserGroups", foreignKey: "branchId"});
  InventoryProcedure.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(InventoryProcedure, { as: "inventoryProcedures", foreignKey: "branchId"});
  InventoryReminder.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(InventoryReminder, { as: "inventoryReminders", foreignKey: "branchId"});
  InventoryRxPrescription.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(InventoryRxPrescription, { as: "inventoryRxPrescriptions", foreignKey: "branchId"});
  InventoryTestVendor.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(InventoryTestVendor, { as: "inventoryTestVendors", foreignKey: "branchId"});
  InventoryVaccine.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(InventoryVaccine, { as: "inventoryVaccines", foreignKey: "branchId"});
  LabOrder.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(LabOrder, { as: "labOrders", foreignKey: "branchId"});
  LabOrderAntechLabOrder.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(LabOrderAntechLabOrder, { as: "labOrderAntechLabOrders", foreignKey: "branchId"});
  LabOrderIdexxLabOrder.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(LabOrderIdexxLabOrder, { as: "labOrderIdexxLabOrders", foreignKey: "branchId"});
  LabOrderManual.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(LabOrderManual, { as: "labOrderManuals", foreignKey: "branchId"});
  LabOrderVendorOrder.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(LabOrderVendorOrder, { as: "labOrderVendorOrders", foreignKey: "branchId"});
  LabOrderZoetisRefLabOrder.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(LabOrderZoetisRefLabOrder, { as: "labOrderZoetisRefLabOrders", foreignKey: "branchId"});
  LabRawData.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(LabRawData, { as: "labRawData", foreignKey: "branchId"});
  Message.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(Message, { as: "messages", foreignKey: "branchId"});
  NoteHistory.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(NoteHistory, { as: "noteHistories", foreignKey: "branchId"});
  Patient.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(Patient, { as: "patients", foreignKey: "branchId"});
  PatientCategoricalMeasurement.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(PatientCategoricalMeasurement, { as: "patientCategoricalMeasurements", foreignKey: "branchId"});
  PatientExamFile.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(PatientExamFile, { as: "patientExamFiles", foreignKey: "branchId"});
  PatientFreeformMeasurement.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(PatientFreeformMeasurement, { as: "patientFreeformMeasurements", foreignKey: "branchId"});
  PatientHistory.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(PatientHistory, { as: "patientHistories", foreignKey: "branchId"});
  PatientMed.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(PatientMed, { as: "patientMeds", foreignKey: "branchId"});
  PatientNumericMeasurement.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(PatientNumericMeasurement, { as: "patientNumericMeasurements", foreignKey: "branchId"});
  PatientVaccine.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(PatientVaccine, { as: "patientVaccines", foreignKey: "branchId"});
  PatientWeight.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(PatientWeight, { as: "patientWeights", foreignKey: "branchId"});
  Payment.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(Payment, { as: "payments", foreignKey: "branchId"});
  Reminder.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(Reminder, { as: "reminders", foreignKey: "branchId"});
  ReminderHistory.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ReminderHistory, { as: "reminderHistories", foreignKey: "branchId"});
  ReminderRepeat.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ReminderRepeat, { as: "reminderRepeats", foreignKey: "branchId"});
  ReminderUser.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ReminderUser, { as: "reminderUsers", foreignKey: "branchId"});
  Report.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(Report, { as: "reports", foreignKey: "branchId"});
  UserBranchMapping.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(UserBranchMapping, { as: "userBranchMappings", foreignKey: "branchId"});
  UserContact.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(UserContact, { as: "userContacts", foreignKey: "branchId"});
  UserPhone.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(UserPhone, { as: "userPhones", foreignKey: "branchId"});
  UserRoleMapping.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(UserRoleMapping, { as: "userRoleMappings", foreignKey: "branchId"});
  UserWorkingException.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(UserWorkingException, { as: "userWorkingExceptions", foreignKey: "branchId"});
  UserWorkingHours.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(UserWorkingHours, { as: "userWorkingHours", foreignKey: "branchId"});
  ZoetisLabSection.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ZoetisLabSection, { as: "zoetisLabSections", foreignKey: "branchId"});
  ZoetisLabTest.belongsTo(Branch, { as: "branch", foreignKey: "branchId"});
  Branch.hasMany(ZoetisLabTest, { as: "zoetisLabTests", foreignKey: "branchId"});
  Billing.belongsTo(Client, { as: "client", foreignKey: "clientId"});
  Client.hasMany(Billing, { as: "billings", foreignKey: "clientId"});
  ClientPhone.belongsTo(Client, { as: "client", foreignKey: "clientId"});
  Client.hasMany(ClientPhone, { as: "clientPhones", foreignKey: "clientId"});
  CommunicationHistory.belongsTo(Client, { as: "client", foreignKey: "clientId"});
  Client.hasMany(CommunicationHistory, { as: "communicationHistories", foreignKey: "clientId"});
  Estimate.belongsTo(Client, { as: "client", foreignKey: "clientId"});
  Client.hasMany(Estimate, { as: "estimates", foreignKey: "clientId"});
  FileHistory.belongsTo(Client, { as: "client", foreignKey: "clientId"});
  Client.hasMany(FileHistory, { as: "fileHistories", foreignKey: "clientId"});
  InventoryPatientReminder.belongsTo(Client, { as: "client", foreignKey: "clientId"});
  Client.hasMany(InventoryPatientReminder, { as: "inventoryPatientReminders", foreignKey: "clientId"});
  LabOrder.belongsTo(Client, { as: "client", foreignKey: "clientId"});
  Client.hasMany(LabOrder, { as: "labOrders", foreignKey: "clientId"});
  NoteHistory.belongsTo(Client, { as: "client", foreignKey: "clientId"});
  Client.hasMany(NoteHistory, { as: "noteHistories", foreignKey: "clientId"});
  Patient.belongsTo(Client, { as: "client", foreignKey: "clientId"});
  Client.hasMany(Patient, { as: "patients", foreignKey: "clientId"});
  PatientHistory.belongsTo(Client, { as: "client", foreignKey: "clientId"});
  Client.hasMany(PatientHistory, { as: "patientHistories", foreignKey: "clientId"});
  Reminder.belongsTo(Client, { as: "client", foreignKey: "clientId"});
  Client.hasMany(Reminder, { as: "reminders", foreignKey: "clientId"});
  ReminderHistory.belongsTo(Client, { as: "client", foreignKey: "clientId"});
  Client.hasMany(ReminderHistory, { as: "reminderHistories", foreignKey: "clientId"});
  ZoetisBranchSetting.belongsTo(Client, { as: "client", foreignKey: "clientId"});
  Client.hasMany(ZoetisBranchSetting, { as: "zoetisBranchSettings", foreignKey: "clientId"});
  ZoetisLabOrderOrphan.belongsTo(Client, { as: "client", foreignKey: "clientId"});
  Client.hasMany(ZoetisLabOrderOrphan, { as: "zoetisLabOrderOrphans", foreignKey: "clientId"});
  EstimateItem.belongsTo(Estimate, { as: "estimate", foreignKey: "estimateId"});
  Estimate.hasMany(EstimateItem, { as: "estimateItems", foreignKey: "estimateId"});
  ExamCategoryMeasurement.belongsTo(Exam, { as: "exam", foreignKey: "examId"});
  Exam.hasMany(ExamCategoryMeasurement, { as: "examCategoryMeasurements", foreignKey: "examId"});
  ExamFreeformMeasurement.belongsTo(Exam, { as: "exam", foreignKey: "examId"});
  Exam.hasMany(ExamFreeformMeasurement, { as: "examFreeformMeasurements", foreignKey: "examId"});
  ExamNumericMeasurement.belongsTo(Exam, { as: "exam", foreignKey: "examId"});
  Exam.hasMany(ExamNumericMeasurement, { as: "examNumericMeasurements", foreignKey: "examId"});
  BillingItem.belongsTo(Inventory, { as: "inventory", foreignKey: "inventoryId"});
  Inventory.hasMany(BillingItem, { as: "billingItems", foreignKey: "inventoryId"});
  BillingPackageItem.belongsTo(Inventory, { as: "inventory", foreignKey: "inventoryId"});
  Inventory.hasMany(BillingPackageItem, { as: "billingPackageItems", foreignKey: "inventoryId"});
  EstimateItem.belongsTo(Inventory, { as: "inventory", foreignKey: "inventoryId"});
  Inventory.hasMany(EstimateItem, { as: "estimateItems", foreignKey: "inventoryId"});
  InventoryAddOn.belongsTo(Inventory, { as: "inventory", foreignKey: "inventoryId"});
  Inventory.hasMany(InventoryAddOn, { as: "inventoryAddOns", foreignKey: "inventoryId"});
  InventoryLable.belongsTo(Inventory, { as: "inventory", foreignKey: "inventoryId"});
  Inventory.hasMany(InventoryLable, { as: "inventoryLables", foreignKey: "inventoryId"});
  InventoryLot.belongsTo(Inventory, { as: "inventory", foreignKey: "inventoryId"});
  Inventory.hasMany(InventoryLot, { as: "inventoryLots", foreignKey: "inventoryId"});
  InventoryPackageItem.belongsTo(Inventory, { as: "inventory", foreignKey: "inventoryId"});
  Inventory.hasMany(InventoryPackageItem, { as: "inventoryPackageItems", foreignKey: "inventoryId"});
  InventoryPatientReminder.belongsTo(Inventory, { as: "inventory", foreignKey: "inventoryId"});
  Inventory.hasMany(InventoryPatientReminder, { as: "inventoryPatientReminders", foreignKey: "inventoryId"});
  InventoryProcedure.belongsTo(Inventory, { as: "inventory", foreignKey: "inventoryId"});
  Inventory.hasMany(InventoryProcedure, { as: "inventoryProcedures", foreignKey: "inventoryId"});
  InventoryReminder.belongsTo(Inventory, { as: "inventory", foreignKey: "inventoryId"});
  Inventory.hasMany(InventoryReminder, { as: "inventoryReminders", foreignKey: "inventoryId"});
  LabOrderTest.belongsTo(Inventory, { as: "inventory", foreignKey: "inventoryId"});
  Inventory.hasMany(LabOrderTest, { as: "labOrderTests", foreignKey: "inventoryId"});
  PatientMed.belongsTo(Inventory, { as: "inventory", foreignKey: "inventoryId"});
  Inventory.hasMany(PatientMed, { as: "patientMeds", foreignKey: "inventoryId"});
  PatientVaccine.belongsTo(Inventory, { as: "inventory", foreignKey: "inventoryId"});
  Inventory.hasMany(PatientVaccine, { as: "patientVaccines", foreignKey: "inventoryId"});
  LabOrderIdexxLabOrder.belongsTo(LabOrder, { as: "labOrder", foreignKey: "labOrderId"});
  LabOrder.hasMany(LabOrderIdexxLabOrder, { as: "labOrderIdexxLabOrders", foreignKey: "labOrderId"});
  LabOrderTest.belongsTo(LabOrder, { as: "labOrder", foreignKey: "labOrderId"});
  LabOrder.hasMany(LabOrderTest, { as: "labOrderTests", foreignKey: "labOrderId"});
  LabOrderVendorOrder.belongsTo(LabOrder, { as: "labOrder", foreignKey: "labOrderId"});
  LabOrder.hasMany(LabOrderVendorOrder, { as: "labOrderVendorOrders", foreignKey: "labOrderId"});
  LabOrderZoetisRefLabOrder.belongsTo(LabOrder, { as: "labOrder", foreignKey: "labOrderId"});
  LabOrder.hasMany(LabOrderZoetisRefLabOrder, { as: "labOrderZoetisRefLabOrders", foreignKey: "labOrderId"});
  ZoetisLabOrderTestItem.belongsTo(LabOrder, { as: "labOrder", foreignKey: "labOrderId"});
  LabOrder.hasMany(ZoetisLabOrderTestItem, { as: "zoetisLabOrderTestItems", foreignKey: "labOrderId"});
  Branch.belongsTo(Organization, { as: "org", foreignKey: "orgId"});
  Organization.hasMany(Branch, { as: "branches", foreignKey: "orgId"});
  Client.belongsTo(Organization, { as: "org", foreignKey: "orgId"});
  Organization.hasMany(Client, { as: "clients", foreignKey: "orgId"});
  Appt.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(Appt, { as: "appts", foreignKey: "patientId"});
  Billing.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(Billing, { as: "billings", foreignKey: "patientId"});
  BillingItem.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(BillingItem, { as: "billingItems", foreignKey: "patientId"});
  CommunicationHistory.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(CommunicationHistory, { as: "communicationHistories", foreignKey: "patientId"});
  Estimate.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(Estimate, { as: "estimates", foreignKey: "patientId"});
  Exam.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(Exam, { as: "exams", foreignKey: "patientId"});
  ExamAnesthesiaGen.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(ExamAnesthesiaGen, { as: "examAnesthesiaGens", foreignKey: "patientId"});
  ExamAnesthesiaMed.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(ExamAnesthesiaMed, { as: "examAnesthesiaMeds", foreignKey: "patientId"});
  ExamAnesthesiaVitalTrack.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(ExamAnesthesiaVitalTrack, { as: "examAnesthesiaVitalTracks", foreignKey: "patientId"});
  FileHistory.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(FileHistory, { as: "fileHistories", foreignKey: "patientId"});
  InventoryPatientReminder.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(InventoryPatientReminder, { as: "inventoryPatientReminders", foreignKey: "patientId"});
  LabOrder.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(LabOrder, { as: "labOrders", foreignKey: "patientId"});
  NoteHistory.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(NoteHistory, { as: "noteHistories", foreignKey: "patientId"});
  PatientCategoricalMeasurement.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(PatientCategoricalMeasurement, { as: "patientCategoricalMeasurements", foreignKey: "patientId"});
  PatientExamFile.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(PatientExamFile, { as: "patientExamFiles", foreignKey: "patientId"});
  PatientFreeformMeasurement.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(PatientFreeformMeasurement, { as: "patientFreeformMeasurements", foreignKey: "patientId"});
  PatientHistory.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(PatientHistory, { as: "patientHistories", foreignKey: "patientId"});
  PatientMed.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(PatientMed, { as: "patientMeds", foreignKey: "patientId"});
  PatientNumericMeasurement.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(PatientNumericMeasurement, { as: "patientNumericMeasurements", foreignKey: "patientId"});
  PatientVaccine.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(PatientVaccine, { as: "patientVaccines", foreignKey: "patientId"});
  PatientWeight.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(PatientWeight, { as: "patientWeights", foreignKey: "patientId"});
  Reminder.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(Reminder, { as: "reminders", foreignKey: "patientId"});
  ReminderHistory.belongsTo(Patient, { as: "patient", foreignKey: "patientId"});
  Patient.hasMany(ReminderHistory, { as: "reminderHistories", foreignKey: "patientId"});
  PatientCategoricalMeasurement.belongsTo(PatientCategoricalAttr, { as: "patientCategoricalAttr", foreignKey: "patientCategoricalAttrId"});
  PatientCategoricalAttr.hasMany(PatientCategoricalMeasurement, { as: "patientCategoricalMeasurements", foreignKey: "patientCategoricalAttrId"});
  Patient.belongsTo(PatientColor, { as: "patientColor", foreignKey: "patientColorId"});
  PatientColor.hasMany(Patient, { as: "patients", foreignKey: "patientColorId"});
  PatientFreeformMeasurement.belongsTo(PatientFreeformAttr, { as: "patientFreeformAttr", foreignKey: "patientFreeformAttrId"});
  PatientFreeformAttr.hasMany(PatientFreeformMeasurement, { as: "patientFreeformMeasurements", foreignKey: "patientFreeformAttrId"});
  PatientNumericMeasurement.belongsTo(PatientNumericAttr, { as: "patientNumericAttr", foreignKey: "patientNumericAttrId"});
  PatientNumericAttr.hasMany(PatientNumericMeasurement, { as: "patientNumericMeasurements", foreignKey: "patientNumericAttrId"});
  Patient.belongsTo(PatientStatus, { as: "patientStatus", foreignKey: "patientStatusId"});
  PatientStatus.hasMany(Patient, { as: "patients", foreignKey: "patientStatusId"});
  BillingPayment.belongsTo(Payment, { as: "payment", foreignKey: "paymentId"});
  Payment.hasMany(BillingPayment, { as: "billingPayments", foreignKey: "paymentId"});
  InventoryPatientReminderUser.belongsTo(Reminder, { as: "reminder", foreignKey: "reminderId"});
  Reminder.hasMany(InventoryPatientReminderUser, { as: "inventoryPatientReminderUsers", foreignKey: "reminderId"});
  InventoryPatientReminderUserGroup.belongsTo(Reminder, { as: "reminder", foreignKey: "reminderId"});
  Reminder.hasMany(InventoryPatientReminderUserGroup, { as: "inventoryPatientReminderUserGroups", foreignKey: "reminderId"});
  InventoryReminderUserGroup.belongsTo(Reminder, { as: "reminder", foreignKey: "reminderId"});
  Reminder.hasMany(InventoryReminderUserGroup, { as: "inventoryReminderUserGroups", foreignKey: "reminderId"});
  ReminderUser.belongsTo(Reminder, { as: "reminder", foreignKey: "reminderId"});
  Reminder.hasMany(ReminderUser, { as: "reminderUsers", foreignKey: "reminderId"});
  Branch.belongsTo(State, { as: "state", foreignKey: "stateId"});
  State.hasMany(Branch, { as: "branches", foreignKey: "stateId"});
  Client.belongsTo(State, { as: "state", foreignKey: "stateId"});
  State.hasMany(Client, { as: "clients", foreignKey: "stateId"});
  Organization.belongsTo(State, { as: "state", foreignKey: "stateId"});
  State.hasMany(Organization, { as: "organizations", foreignKey: "stateId"});
  UserContact.belongsTo(State, { as: "state", foreignKey: "stateId"});
  State.hasMany(UserContact, { as: "userContacts", foreignKey: "stateId"});

  return {
    AnimalControlLicensing,
    Appt,
    ApptStatus,
    ApptType,
    Billing,
    BillingItem,
    BillingPackageItem,
    BillingPayment,
    BillingStatus,
    Branch,
    BranchHours,
    BranchPhone,
    BranchSettings,
    BranchStatus,
    CalendarBlock,
    CalendarBlockExcluded,
    CalendarBlockRepeat,
    Client,
    ClientPhone,
    ClientReferral,
    ClientStatus,
    ClientSyContact,
    ClockHistory,
    ClockHistoryOption,
    CommunicationHistory,
    CommunicationMedium,
    CommunicationPurpose,
    CommunicationType,
    Country,
    DiscountType,
    EmailTemplate,
    Estimate,
    EstimateItem,
    EstimateStatus,
    Exam,
    ExamAnesthesiaGen,
    ExamAnesthesiaGenCatheterLoc,
    ExamAnesthesiaGenIvFluidType,
    ExamAnesthesiaMed,
    ExamAnesthesiaMedRoute,
    ExamAnesthesiaMedType,
    ExamAnesthesiaMedUnit,
    ExamAnesthesiaVitalTrack,
    ExamAnesthesiaVitalTrackProps,
    ExamAnesthesiaVitalTrackStatus,
    ExamAnesthesiaVitalTrackValue,
    ExamCategoryMeasurement,
    ExamCategoryProp,
    ExamCategoryValueProp,
    ExamFreeformMeasurement,
    ExamFreeformProp,
    ExamNumericMeasurement,
    ExamNumericProp,
    FileHistory,
    Inventory,
    InventoryAddOn,
    InventoryCategory,
    InventoryCsubstanceType,
    InventoryDetail,
    InventoryExpirationPeriod,
    InventoryLable,
    InventoryLot,
    InventoryMeasurement,
    InventoryPackage,
    InventoryPackageItem,
    InventoryPatientReminder,
    InventoryPatientReminderUser,
    InventoryPatientReminderUserGroup,
    InventoryProcedure,
    InventoryReminder,
    InventoryReminderPeriod,
    InventoryReminderType,
    InventoryReminderUserGroup,
    InventoryReminderUserGroupType,
    InventoryRxPrescription,
    InventoryTestVendor,
    InventoryType,
    InventoryVaccine,
    LabOrder,
    LabOrderAntechLabOrder,
    LabOrderIdexxLabOrder,
    LabOrderManual,
    LabOrderStatus,
    LabOrderTest,
    LabOrderVendorOrder,
    LabOrderZoetisRefLabOrder,
    LabRawData,
    LabVendor,
    MeasureUnit,
    MeasureUnitType,
    Message,
    NoteHistory,
    Organization,
    Patient,
    PatientBreed,
    PatientCategoricalAttr,
    PatientCategoricalMeasurement,
    PatientColor,
    PatientExamFile,
    PatientFamily,
    PatientFreeformAttr,
    PatientFreeformMeasurement,
    PatientHistory,
    PatientMed,
    PatientNumericAttr,
    PatientNumericMeasurement,
    PatientSex,
    PatientSpecies,
    PatientStatus,
    PatientVaccine,
    PatientWeight,
    Payment,
    PaymentCardSubtype,
    PaymentCardType,
    PaymentMethod,
    PaymentStatus,
    PhoneType,
    RelationType,
    Reminder,
    ReminderHistory,
    ReminderRepeat,
    ReminderRepeatType,
    ReminderStatus,
    ReminderType,
    ReminderUser,
    Report,
    ReportStatus,
    ReportType,
    ResetPassword,
    State,
    TimeZone,
    UsdaLicensing,
    User,
    UserBranchMapping,
    UserContact,
    UserHashToken,
    UserInventory,
    UserPhone,
    UserPwd,
    UserRole,
    UserRoleMapping,
    UserStatus,
    UserWorkingException,
    UserWorkingHours,
    VaccineDose,
    VaccinePeriod,
    VaccineType,
    WeightUnit,
    WorkingDay,
    ZoetisBranchSetting,
    ZoetisLabOrderOrphan,
    ZoetisLabOrderTestItem,
    ZoetisLabSection,
    ZoetisLabTest,
    ZoetisSpeciesMapping,
  };
}
