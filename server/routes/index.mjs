import { Router } from "express";
import pkg from "../../package.json" with { type: 'json' };
import { notFound } from "express-rest-error";
import * as userService from "../services/userService.mjs";
import * as commonService from "../services/commonService.mjs";
import auth from './auth.mjs';
import anesthesia from './anesthesia.mjs';
import appointments from './appointments.mjs';
import billing from './billing.mjs';
// import booking from './booking.mjs';
import branches from './branches.mjs';
import clients from './clients.mjs';
import inventory from './inventory.mjs';
import labs from './labs.mjs';
import medications from './medications.mjs';
import organizations from './organizations.mjs';
import patients from './patients.mjs';
import reports from './reports.mjs';
import staff from './staff.mjs';
import treatments from './treatments.mjs';
import users from "./users.mjs";


const router = new Router();

router.get("/healthcheck", (req, res) => {
  res.status(200).json({
    name: pkg.name,
    version: pkg.version,
    timestamp: new Date(),
    user: req.user,
  });
});

router.get("/me", async (req, res) => {
  res.json(req.user);
});
router.patch("/me", async (req, res) => {
  const result = await userService.update(req.user, req.user.id, req.body);
  res.json(result);
});

router.get("/states", async (req, res) => {
  const result = await commonService.getStates();
  res.json(result);
})

router.get("/timezones", async (req, res) => {
  const result = await commonService.getTimezones();
  res.json(result);
})

router.use("/auth", auth);

router.use("/anesthesia", anesthesia);
router.use("/appointments", appointments);
router.use("/billing", billing);
// router.use("/bookings", booking);
router.use("/branches", branches);
router.use("/clients", clients);
router.use("/inventory", inventory);
router.use("/labs", labs);
router.use("/medications", medications);
router.use("/organizations", organizations);
router.use("/patients", patients);
router.use("/reports", reports);
router.use("/staff", staff);
router.use("/treatments", treatments);
router.use("/users", users);

router.use("/*", (req, res) => {
  throw notFound("Invalid API endpoint.");
});

export default router;
